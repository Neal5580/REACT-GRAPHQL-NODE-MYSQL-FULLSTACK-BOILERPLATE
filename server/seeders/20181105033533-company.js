"use strict";

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert(
            "Companies",
            [
                {
                    name: "Facegle",
                    description:
                        "JBG We are a startup on a mission to disrupt social search engines. Think Facebook meet Google."
                },
                {
                    name: "Goobook",
                    description:
                        "We are a startup on a mission to disrupt search social media. Think Google meet Facebook."
                }
            ],
            {}
        );
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete("Companies", null, {});
    }
};
