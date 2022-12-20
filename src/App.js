import "./App.css";
import EmpresaProvider from "./context/EmpresaProvider";
import CadastroClientes from "./pages/CadastroClientes";
import CadastroEmpresas from "./pages/CadastroEmpresas";
import CadastroProdutos from "./pages/CadastroProdutos";
import CadastroVendas from "./pages/CadastroVendas";

function App() {
  return (
    <div className="App">
      <EmpresaProvider>
        <CadastroEmpresas />
        <CadastroClientes />
        <CadastroProdutos />
        <CadastroVendas />
      </EmpresaProvider>
    </div>
  );
}

export default App;
