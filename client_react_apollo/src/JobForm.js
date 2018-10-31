import React, { Component } from "react";
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
                            input: {
                                title: title,
                                description: description
                            }
                        }}
                        update={(cache, { data }) => {
                            const { job } = data;

                            console.log(job.id);

                            cache.writeQuery({
                                query: jobQuery,
                                variables: { id: job.id },
                                data
                            });
                        }}
                    >
                        {(createJob, { loading, error }) => (
                            <form
                                onSubmit={e => {
                                    e.preventDefault();
                                    createJob()
                                        .then(({ data }) => {
                                            this.props.history.push(
                                                `/jobs/${data.job.id}`
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
                                {loading && <p>Loading...</p>}
                                {error && <p>Error :( Please try again</p>}
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
