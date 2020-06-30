import React from "react";
import ReactDOM from "react-dom";
import regeneratorRuntime from "regenerator-runtime";

import StoreProvider from "./store/store-provider";
import TranslationProvider from "./translation/translation-provider";
import Main from "./components/Main";

function App() {
  return (
    <StoreProvider>
      <TranslationProvider>
        <Main />
      </TranslationProvider>
    </StoreProvider>
  );
}

ReactDOM.render(<App />, document.getElementById("main"));
