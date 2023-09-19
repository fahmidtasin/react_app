import { Controller } from "@hotwired/stimulus"
import React from "react";
import ReactDOM from "react-dom/client"
import App from "../react/src/components/App";
import Navbar from "../react/src/components/Navbar";

// Connects to data-controller="react"
export default class extends Controller {
  connect() {
    console.log("Connected to react!");
    const id = document.getElementById("app");
    ReactDOM.createRoot(id).render(
        <div>
          <div>
            <Navbar/>
          </div>

          <div className={"container"}>
            <App/>
          </div>
        </div>

    );
  }
}
