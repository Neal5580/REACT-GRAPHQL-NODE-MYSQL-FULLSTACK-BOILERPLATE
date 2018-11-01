"use strict";

export default (sequelize, DataTypes) => {
    const Company = sequelize.define("Company", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        }
    });

    return Company;
};
