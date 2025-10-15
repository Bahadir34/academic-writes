import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import Header from "./components/header";
import Footer from "./components/footer";
import Login from "./pages/login";
import Register from "./pages/register";

const App = () => {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen overflow-x-hidden">
        <Header />
        <main className="flex-1 flex flex-col min-h-[100vh-82px]">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/assays" />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
