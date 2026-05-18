import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Home from "./pages/Dashboard/Home";
import MagicKingdom from "./pages/DisneyWorld/MagicKingdom";
import Epcot from "./pages/DisneyWorld/Epcot";
import AnimalKingdom from "./pages/DisneyWorld/AnimalKingdom";
import HollywoodStudios from "./pages/DisneyWorld/HollywoodStudios";
import Disneyland from "./pages/Disneyland/Disneyland";
import CaliforniaAdventure from "./pages/Disneyland/CaliforniaAdventure";
import UniversalStudiosFlorida from "./pages/UniversalStudios/UniversalStudiosFlorida";
import Login from "./pages/Auth/Login";
import SignUp from "./pages/Auth/SignUp";
import UserProvider from "./context/userContext";
import User from "./pages/Dashboard/User";
import { useLayoutEffect } from "react";

const Wrapper = ({ children }) => {
  const location = useLocation();

  useLayoutEffect(() => {
    // Scroll to the top of the page when the route changes
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [location.pathname]);

  return children;
};

function App() {
  return (
    <UserProvider>
      <Router>
        <Wrapper>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/user" element={<User />} />
            <Route path="/login" exact element={<Login />} />
            <Route path="/signup" exact element={<SignUp />} />
            <Route path="/magickingdom" element={<MagicKingdom />} />
            <Route path="/epcot" element={<Epcot />} />
            <Route path="/animalkingdom" element={<AnimalKingdom />} />
            <Route path="/hollywoodstudios" element={<HollywoodStudios />} />
            <Route path="/disneyland" element={<Disneyland />} />
            <Route path="/universalstudiosflorida" element={<UniversalStudiosFlorida />} />
            <Route
              path="/californiaadventure"
              element={<CaliforniaAdventure />}
            />
          </Routes>
        </Wrapper>
      </Router>
    </UserProvider>
  );
}

export default App;
