import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LandingPage from "./LandingPage";
import Login from "./Login";
import Register from "./Register";

import Home from "./components/Home";
import UserData from "./pages/User/UserData";

import NewPlan from "./pages/Plans/NewPlan";
import NewSuggestion from "./pages/Plans/NewSuggestion";
import SuggestedNutrition from "./pages/Plans/SuggestedNutrition";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<UserData />} />

        <Route path="/plans/new" element={<NewPlan />} />
        <Route path="/suggestions/new" element={<NewSuggestion />} />
        <Route path="/suggestions" element={<SuggestedNutrition />} />
      </Routes>
    </Router>
  );
}

export default App;
