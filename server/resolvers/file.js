const { createWriteStream } = require("fs");

export default {
    Mutation: {
        async uploadFile(parent, { file }) {
            console.log("Mutation:uploadFile");

            const { stream, filename, mimetype, encoding } = await file;

            console.log(filename);

            console.log(stream);

            return { stream, filename, mimetype, encoding };
        }
    }
};
