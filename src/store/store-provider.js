import React from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";

let uri = `${window.location.origin}/.netlify/functions/graphql`;
if (process.env.NODE_ENV === "development") {
  uri = `${process.env.DEV_API_HOST}/graphql`;
}

const client = new ApolloClient({
  uri,
});

function StoreProvider({ children }) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}

export default StoreProvider;
