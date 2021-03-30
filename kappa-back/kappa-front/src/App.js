import React, { useState } from "react";
import MainComponent from "./components/MainComponent";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { ConfigureStore } from "./redux/configureStore";
import { IntlProvider } from "react-intl";
import messages from "./assets/messages";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import "./App.scss";

const store = ConfigureStore();

function App() {
  const [locale, setLocale] = useState("en");

  return (
    <IntlProvider locale={locale} messages={messages[locale]}>
      <Provider store={store}>
        <BrowserRouter>
          <div className="App">
            <MainComponent setLocale={setLocale} />
          </div>
        </BrowserRouter>
      </Provider>
    </IntlProvider>
  );
}

export default App;
