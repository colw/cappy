import React from "react";
import ReactDOM from "react-dom";

import { ThemeProvider } from "theme-ui";
import theme from "@rebass/preset";

import StoreProvider from "./store/store-provider";
import TranslationProvider from "./translation/translation-provider";
import Main from "./components/Main";

function App() {
  return (
    <StoreProvider>
      <TranslationProvider>
        <ThemeProvider theme={theme}>
          <Main />
        </ThemeProvider>
      </TranslationProvider>
    </StoreProvider>
  );
}

ReactDOM.render(<App />, document.getElementById("main"));
