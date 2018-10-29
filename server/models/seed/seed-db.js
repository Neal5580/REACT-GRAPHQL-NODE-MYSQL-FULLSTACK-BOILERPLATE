"use strict";

const models = require("../db");
const _USERS = require("./users.json");
const _JOBS = require("./jobs.json");
const _COMPANYS = require("./companies.json");

module.exports = {
    insert: () => {
        models.Company.bulkCreate(_COMPANYS)
            .then(() => {
                models.Job.bulkCreate(_JOBS).then(() => {
                    models.User.bulkCreate(_USERS).then(() => {
                        console.log("Bulk Insert Success!");
                    });
                });
            })
            .catch(error => {
                console.log(error);
            });
    }
};
