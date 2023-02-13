import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";
import { Layout } from "./components/global";
import { AuthenticationPage, HomePage } from "./pages";
import { getUser } from "./utils/handleUser";

function App() {
  const navigate = useNavigate();
  React.useEffect(() => {
    const user = getUser();
    if (!user?.token) {
      navigate("/login");
    }
  }, []);
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="signup" element={<AuthenticationPage />} />
          <Route path="login" element={<AuthenticationPage login />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
