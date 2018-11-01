import React, { Component } from "react";
import { JobList } from "./JobList";
import { Query } from "react-apollo";
import { companyQuery } from "../data/query";

export class CompanyDetail extends Component {
    render() {
        const { match } = this.props;
        return (
            <Query
                query={companyQuery}
                variables={{ id: match.params.companyId }}
            >
                {({ data, loading }) => {
                    if (loading) return "loading...";
                    const { company } = data;
                    return (
                        <div>
                            <h1 className="title">{company.name}</h1>
                            <div className="box">{company.description}</div>
                            <h5 className="title is-5">
                                Jobs at {company.name}
                            </h5>
                            <JobList jobs={company.jobs} />
                        </div>
                    );
                }}
            </Query>
        );
    }
}
