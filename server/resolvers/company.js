import db from "../models/db";

export default {
    Query: {
        company: async (root, { id }) => {
            return await db.Company.findById(id);
        }
    },

    Company: {
        jobs: async company => {
            return await db.Job.findAll({
                where: {
                    CompanyId: company.id
                }
            });
        }
    }
};
