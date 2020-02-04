import React from "react";
import { Route, Redirect } from "react-router-dom";
import Header from "./components/Header";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import StudentDashboard from "./components/Student/StudentDashboard";

import "./App.css";

function App() {
  return (
    <main>
      <Header />
      <Route
        exact
        path="/"
        render={() => (
          <>
            <Redirect to="/login/" />
          </>
        )}
      />
      <Route path="/signup" component={SignUp} />
      <Route path="/login" component={Login} />
      <Route path="/Student/studentdashboard" component={StudentDashboard} />
    </main>
  );
}

export default App;
