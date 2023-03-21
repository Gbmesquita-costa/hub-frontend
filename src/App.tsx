import { BrowserRouter as Router } from "react-router-dom"

import { MainRoutes } from "./routes/routes";
import { ContextApi } from "./context/context";
import { ToastContainer } from "react-toastify"

import "react-toastify/dist/ReactToastify.min.css"

import './App.scss';

function App(): JSX.Element {
  return (
    <Router>
      <ContextApi>
        <MainRoutes/>
        <ToastContainer/>
      </ContextApi>
    </Router>
  );
}

export default App;
