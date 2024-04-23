import React from "react";
import "./App.css";
import HomePage from "./pages/HomePage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ItemPage from "./pages/ItemPage";
import Header from "./components/Header";
import Checkout from "./pages/Checkout";
import { RecoilRoot } from "recoil";
import AuctionPage from "./pages/AuctionPage";
import PaymentSuccess from "./pages/PaymentSuccess";
import PaymentInfoPage from "./pages/PaymentInfoPage";
import LoginSuccess from "./pages/LoginSuccess";
import LogoutSuccess from "./pages/LogoutSuccess";

function App() {
  return (
    <div className="App">
      <RecoilRoot>
        <Header title="4GO8GO" />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/item/:itemId" element={<ItemPage />} />
          <Route path="/payment/:itemId" element={<Checkout />} />
          <Route path="/auction" element={<AuctionPage />} />
          <Route path="/payments/:paymentId" element={<PaymentSuccess />} />
          <Route
            path="/payment-info/:paymentId"
            element={<PaymentInfoPage />}
          />
          <Route path="/loginsuccess" element={<LoginSuccess />} />
          <Route path="/logoutsuccess" element={<LogoutSuccess />} />
        </Routes>
      </RecoilRoot>
    </div>
  );
}

export default App;
