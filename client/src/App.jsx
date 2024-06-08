import { BrowserRouter, Routes, Route } from "react-router-dom";

import React from "react";
import Home from './pages/Home';
import About from './pages/About';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import Projects from './pages/Projects';
import Header from "./components/Header";
import Footer from "./components/Footer";

export default function App() {
  return (
    <BrowserRouter>
    <Header/>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/about" element={<About/>}></Route>
        <Route path="/sign-in" element={<SignIn/>}></Route>
        <Route path="/sign-up" element={<SignUp/>}></Route>
        <Route path="/projects" element={<Projects/>}></Route>
        <Route path="/dashboard" element={<Dashboard/>}></Route>
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
}
