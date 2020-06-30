import React from "react";
import ReactDOM from "react-dom";
import regeneratorRuntime from "regenerator-runtime";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import { I18nextProvider } from "react-i18next";
import i18next from "i18next";

import Main from "./components/Main";

i18next.init({
  interpolation: { escapeValue: false },
  lng: "en",
  supportedLngs: ["en", "de"],
  resources: {
    en: {
      translation: {
        average: "Average",
        languageChange: "Switch to English",
        mainHeading: "Glucose",
      },
    },
    de: {
      translation: {
        average: "Durchschnitt",
        languageChange: "Zu Deutsch wechseln",
        mainHeading: "Glukose",
      },
    },
  },
});

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
      <I18nextProvider i18n={i18next}>
        <Main />
      </I18nextProvider>
    </ApolloProvider>
  );
}

ReactDOM.render(<App />, document.getElementById("main"));
