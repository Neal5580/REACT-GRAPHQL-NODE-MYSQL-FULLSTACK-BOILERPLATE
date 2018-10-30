import React, { Component } from "react";
import { createJob } from "./requests";
import { Query, Mutation } from "react-apollo";
import gql from "graphql-tag";

export class JobForm extends Component {
    constructor(props) {
        super(props);
        this.state = { title: "", description: "" };
    }

    handleChange(event) {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    render() {
        const { title, description } = this.state;
        return (
            <div>
                <h1 className="title">New Job</h1>
                <div className="box">
                    <Mutation
                        mutation={createJobMutation}
                        variables={{
                            title: title,
                            description: description
                        }}
                    >
                        {(createJob, { data }) => (
                            <form
                                onSubmit={e => {
                                    e.preventDefault();
                                    createJob()
                                        .then(job => {
                                            this.props.history.push(
                                                `/jobs/${job.id}`
                                            );
                                        })
                                        .catch(e => {
                                            console.log(e);
                                        });
                                }}
                            >
                                <div className="field">
                                    <label className="label">Title</label>
                                    <div className="control">
                                        <input
                                            className="input"
                                            type="text"
                                            name="title"
                                            value={title}
                                            onChange={this.handleChange.bind(
                                                this
                                            )}
                                        />
                                    </div>
                                </div>
                                <div className="field">
                                    <label className="label">Description</label>
                                    <div className="control">
                                        <textarea
                                            className="input"
                                            style={{ height: "10em" }}
                                            name="description"
                                            value={description}
                                            onChange={this.handleChange.bind(
                                                this
                                            )}
                                        />
                                    </div>
                                </div>
                                <div className="field">
                                    <div className="control">
                                        <button
                                            type="submit"
                                            className="button is-link"
                                        >
                                            Submit
                                        </button>
                                    </div>
                                </div>
                            </form>
                        )}
                    </Mutation>
                </div>
            </div>
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

const createJobMutation = gql`
    mutation CreateJob($input: CreateJobInput) {
        job: createJob(input: $input) {
            ...JobDetail
        }
    }
    ${jobDetailFragment}
`;

const jobQuery = gql`
    query JobQuery($id: ID!) {
        job(id: $id) {
            ...JobDetail
        }
    }
    ${jobDetailFragment}
`;
