import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Dashboard/Home";
import MagicKingdom from "./pages/Dashboard/MagicKingdom";
import Epcot from "./pages/Dashboard/Epcot";
import { AnimalKingdom } from "./pages/Dashboard/AnimalKingdom";

function App() {

  return (
    <>
      <div>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/magickingdom" element={<MagicKingdom />} />
            <Route path="/epcot" element={<Epcot />} />
            <Route path="/animalkingdom" element={<AnimalKingdom />} />
          </Routes>
        </Router>
      </div>
     
    </>
  )
}

export default App
