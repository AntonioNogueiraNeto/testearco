import React, { useState, useMemo } from "react";
import EmpresaContext from "./EmpresaContext";

export default function EmpresaProvider({ children }) {
  const [empresas, setEmpresas] = useState([])
  const [produtos, setProdutos] = useState([])
  const [clientes, setClientes] = useState([])
  const value = useMemo(() => ({ setEmpresas, empresas, setProdutos, produtos, setClientes, clientes }), [empresas, produtos, clientes]);

  return (
    <EmpresaContext.Provider value={value}>{children}</EmpresaContext.Provider>
  );
}
