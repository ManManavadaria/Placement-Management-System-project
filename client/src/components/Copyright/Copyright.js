import React from "react";
import "./Copyright.css";
function Copyright() {
  return (
    <div>
      <div className="footer-style">
        Copyright © Man Krushang and Mohammad &nbsp; {new Date().getFullYear()}
      </div>
    </div>
  );
}

export default Copyright;
