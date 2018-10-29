const db = require("./models/db");

const Query = {
    job: (root, { id }) => {
        return db.Job.findById(id)
            .then(job => {
                return job;
            })
            .catch(error => {
                throw new Error("Not Found");
            });
    },
    jobs: () => {
        return db.Job.findAll()
            .then(jobs => {
                return jobs;
            })
            .catch(error => {
                throw new Error("Not Found");
            });
    },
    company: (root, { id }) => {
        return db.Company.findById(id)
            .then(company => {
                return company;
            })
            .catch(error => {
                throw new Error("Not Found");
            });
    }
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

        return db.Job.create({ CompanyId: user.CompanyId, ...input }).then(
            result => {
                console.log("123");
                console.log(result.dataValues);

                return result.dataValues;
            }
        );
    }
};

const Job = {
    company: job => {
        return db.Company.findById(job.CompanyId)
            .then(job => {
                return job;
            })
            .catch(error => {
                throw new Error("Not Found");
            });
    }
};

const Company = {
    jobs: company => {
        return db.Job.findAll()
            .then(jobs => {
                return jobs.filter(job => job.CompanyId === company.id);
            })
            .catch(error => {
                throw new Error("Not Found");
            });
    }
};

module.exports = { Query, Mutation, Job, Company };
