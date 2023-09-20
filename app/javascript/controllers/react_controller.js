import { Controller } from "@hotwired/stimulus";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "../react/src/components/Navbar";
import App from "../react/src/components/App";
import About from "../react/src/components/About";

export default class extends Controller {
    connect() {
        console.log("Connected to react!");
        const id = document.getElementById("app");
        ReactDOM.createRoot(id).render(
            <BrowserRouter>
                <div>
                    <Navbar />
                    <Routes>
                        <Route path="/" element={<App />} />
                        <Route path="/about" element={<About />} />
                    </Routes>
                </div>
            </BrowserRouter>
        );
    }
}
