import React, { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { cnpj } from "cpf-cnpj-validator";
import EmpresaContext from "../context/EmpresaContext";

function CadastroEmpresas() {
  const [cnpjValid, setCnpjValid] = useState(false);
  const { setEmpresas, empresas } = useContext(EmpresaContext)
  const { register, handleSubmit, setValue, setFocus } = useForm();
  const onSubmit = (data) => handleSubmitEmpresa(data);
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

  const handleSubmitEmpresa = (data) => {
    const companyToSave = {
      name: data.fantasia
    }
    setEmpresas([
      ...empresas,
      companyToSave,
    ])
  }

  const handleCnpjChange = (event) => {
    const cpfValue = event.target.value;
    if (cpfValue.length === 14) {
      const cnpjValidation = cnpj.isValid(cpfValue);
      console.log("cpfValidation", cnpjValidation);
      return setCnpjValid(cnpjValidation);
    }
    setCnpjValid(false);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1>Cadastro de Empresa</h1>
        <label for="rasao">Rasão Social</label>
        <input
          id="rasao"
          {...register("rasao")}
          required="required"
          type="text"
          placeholder="digite a rasão social da empresa"
        />
        <br />
        <label for="fantasy">Nome Fantasia</label>
        <input
          id="fantasy"
          {...register("fantasia")}
          required="required"
          type="text"
          placeholder="digite o nome fantasia "
        />

        <br />

        <label for="cnpj">CNPJ</label>
        <input
          id="cnpj"
          {...register("cnpj")}
          required="required"
          type="number"
          placeholder="ex. 123456/1000-31"
          onChange={handleCnpjChange}
        />

        <br />

        <label for="data-cadastro">Data de Cadastro</label>
        <input
          id="data-cadastro"
          name="data-cadastro"
          required="required"
          type="date"
        />

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
          placeholder="(ddd) número"
        />

        <br />

        <label for="celular">Celular</label>
        <input
          id="celular"
          {...register("celular")}
          required="required"
          type="number"
          placeholder="(ddd) número"
        />

        <br />

        <label for="contato">Contato</label>
        <input
          id="contato"
          {...register("contato")}
          required="required"
          type="number"
          placeholder="(ddd) número"
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
          placeholder="(ddd) número"
        />
        <br />

        <label for="numero-casa">Número:</label>
        <input
          id="numero-casa"
          {...register("numero-casa")}
          required="required"
          type="number"
          placeholder="número da residencia"
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

        <input type="submit" disabled={!cnpjValid} value="Cadastrar" />
      </form>
    </div>
  );
}

export default CadastroEmpresas;
