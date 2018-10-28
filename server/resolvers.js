const db = require("./db");

const Query = {
    job: (root, { id }) => db.jobs.get(id),
    jobs: () => db.jobs.list(),
    company: (root, { id }) => db.companies.get(id)
};

const Mutation = {
    createJob: (root, { input }, { user }) => {
        //if user is not logged in
        if (!user) {
            throw new Error("Unauthorized");
        }

        //if user does not have "admin" permission
        if (user.role !== "admin") {
            throw new Error("Unauthorized");
        }
        console.log(user.role);

        const id = db.jobs.create({ companyId: user.companyId, ...input });
        return db.jobs.get(id);
    }
};

const Job = {
    company: job => db.companies.get(job.companyId)
};

const Company = {
    jobs: company => db.jobs.list().filter(job => job.companyId === company.id)
};

module.exports = { Query, Mutation, Job, Company };
