"use strict";

export default (sequelize, DataTypes) => {
    const Job = sequelize.define("Job", {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        }
    });

    Job.associate = models => {
        models.Job.belongsTo(models.Company);
    };

    return Job;
};
