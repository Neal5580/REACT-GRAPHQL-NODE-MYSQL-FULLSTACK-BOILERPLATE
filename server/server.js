const { ApolloServer, gql } = require("apollo-server-express");
const bodyParser = require("body-parser");
const cors = require("cors");
const express = require("express");
const expressJwt = require("express-jwt");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const db = require("./models/db");
const seed = require("./models/seed/seed-db");

const port = 9000;
const jwtSecret = Buffer.from("Zn8Q5tyZ/G1MHltc4F/gTkVJMlrbKiZt", "base64");

const typeDefs = gql(
    fs.readFileSync("./schema.graphql", { encoding: "utf-8" })
);
const resolvers = require("./resolvers");

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
    context: ({ req }) =>
        db.User.findById(req.user.sub).then(user => {
            return { user: user };
        })
});
graphqlServer.applyMiddleware({ app });

app.post("/login", (req, res) => {
    const { email, password } = req.body;
    db.User.findOne({
        where: {
            email: email
        }
    }).then(user => {
        if (!(user && user.password === password)) {
            res.sendStatus(401);
            return;
        }
        const token = jwt.sign({ sub: user.id }, jwtSecret);
        res.send({ token });
    });
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
