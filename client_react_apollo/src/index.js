import "bulma/css/bulma.css";
import React from "react";
import ReactDOM from "react-dom";
import { App } from "./App";
import { ApolloProvider, Query } from "react-apollo";
import { InMemoryCache } from "apollo-boost";
import { getAccessToken, isLoggedIn } from "./auth";
import ApolloClient from "apollo-boost";

const client = new ApolloClient({
    uri: "http://localhost:9000/graphql",
    request: async operation => {
        if (isLoggedIn()) {
            const token = await localStorage.getItem("token");
            operation.setContext({
                headers: {
                    authorization: "Bearer " + getAccessToken()
                }
            });
        }
    },
    cache: new InMemoryCache(),

    clientState: {
        defaults: {},
        resolvers: {}
    }
});

ReactDOM.render(
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>,
    document.getElementById("root")
);

//ReactDOM.render(<App />, document.getElementById('root'));
