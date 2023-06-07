import React from "react";
import { BrowserRouter, Route, Routes as BrowserRoutes, Navigate } from "react-router-dom";
import  "react-router-dom";

//Pages
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Dashboard from "./pages/Dashboard/Dashboard";
import NotFound from "./pages/NotFound/NotFound";
import Cards from "./pages/Cards/Cards";
import Charts from "./pages/Charts/Charts";

const Routes = () => (
  <BrowserRouter>
    <BrowserRoutes>
      {/* <Route exact path='/' element={<Navigate to='dashboard' />} /> */}
      <Route path='/signin' element={<SignIn />} />
      <Route path='/' element={<Dashboard />} />
      <Route path='/signup' element={<SignUp />} />
      <Route path='/cards' element={<Cards />} />
      <Route path='/charts' element={<Charts />} />
      <Route path='*' element={<NotFound />} />
    </BrowserRoutes>
  </BrowserRouter>
);

export default Routes;
