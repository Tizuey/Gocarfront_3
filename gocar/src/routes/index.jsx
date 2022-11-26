import React, { useContext, useState } from "react";

import { Context } from "../Context/Context";
import ContextProvider from "../Context/Context";

import SecondaryHeader from "../components/Headers/Header_Secondary";
import MainHeader from "../components/Headers/Header_Main";
import Home from "../pages/Home";
import Product from "../pages/Product";
import Booking from "../pages/Booking";
import BookingSignIn from "../pages/BookingSignIn";
import BookingDone from "../pages/BookingDone";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import Footer from "../components/Footer";

import { BrowserRouter, Routes, Route, useParams, Navigate  } from "react-router-dom";

const RouteList = () => {
  const usuarioLogado = localStorage.getItem("nome");

  const { carsProducts, carsImage } = useContext(Context);

  const { id } = useParams();

  const selectedProduct = carsProducts?.find((product) => product?.id == id);
  
  // lógica do cadastro de login e cadastro

  const [user, setUser] = useState(null);

  const login = ( data ) => {
    console.log("login auth", {data})
    setUser({id:"123", data})
  }
  
  const logout = () => {
    console.log("logout")
  }



  // !! : ele que faz o bolean de verficação se null ou não ( casting de boolean)
  // user == null -> authenticated = false
  // user != null -> authenticated = true


  return (
    <>
      <ContextProvider value={{authenticated: 
        !!user, user, login, logout}}>
        <BrowserRouter>
          <header>
            {usuarioLogado ? (
              <SecondaryHeader nomeUsuario={usuarioLogado} />
            ) : (
              <MainHeader product={selectedProduct}/>
            )}
          </header>

          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/product/:id" element={<Product />} />
            <Route path="/product/:id/reserve" element={<Booking />} />
            <Route
              path="/product/:id/reserve/signin"
              element={<BookingSignIn />}
            />
            <Route path="/reserve-done" element={<BookingDone />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>

          <footer>
            <Footer />
          </footer>
        </BrowserRouter>
      </ContextProvider>
    </>
  );
};

export default RouteList;