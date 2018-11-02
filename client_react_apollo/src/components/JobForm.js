import React, { Component } from "react";
import { Query, Mutation } from "react-apollo";
import { jobsQuery } from "../data/query";
import { createJobMutation } from "../data/mutation";
import UploadFile from "./UploadFile";
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
                            /*
                            cache.writeQuery({
                                query: jobQuery,
                                variables: { id: data.job.id },
                                data
                            });
                            */

                            const new_job_list = cache.readQuery({
                                query: jobsQuery
                            });

                            new_job_list.jobs.push(data.job);

                            // Write our data back to the cache.
                            cache.writeQuery({
                                query: jobsQuery,
                                data: new_job_list
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
                    <UploadFile />
                </div>
            </div>
        );
    }
}
