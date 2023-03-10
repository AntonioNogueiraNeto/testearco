import React, {useState, useContext} from "react";
import { useForm } from "react-hook-form";
import { cpf } from 'cpf-cnpj-validator';
import EmpresaContext from "../context/EmpresaContext";

function CadastroClientes() {
  const [cpfValid, setCpfValid] = useState(false)
  const { clientes, setClientes } = useContext(EmpresaContext)
  const { register, handleSubmit, setValue, setFocus } = useForm();
  const onSubmit = (data) => handleSubmitCliente(data);
  const checkCep = (e) => {
    const cep = e.target.value.replace(/\D/g, "");
    console.log(cep);
    fetch(`https://viacep.com.br/ws/${cep}/json/`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setValue("rua", data.logradouro);
        setValue("bairro", data.bairro);
        setValue("cidade", data.localidade);
        setValue("estado", data.uf);
        setFocus("numero-casa");
      });
  };

  const handleSubmitCliente = (data) => {
    const clientToSave = {
      name: data.nome,
    }

    setClientes([
      ...clientes,
      clientToSave,
    ])
  }

  const handleCpfChange = (event) => {
    const cpfValue = event.target.value
    if (cpfValue.length === 11) {
      const cpfValidation = cpf.isValid(cpfValue)
      console.log('cpfValidation', cpfValidation)
      return setCpfValid(cpfValidation)
    }
    setCpfValid(false)
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1>Cadastro de Cliente</h1>
        <label for="nome">Nome: </label>
        <input
          id="nome"
          {...register("nome")}
          required="required"
          type="text"
          placeholder="digite seu nome"
        />
        <br />

        <label for="cpf">CPF</label>
        <input
          id="cpf"
          {...register("cpf")}
          required="required"
          type="number"
          placeholder="ex. 555.555.555-55"
          onChange={handleCpfChange}
        />

        <br />

        <label for="data">Data de Nascimento</label>
        <input id="data" name="data" required="required" type="date" />

        <br />

        <label for="cadastro">Data de Cadastro</label>
        <input id="cadastro" name="cadastro" required="required" type="date" />

        <br />

        <label for="email">E-mail</label>
        <input
          id="email"
          {...register("email")}
          required="required"
          type="email"
          placeholder="digite seu e-mail"
        />

        <br />

        <label for="telefone">Telefone</label>
        <input
          id="telefone"
          {...register("telefone")}
          required="required"
          type="number"
          placeholder="(ddd) n??mero"
        />

        <br />

        <label for="celular">Celular</label>
        <input
          id="celular"
          {...register("celular")}
          required="required"
          type="number"
          placeholder="(ddd) n??mero"
        />

        <br />

        <label for="cep">Cep:</label>
        <input
          id="cep"
          {...register("cep")}
          onBlur={checkCep}
          required="required"
          type="text"
          placeholder="digite seu cep"
        />
        <br />

        <label for="rua">Rua:</label>
        <input
          id="rua"
          {...register("rua")}
          required="required"
          type="text"
          placeholder="(ddd) n??mero"
        />
        <br />

        <label for="numero-casa">N??mero:</label>
        <input
          id="numero-casa"
          {...register("numero-casa")}
          required="required"
          type="number"
          placeholder="n??mero da residencia"
        />
        <br />

        <label for="bairro">Bairro:</label>
        <input
          id="bairro"
          {...register("bairro")}
          required="required"
          type="text"
          placeholder="digite seu bairro"
        />
        <br />

        <label for="cidade">Cidade:</label>
        <input
          id="cidade"
          {...register("cidade")}
          required="required"
          type="text"
          placeholder="digite sua cidade"
        />
        <br />

        <label htmlFor="estado">Estado:</label>
        <input
          type="text"
          {...register("estado")}
          id="estado"
          required="required"
          placeholder="digite seu estado"
        />

        <br />

        <input type="submit" disabled={!cpfValid} value="Cadastrar" />
      </form>
    </div>
  );
}

export default CadastroClientes;
