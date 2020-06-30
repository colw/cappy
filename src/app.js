import React from "react";
import ReactDOM from "react-dom";
import regeneratorRuntime from "regenerator-runtime";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";

import TranslationProvider from "./translation/provider";
import Main from "./components/Main";

let host = "";
let uri = `${window.location.origin}/.netlify/functions/graphql`;
if (process.env.NODE_ENV === "development") {
  uri = `${process.env.DEV_API_HOST}/graphql`;
}

const client = new ApolloClient({
  uri,
});

function App() {
  return (
    <ApolloProvider client={client}>
      <TranslationProvider>
        <Main />
      </TranslationProvider>
    </ApolloProvider>
  );
}

ReactDOM.render(<App />, document.getElementById("main"));
