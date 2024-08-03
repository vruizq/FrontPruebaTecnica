import { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";
export const AdminContext = createContext();
export const useAdminContext = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error("AdminContext must be used within a AdminContext");
  }
  return context;
};
export const AdminProvider = ({ children }) => {
  const [datos, setDatos] = useState();
  const desactivarAdqui = async (data) => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/crud/${data.id}`, data);

      console.log(response);
    } catch (err) {
      console.log(err);
    } finally {
      getAdqui();
    }
  };
  const putAdqui = async (data) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/crud/${data.id}`, data);

      console.log(response);
    } catch (err) {
      console.log(err);
    } finally {
      getAdqui();
    }
  };

  const getAdqui = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/crud");
      setDatos(response.data);
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  const setAdqui = async (data) => {
    try {
      const response = await axios.post(`http://localhost:5000/api/crud`, data);
      console.log(response);
    } catch (err) {
      console.log(err);
    } finally {
      getAdqui();
    }
  };

  return (
    <AdminContext.Provider
      value={{
        setAdqui,
        getAdqui,
        datos,
        putAdqui,
        desactivarAdqui,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};
