import { gql } from "apollo-server-express";

export default gql`
    extend type Query {
        company(id: ID!): Company
    }

    type Company {
        id: ID!
        name: String
        description: String
        jobs: [Job]
    }
`;
