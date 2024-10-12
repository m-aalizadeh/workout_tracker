import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "./components/Home";
import Dashboard from "./components/Dashboard";

const App = () => {
  const history = useNavigate();
  return (
    <Routes>
      <Route path="/" element={<Home history={history} />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
};

export default App;
