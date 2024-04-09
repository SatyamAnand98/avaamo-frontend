import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UniqueWord from "./Components/UniqueWord";
import Synonym from "./Components/Synonym";
import Masking from "./Components/Masking";
import Home from "./Components/home.js";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/uniqueword" element={<UniqueWord />} />
                    <Route path="/synonym" element={<Synonym />} />
                    <Route path="/masking" element={<Masking />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
