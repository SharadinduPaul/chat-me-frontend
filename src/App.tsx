import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";
import { Layout } from "./components/global";
import {
  AboutPage,
  AuthenticationPage,
  HomePage,
  PageNotFound,
  ProfilePage
} from "./pages";
import { UserContext, UserInterface } from "./utils/context";
import { getUser, saveUser } from "./utils/handleUser";

function App() {
  const [user, setUser] = React.useState<UserInterface>(getUser() ?? {});

  const navigate = useNavigate();

  React.useEffect(() => {
    const user = getUser();
    if (!user?.token) {
      navigate("/auth");
    }
  }, []);
  React.useEffect(() => {
    if (user) saveUser(user);
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <div className="App">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="chat" element={<HomePage />} />
            <Route index element={<AuthenticationPage />} />
            <Route path="auth" element={<AuthenticationPage />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="*" element={<PageNotFound />} />
          </Route>
        </Routes>
      </div>
    </UserContext.Provider>
  );
}

export default App;
