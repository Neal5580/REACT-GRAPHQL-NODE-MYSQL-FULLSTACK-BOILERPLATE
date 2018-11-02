import "bulma/css/bulma.css";
import React from "react";
import ReactDOM from "react-dom";
import { App } from "./components/App";
import { ApolloProvider, Query } from "react-apollo";
import { InMemoryCache } from "apollo-boost";
import { getAccessToken, isLoggedIn } from "./auth/auth";
import { ApolloClient } from "apollo-client";
import { createUploadLink } from "apollo-upload-client";
import { setContext } from "apollo-link-context";

const authLink = setContext((_, { headers }) => {
    return {
        headers: {
            ...headers,
            authorization: isLoggedIn() ? `Bearer ${getAccessToken()}` : ""
        }
    };
});

const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: authLink.concat(
        createUploadLink({
            uri: "http://localhost:9000/graphql",
            cretentials: "include"
        })
    )
});

ReactDOM.render(
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>,
    document.getElementById("root")
);
