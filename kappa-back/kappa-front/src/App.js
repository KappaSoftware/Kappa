import React, { useState } from "react";
import MainComponent from "./components/MainComponent";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { ConfigureStore } from "./redux/configureStore";
import { IntlProvider } from "react-intl";
import messages from "./assets/messages";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import "./App.scss";

const store = ConfigureStore();

const theme = createMuiTheme({
  typography: {
    fontFamily: "Poppins",
  },
});

function App() {
  const [locale, setLocale] = useState("en");

  return (
    <ThemeProvider theme={theme}>
      <IntlProvider locale={locale} messages={messages[locale]}>
        <Provider store={store}>
          <BrowserRouter>
            <div className="App">
              <MainComponent setLocale={setLocale} />
            </div>
          </BrowserRouter>
        </Provider>
      </IntlProvider>
    </ThemeProvider>
  );
}

export default App;
