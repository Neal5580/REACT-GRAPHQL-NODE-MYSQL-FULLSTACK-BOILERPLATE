"use strict";

const models = require("../db");
const _USERS = require("./users.json");
const _JOBS = require("./jobs.json");
const _COMPANYS = require("./companies.json");

module.exports = {
    insert: async () => {
        await Promise.all([
            models.Company.bulkCreate(_COMPANYS),
            models.Job.bulkCreate(_JOBS),
            models.User.bulkCreate(_USERS)
        ]);
        console.log("Bulk Insert Success!");
    }
};
