import db from "../models";
import { AuthenticationError } from "apollo-server-express";

export default {
    Query: {
        job: async (root, { id }) => {
            try {
                return await db.Job.findById(id);
            } catch (e) {
                throw new Error("Error");
            }
        },
        jobs: async () => {
            console.log("123");

            return await db.Job.findAll();
        }
    },

    Mutation: {
        createJob: async (root, { input }, { user }) => {
            //if user is not logged in
            if (!user) {
                throw new AuthenticationError("Unauthorized");
            }

            //if user does not have "admin" permission
            if (user.role !== "admin") {
                throw new AuthenticationError("Unauthorized");
            }

            return await db.Job.create({
                CompanyId: user.CompanyId,
                ...input
            });
        }
    },
    Job: {
        company: job => {
            return db.Company.findById(job.CompanyId);
        }
    }
};
