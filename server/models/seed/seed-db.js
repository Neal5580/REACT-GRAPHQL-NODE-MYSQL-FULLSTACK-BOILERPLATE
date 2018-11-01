"use strict";

import models from "../db";
import _USERS from "./users.json";
import _JOBS from "./jobs.json";
import _COMPANYS from "./companies.json";

export default {
    insert: async () => {
        await Promise.all([
            models.Company.bulkCreate(_COMPANYS),
            models.Job.bulkCreate(_JOBS),
            models.User.bulkCreate(_USERS)
        ]);
        console.log("Bulk Insert Success!");
    }
};
