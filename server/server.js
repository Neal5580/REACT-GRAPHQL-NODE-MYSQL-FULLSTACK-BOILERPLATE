import { ApolloServer, gql } from "apollo-server-express";
import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import expressJwt from "express-jwt";
import fs from "fs";
import jwt from "jsonwebtoken";
import db from "./models/db";
import seed from "./models/seed/seed-db";

const port = 9000;
const jwtSecret = Buffer.from("Zn8Q5tyZ/G1MHltc4F/gTkVJMlrbKiZt", "base64");

const typeDefs = gql(
    fs.readFileSync("./schema.graphql", { encoding: "utf-8" })
);
import resolvers from "./resolvers";

const app = express();
app.use(
    cors(),
    bodyParser.json(),
    expressJwt({
        secret: jwtSecret,
        credentialsRequired: false
    })
);

const graphqlServer = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req }) =>
        req.user && {
            user: await db.User.findById(req.user.sub)
        }
});
graphqlServer.applyMiddleware({ app });

app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    const user = await db.User.findOne({
        where: {
            email: email
        }
    });

    if (!(user && user.password === password)) {
        res.sendStatus(401);
        return;
    }
    const token = jwt.sign({ sub: user.id }, jwtSecret);
    res.send({ token });
});

db.sequelize
    .sync({
        force: true
    })
    .then(() => {
        seed.insert();
    })
    .then(() => {
        app.listen(port, () => console.info(`Server started on port ${port}`));
    });
