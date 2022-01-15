import SignupPage from "./views/SignupPage";
import LoginPage from "./views/LoginPage";
import MoviesPage from "./views/MoviesPage";
import NavBar from "./components/NavBar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { UserProvider } from "./UserContext";

function App() {
  return (
    <Router>
      <UserProvider>
        <NavBar />
        <Routes>
          <Route path="/signup" element={<SignupPage />}></Route>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/" element={<MoviesPage />}></Route>
        </Routes>
      </UserProvider>
    </Router>
  );
}

export default App;
