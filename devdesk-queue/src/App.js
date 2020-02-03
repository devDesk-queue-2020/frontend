import React from 'react';
import {Route} from 'react-router-dom';
import Header from "./components/Header.js";
import AppHome from './components/AppHome';
import SignUp from './components/SignUp';
import Login from './components/Login';


function App() {
  return (
   <main>
     <Header />
     <Route exact path="/" component={AppHome} />
      <Route exact path="/signup" component={SignUp} />
      <Route exact path="/login" component={Login} />
   </main>
  );
}

export default App;
