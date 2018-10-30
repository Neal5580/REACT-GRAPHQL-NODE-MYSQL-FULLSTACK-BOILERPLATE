import "bulma/css/bulma.css";
import React from "react";
import ReactDOM from "react-dom";
import { App } from "./App";
import { ApolloProvider, Query } from "react-apollo";
import ApolloClient from "apollo-boost";

const client = new ApolloClient({
    uri: "http://localhost:9000/graphql",
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
