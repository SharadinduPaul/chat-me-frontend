import React from "react";
import { Routes, Route, useNavigate, Outlet } from "react-router-dom";
import "./App.css";
import { Layout } from "./components/global";
import {
  AboutPage,
  AuthenticationPage,
  HomePage,
  PageNotFound,
  ProfilePage,
  VerifyPage
} from "./pages";
import { UserContext } from "./utils/context";
import { getUser, saveUser } from "./utils/handleUser";

function App() {
  const [user, setUser] = React.useState<any>(getUser() ?? {});

  React.useEffect(() => {
    saveUser(user);
  }, [user]);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Outlet />
              </>
            }
          >
            <Route index element={<AuthenticationPage />} />
            <Route path="verify" element={<VerifyPage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="*" element={<PageNotFound />} />
          </Route>
          <Route path="/chat" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="profile" element={<ProfilePage />} />
          </Route>
        </Routes>
      </div>
    </UserContext.Provider>
  );
}

export default App;
