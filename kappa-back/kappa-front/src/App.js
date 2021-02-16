import logo from "./logo.svg";
import MainComponent from "./components/MainComponent";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { ConfigureStore } from "./redux/configureStore";
import "./App.css";

const store = ConfigureStore();

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="App">
          <MainComponent></MainComponent>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
