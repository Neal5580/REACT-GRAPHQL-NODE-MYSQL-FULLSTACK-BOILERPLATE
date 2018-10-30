import React, { Component } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import { Link } from "react-router-dom";

export class JobDetail extends Component {
    render() {
        const { match } = this.props;
        return (
            <Query query={jobQuery} variables={{ id: match.params.jobId }}>
                {({ data, loading }) => {
                    if (loading) return "loading...";
                    const { job } = data;
                    return (
                        <div>
                            <h1 className="title">{job.title}</h1>
                            <h2 className="subtitle">
                                <Link to={`/companies/${job.company.id}`}>
                                    {job.company.name}
                                </Link>
                            </h2>
                            <div className="box">{job.description}</div>
                        </div>
                    );
                }}
            </Query>
        );
    }
}
const jobDetailFragment = gql`
    fragment JobDetail on Job {
        id
        title
        company {
            id
            name
        }
        description
    }
`;

const jobQuery = gql`
    query JobQuery($id: ID!) {
        job(id: $id) {
            ...JobDetail
        }
    }
    ${jobDetailFragment}
`;
