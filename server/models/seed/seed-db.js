"use strict";

const models = require("../db");
const _USERS = require("./users.json");
const _JOBS = require("./jobs.json");
const _COMPANYS = require("./companies.json");

module.exports = {
    insert: async () => {
        await models.Company.bulkCreate(_COMPANYS);
        await models.Job.bulkCreate(_JOBS);
        await models.User.bulkCreate(_USERS);
        console.log("Bulk Insert Success!");
    }
};
