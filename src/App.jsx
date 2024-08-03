import { useEffect, useState } from "react";
import FormularioAdmi from "../components/FormularioAdmi";
import "./App.css";
import DataAdmi from "../components/DataAdmi";
import { AdminProvider } from "./context/AdminContext";

function App() {
  return (
    <div className="contenedor-p">
      <AdminProvider>
        <FormularioAdmi />
        <DataAdmi />
      </AdminProvider>
      
    </div>
  );
}

export default App;
