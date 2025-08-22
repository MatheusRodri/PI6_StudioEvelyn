import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; 
import Home from "./pages/Home/index.js";
import Login from "./pages/Login/index.js";
import Servicos from "./pages/Servicos/index.js"
import Registro from "./pages/Registro/index.js";
import Agendamento from "./pages/Agendamento/index.js";
import Agendamentos from "./pages/Agendamentos/index.js";
import KeydownShortcuts from "./func/key.js";
import Concluido from "./pages/Concluido/index.js";

function App() {
  
  return (
    <Router>
       <KeydownShortcuts/>
        <Routes> 
          <Route exact path="/" element={<Home/>} /> 
          <Route path="/login" element={<Login />} />
          <Route path="/servicos" element={<Servicos />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/agendamento" element={<Agendamento />} />
          <Route path="/agendamentos" element={<Agendamentos />} />
       
        </Routes>
    </Router>
  );
}

export default App;
