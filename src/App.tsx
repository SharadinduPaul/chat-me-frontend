import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import { Layout } from "./components/global";
import { AuthenticationPage } from "./pages";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* <Route index element={<Home />} /> */}
          <Route path="signup" element={<AuthenticationPage />} />
          <Route path="login" element={<AuthenticationPage login />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
