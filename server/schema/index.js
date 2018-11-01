import { gql } from "apollo-server-express";
import jobSchema from "./job";
import companySchema from "./company";

const linkSchema = gql`
    type Query {
        _: Boolean
    }
    type Mutation {
        _: Boolean
    }
    type Subscription {
        _: Boolean
    }
`;

export default [linkSchema, jobSchema, companySchema];
