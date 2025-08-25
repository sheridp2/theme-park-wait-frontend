import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Dashboard/Home";
import MagicKingdom from "./pages/DisneyWorld/MagicKingdom";
import Epcot from "./pages/DisneyWorld/Epcot";
import AnimalKingdom from "./pages/DisneyWorld/AnimalKingdom";
import HollywoodStudios from "./pages/DisneyWorld/HollywoodStudios";
import Disneyland from "./pages/Disneyland/Disneyland";
import CaliforniaAdventure from "./pages/Disneyland/CaliforniaAdventure";
import Login from "./pages/Auth/Login";
import SignUp from "./pages/Auth/SignUp";
import UserProvider from "./context/userContext";

function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" exact element={<Login />} />
          <Route path="/signup" exact element={<SignUp />} />
          <Route path="/magickingdom" element={<MagicKingdom />} />
          <Route path="/epcot" element={<Epcot />} />
          <Route path="/animalkingdom" element={<AnimalKingdom />} />
          <Route path="/hollywoodstudios" element={<HollywoodStudios />} />
          <Route path="/disneyland" element={<Disneyland />} />
          <Route
            path="/californiaadventure"
            element={<CaliforniaAdventure />}
          />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
