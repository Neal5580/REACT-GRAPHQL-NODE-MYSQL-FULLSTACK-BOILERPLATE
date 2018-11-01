import { gql } from "apollo-server-express";

export default gql`
    extend type Query {
        job(id: ID!): Job
        jobs: [Job]
    }

    extend type Mutation {
        createJob(input: CreateJobInput): Job
    }

    type Job {
        id: ID!
        title: String
        company: Company
        description: String
    }

    input CreateJobInput {
        companyId: ID
        title: String
        description: String
    }
`;
