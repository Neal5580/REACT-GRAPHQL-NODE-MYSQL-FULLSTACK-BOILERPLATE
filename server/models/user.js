"use strict";

export default (sequelize, DataTypes) => {
    const User = sequelize.define("User", {
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        role: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        }
    });

    User.associate = models => {
        models.User.belongsTo(models.Company);
    };

    return User;
};
