import React, { Component } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import { Link } from "react-router-dom";

export class JobBoard extends Component {
    render() {
        return (
            <div>
                <h1 className="title">Job Board</h1>
                <ul className="box">
                    <Query query={jobsQuery} /*fetchPolicy="no-cache"*/>
                        {({ loading, data, fetchMore }) => {
                            if (loading) return "loading...";
                            const { jobs } = data;
                            return jobs.map(job => {
                                const title = job.company
                                    ? `${job.title} at ${job.company.name}`
                                    : job.title;
                                return (
                                    <React.Fragment key={job.id}>
                                        <li className="media">
                                            <div className="media-content">
                                                <Link to={`/jobs/${job.id}`}>
                                                    {title}
                                                </Link>
                                            </div>
                                        </li>
                                    </React.Fragment>
                                );
                            });
                        }}
                    </Query>
                </ul>
            </div>
        );
    }
}

const jobsQuery = gql`
    query JobsQuery {
        jobs {
            id
            title
            company {
                id
                name
            }
        }
    }
`;
