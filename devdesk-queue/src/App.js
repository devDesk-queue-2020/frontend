import React, { useState } from "react";
import { Route, Redirect } from "react-router-dom";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import StudentDashboard from "./components/Student/StudentDashboard";
import HelperDashboard from "./components/Helper/HelperDashboard";
import CreateTicket from "./components/Student/CreateTicket";

import "./App.css";

function App() {
  const [token, setToken] = useState("");

  return (
    <main>
      <Route
        exact
        path="/"
        render={() => (
          <>
            <Redirect to="/login/" />
          </>
        )}
      />
      <Route 
      path="/signup" 
      render={props => <SignUp setToken={setToken} {...props}/>} 
      />
      <Route
        path="/login"
        render={props => <Login setToken={setToken} {...props} />}
      />
      <Route
        path="/student/dashboard"
        render={props => <StudentDashboard token={token} />}
      />{" "}
      <Route
        path="/helper/dashboard"
        render={props => <HelperDashboard token={token} />}
      />
      <Route
        path="/student/createticket"
        render={props => <CreateTicket token={token} />}
      />
    </main>
  );
}

export default App;
