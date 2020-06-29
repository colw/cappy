import React from "react";
import ReactDOM from "react-dom";
import Main from "./components/Main";
import regeneratorRuntime from "regenerator-runtime";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";

const client = new ApolloClient({
  uri: "http://localhost:9000/graphql",
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Main />
    </ApolloProvider>
  );
}

ReactDOM.render(<App />, document.getElementById("main"));
