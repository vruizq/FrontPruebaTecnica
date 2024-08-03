import { useEffect, useState } from "react";
import axios from "axios";
import "../src/App.css";
import logo from "../src/assets/logoAdres.png";
import { useAdminContext } from "../src/context/AdminContext";
function FormularioAdmi() {
  const { setAdqui } = useAdminContext();

  const [presupuesto, setPresupuesto] = useState();
  const [unidad, setUnidad] = useState();
  const [tipodebienoservicio, setTipodebienoservicio] = useState("medicamentos");
  const [cantidad, setCantidad] = useState();
  const [valorUnitario, setValorunitario] = useState();
  const [valorTotal, setValorTotal] = useState();
  const [fechadeAdquisicion, setFechadeAdquisicion] = useState();
  const [proveedor, setProveedor] = useState();
  const [documentacion, setDocumentacion] = useState();
  const handleSubmit = async (event) => {
    event.preventDefault();
    var estado =0;
    const data = {
      presupuesto,
      unidad,
      tipodebienoservicio,
      cantidad,
      valorUnitario,
      valorTotal,
      fechadeAdquisicion,
      proveedor,
      documentacion,
      estado:1,
    };
    setAdqui(data)
    console.table(data);
  };
  return (
    <form className="acquisition-form" onSubmit={handleSubmit}>
      <div className="contenedorlogo">
        <img className="logo" src={logo} />
      </div>
      <h2>Registro de Adquisición</h2>
      <label>
        Presupuesto:
        <input
          type="number"
          name="presupuesto"
          onChange={(e) => {
            setPresupuesto(e.target.value);
          }}
        />
      </label>
      <label>
        Unidad:
        <input
          type="text"
          name="unidad"
          onChange={(e) => {
            setUnidad(e.target.value);
          }}
        />
      </label>
      <label>
        Tipo de Bien o Servicio:
        <select
          name="TBS"
          onChange={(e) => {
            setTipodebienoservicio(e.target.value);
          }}
        >
          <optgroup label="Bienes">
            <option value="medicamentos">Medicamentos</option>
            <option value="equipos-medicos">Equipos Médicos</option>
            <option value="insumos-medicos">Insumos Médicos</option>
          </optgroup>
          <optgroup label="Servicios">
            <option value="atencion-primaria">Atencion Médica Primaria</option>
            <option value="atencion-especializada">
              Atención Especializada
            </option>
            <option value="hospitalizacion">Hospitalizacion</option>
            <option value="urgencias">Urgencias</option>
            <option value="prevencion-promocion">
              Programas de Prevencion y Promocion de la Salud
            </option>
            <option value="rehabilitacion">Rehabilitacion</option>
            <option value="salud-mental">Servicios de Salud Mental</option>
          </optgroup>
        </select>
      </label>
      <label>
        Cantidad:
        <input
          type="number"
          name="cantidad"
          onChange={(e) => {
            setCantidad(e.target.value);
          }}
        />
      </label>
      <label>
        Valor Unitario:
        <input
          type="number"
          name="valorUnitario"
          onChange={(e) => {
            setValorunitario(e.target.value);
          }}
        />
      </label>
      <label>
        Valor Total:
        <input
          type="number"
          name="valorUnitario"
          onChange={(e) => {
            setValorTotal(e.target.value);
          }}
        />
      </label>
      <label>
        Fecha de Adquisición:
        <input
          type="date"
          name="fechaAdquisicion"
          onChange={(e) => {
            setFechadeAdquisicion(e.target.value);
          }}
        />
      </label>
      <label>
        Proveedor:
        <input
          type="text"
          name="proveedor"
          onChange={(e) => {
            setProveedor(e.target.value);
          }}
        />
      </label>
      <label>
        Documentación:
        <input
          type="text"
          name="documentacion"
          onChange={(e) => {
            setDocumentacion(e.target.value);
          }}
        />
      </label>
      <button type="submit">Registrar</button>
    </form>
  );
}

export default FormularioAdmi;
