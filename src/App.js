import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./Home";
import AddCakeForm from "./AddCakeForm ";
import { ToastContainer } from "react-toastify";
import Single from "./Single";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<AddCakeForm  />} />
        <Route path="cake/:id" element={<Single  />} />

      </Routes>
      <ToastContainer />
    </Router>
  );
}

export default App;
