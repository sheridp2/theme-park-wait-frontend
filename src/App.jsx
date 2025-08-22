import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Dashboard/Home";
import MagicKingdom from "./pages/Dashboard/MagicKingdom";
import Epcot from "./pages/Dashboard/Epcot";

function App() {

  return (
    <>
      <div>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/magic-kingdom" element={<MagicKingdom />} />
            <Route path="/epcot" element={<Epcot />} />
          </Routes>
        </Router>
      </div>
     
    </>
  )
}

export default App
