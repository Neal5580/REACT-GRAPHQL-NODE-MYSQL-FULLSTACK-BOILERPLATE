import React, { Component } from "react";
import { Query } from "react-apollo";
import { Link } from "react-router-dom";
import { jobQuery } from "../data/query";

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
