const db = require("./models/db");

const Query = {
    job: async (root, { id }) => {
        return await db.Job.findById(id);
    },
    jobs: async () => {
        return await db.Job.findAll();
    },
    company: async (root, { id }) => {
        return await db.Company.findById(id);
    }
};

const Mutation = {
    createJob: async (root, { input }, { user }) => {
        //if user is not logged in
        if (!user) {
            throw new Error("Unauthorized");
        }

        //if user does not have "admin" permission
        if (user.role !== "admin") {
            throw new Error("Unauthorized");
        }

        return await db.Job.create({
            CompanyId: user.CompanyId,
            ...input
        });
    }
};

const Job = {
    company: job => {
        return db.Company.findById(job.CompanyId);
    }
};

const Company = {
    jobs: async company => {
        return await db.Job.findAll({
            where: {
                CompanyId: company.id
            }
        });
    }
};

module.exports = { Query, Mutation, Job, Company };
