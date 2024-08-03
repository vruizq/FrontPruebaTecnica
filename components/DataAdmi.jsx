import { useEffect, useState } from "react";
import "../src/App.css";
import DataTable from "react-data-table-component";
import { useAdminContext } from "../src/context/AdminContext";

function DataAdmi() {
  const { datos, getAdqui, putAdqui, desactivarAdqui } = useAdminContext();
  const [datoSelect, setDatoSelect] = useState();
  const [id, setId] = useState();
  const [presupuesto, setPresupuesto] = useState();
  const [unidad, setUnidad] = useState();
  const [tipodebienoservicio, setTipodebienoservicio] = useState();
  const [cantidad, setCantidad] = useState();
  const [valorUnitario, setValorunitario] = useState();
  const [valorTotal, setValorTotal] = useState();
  const [fechadeAdquisicion, setFechadeAdquisicion] = useState();
  const [proveedor, setProveedor] = useState();
  const [documentacion, setDocumentacion] = useState();
  const [filteredDatos, setFilteredDatos] = useState(datos);

  // Estados para los filtros
  const [filtroProveedor, setFiltroProveedor] = useState("");
  const [filtroTipoBienServicio, setFiltroTipoBienServicio] = useState("");
  const [filtroFecha, setFiltroFecha] = useState("");

  useEffect(() => {
    if (datoSelect) {
      setPresupuesto(datoSelect.presupuesto);
      setUnidad(datoSelect.unidad);
      setTipodebienoservicio(datoSelect.tipodebienoservicio);
      setCantidad(datoSelect.cantidad);
      setValorunitario(datoSelect.valorUnitario);
      setValorTotal(datoSelect.valorTotal);
      setFechadeAdquisicion(datoSelect.fechadeAdquisicion);
      setProveedor(datoSelect.proveedor);
      setDocumentacion(datoSelect.documentacion);
      setId(datoSelect.id);
    }
  }, [datoSelect]);

  useEffect(() => {
    getAdqui();
  }, []);

  useEffect(() => {
    setFilteredDatos(datos);
  }, [datos]);

  const applyFilters = () => {
    let filtered = datos;

    if (filtroProveedor) {
      filtered = filtered.filter((item) =>
        item.proveedor.toLowerCase().includes(filtroProveedor.toLowerCase())
      );
    }

    if (filtroTipoBienServicio) {
      filtered = filtered.filter(
        (item) => item.tipodebienoservicio === filtroTipoBienServicio
      );
    }

    if (filtroFecha) {
      filtered = filtered.filter(
        (item) => item.fechadeAdquisicion === filtroFecha
      );
    }

    setFilteredDatos(filtered);
  };

  const customStyles = {
    headCells: {
      style: {
        backgroundColor: "#f1f1f1", // Cambia el color de fondo del encabezado
        color: "#333", // Cambia el color de la letra del encabezado
        fontWeight: "bold",
      },
    },
    rows: {
      style: {
        "&:not(:last-of-type)": {
          borderBottomStyle: "solid",
          borderBottomWidth: "1px",
          borderBottomColor: "#ddd",
        },
        "&:hover": {
          backgroundColor: "#f5f5f5", // Sombreado al pasar el mouse sobre la fila
        },
      },
    },
  };

  const columns = [
    {
      name: "Fecha de Adquisición",
      selector: (row) => row.fechadeAdquisicion,
    },
    {
      cell: (row) => (
        <div>
          {row.estado == 1 ? (
            <button
              className="botoneliminar"
              onClick={() => {
                desactivarAdqui({ id: row.id, estado: row.estado });
              }}
            >
              Desactivar
            </button>
          ) : (
            <button
              className="botonhabilitar"
              onClick={() => {
                desactivarAdqui({ id: row.id, estado: row.estado });
              }}
            >
              Habilitar
            </button>
          )}

          <button
            className="botonmodificar"
            onClick={() => {
              setDatoSelect(row);
            }}
          >
            Modificar
          </button>
        </div>
      ),
    },
    {
      selector: (row) => row.estado,
      cell: (row) => {
        if (row.estado == 0) {
          return (
            <div style={{display:"flex", width:"350px",placeItems:"center",color:"red"}}>
              <div
                style={{
                  display: "block",
                  width: "10px",
                  height: "10px",
                  backgroundColor: "red",
                  borderRadius: "100%",
                  marginRight: "5px",
                }}
              ></div>
              Desactivado
            </div>
          );
        } else {
          return  <div style={{display:"flex", width:"350px",placeItems:"center",color:"green"}}>
          <div
            style={{
              display: "block",
              width: "10px",
              height: "10px",
              backgroundColor: "green",
              borderRadius: "100%",
              marginRight: "5px",
            }}
          ></div>
          Activado
        </div>;
        }
      },
    },
    {
      name: "Presupuesto",
      selector: (row) => row.presupuesto,
    },
    {
      name: "Unidad",
      selector: (row) => row.unidad,
    },
    {
      name: "Tipo de Bien o Servicio",
      selector: (row) => row.tipodebienoservicio,
    },
    {
      name: "Cantidad",
      selector: (row) => row.cantidad,
    },
    {
      name: "Valor Unitario",
      selector: (row) => row.valorUnitario,
    },
    {
      name: "Valor Total",
      selector: (row) => row.valorTotal,
    },

    {
      name: "Proveedor",
      selector: (row) => row.proveedor,
    },
    {
      name: "Documentación",
      selector: (row) => row.documentacion,
    },
  ];

  return (
    <div className="contenedorft">
      <div className="contenedor-filtros">
        <input
          placeholder="Proveedor"
          type="text"
          value={filtroProveedor}
          onChange={(e) => setFiltroProveedor(e.target.value)}
        />
        <select
          name="TBS"
          value={filtroTipoBienServicio}
          onChange={(e) => setFiltroTipoBienServicio(e.target.value)}
        >
          <option value="">Todos los tipos</option>
          <optgroup label="Bienes">
            <option value="medicamentos">Medicamentos</option>
            <option value="equipos-medicos">Equipos Médicos</option>
            <option value="insumos-medicos">Insumos Médicos</option>
          </optgroup>
          <optgroup label="Servicios">
            <option value="atencion-primaria">Atención Médica Primaria</option>
            <option value="atencion-especializada">
              Atención Especializada
            </option>
            <option value="hospitalizacion">Hospitalización</option>
            <option value="urgencias">Urgencias</option>
            <option value="prevencion-promocion">
              Programas de Prevención y Promoción de la Salud
            </option>
            <option value="rehabilitacion">Rehabilitación</option>
            <option value="salud-mental">Servicios de Salud Mental</option>
          </optgroup>
        </select>
        <input
          type="date"
          value={filtroFecha}
          onChange={(e) => setFiltroFecha(e.target.value)}
        />
        <button
          style={{
            background: "transparent",
            border: "none",
            color: "#1f307c",
          }}
          onClick={applyFilters}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            style={{ width: "20px" }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
        </button>
      </div>
      <div className="contenedor-modificar">
        {datoSelect && (
          <>
            <div className="label-conte">
              <label htmlFor="">Presupuesto:</label>

              <input
                type="text"
                value={presupuesto}
                onChange={(e) => {
                  setPresupuesto(e.target.value);
                }}
              />
            </div>
            <div className="label-conte">
              <label htmlFor="">Unidad:</label>

              <input
                type="text"
                value={unidad}
                onChange={(e) => {
                  setUnidad(e.target.value);
                }}
              />
            </div>
            <div className="label-conte">
              <label htmlFor="">Tipo de Bien o Servicio:</label>
              <input
                type="text"
                value={tipodebienoservicio}
                onChange={(e) => {
                  setTipodebienoservicio(e.target.value);
                }}
              />
            </div>
            <div className="label-conte">
              <label htmlFor="">Cantidad:</label>
              <input
                type="text"
                value={cantidad}
                onChange={(e) => {
                  setCantidad(e.target.value);
                }}
              />
            </div>
            <div className="label-conte">
              <label htmlFor="">Valor Unitario:</label>

              <input
                type="text"
                value={valorUnitario}
                onChange={(e) => {
                  setValorunitario(e.target.value);
                }}
              />
            </div>
            <div className="label-conte">
              <label htmlFor="">Valor Total:</label>
              <input
                type="text"
                value={valorTotal}
                onChange={(e) => {
                  setValorTotal(e.target.value);
                }}
              />
            </div>
            <div className="label-conte">
              <label htmlFor="">Fecha de Adquisicion:</label>
              <input
                type="text"
                value={fechadeAdquisicion}
                onChange={(e) => {
                  setFechadeAdquisicion(e.target.value);
                }}
              />
            </div>
            <div className="label-conte">
              <label htmlFor="">Proveedor:</label>
              <input
                type="text"
                value={proveedor}
                onChange={(e) => {
                  setProveedor(e.target.value);
                }}
              />
            </div>
            <div className="label-conte">
              <label htmlFor="">Documentacion:</label>
              <input
                type="text"
                value={documentacion}
                onChange={(e) => {
                  setDocumentacion(e.target.value);
                }}
              />
            </div>

            <button
              onClick={() => {
                putAdqui({
                  documentacion,
                  proveedor,
                  fechadeAdquisicion,
                  valorTotal,
                  valorUnitario,
                  cantidad,
                  tipodebienoservicio,
                  unidad,
                  presupuesto,
                  id,
                });
                setDatoSelect(null)
              }}
            >
              Guardar
            </button>
          </>
        )}
      </div>
      <div className="contenedor-tabla">
        <DataTable
          columns={columns}
          data={filteredDatos} // Usar los datos filtrados
          customStyles={customStyles}
        />
      </div>
    </div>
  );
}

export default DataAdmi;
