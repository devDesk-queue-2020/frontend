import React from "react";
import { Route, Redirect } from "react-router-dom";
import Header from "./components/Header";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import StudentDashboard from "./components/Student/StudentDashboard";
import HelperDashboard from "./components/Helper/HelperDashboard";
import CreateTicket from "./components/Student/CreateTicket";

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
      <Route path="/student/dashboard" component={StudentDashboard} />
      <Route path="/helper/dashboard" component={HelperDashboard} />
      <Route path="/student/createticket" component={CreateTicket} />
    </main>
  );
}

export default App;
