"use strict";

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert(
            "Users",
            [
                {
                    email: "alice@facegle.io",
                    password: "alice123",
                    CompanyId: 1,
                    role: "admin"
                },
                {
                    email: "bob@goobook.co",
                    password: "bob123",
                    CompanyId: 2,
                    role: "venue"
                }
            ],
            {}
        );
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete("Users", null, {});
    }
};
