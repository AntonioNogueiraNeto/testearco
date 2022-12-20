import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import EmpresaContext from "../context/EmpresaContext";

function CadastroProdutos() {
  const { register, handleSubmit } = useForm();
  const { setProdutos, produtos } = useContext(EmpresaContext);
  const onSubmit = (data) => handleSubmitProdut(data);

  const handleSubmitProdut = (data) => {
    const productToSave = {
      name: data.descricao,
      price: data.valor,
      quantity: data.quantidade,
      promotion: data.valorPromocao,
    };

    setProdutos([...produtos, productToSave]);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1>Cadastro de Produtos</h1>
      <label for="descricao">Descrição: </label>
      <input
        id="descricao"
        {...register("descricao")}
        required="required"
        type="text"
        placeholder="digite a descrição do produto"
      />
      <br />

      <label for="valor">Valor</label>
      <input
        id="valor"
        {...register("valor")}
        required="required"
        type="number"
        placeholder="valor do produto"
      />

      <br />

      <label for="valor-promocao">Valor Promocional</label>
      <input
        id="valor-promocao"
        {...register("valorPromocao")}
        required="required"
        type="number"
        placeholder="valor do produto em promocao"
      />

      <br />

      <label for="data-inicio">Data Inicial da Promoção</label>
      <input
        id="data-inicio"
        {...register("data-inicio")}
        type="date"
      />

      <br />

      <label for="data-fim">Data Final da Promoção</label>
      <input
        id="data-fim"
        {...register("data-fim")}
        type="date"
      />

      <br />

      <label for="data-cadastro">Data de Cadastro</label>
      <input
        id="data-cadastro"
        {...register("data-cadastro")}
        required="required"
        type="date"
      />

      <br />
      <label>Status</label>
      <select {...register("status")}>
        <option value="ative">ativo</option>
        <option value="inative">inativo</option>
      </select>

      <br />

      <label for="quantidade">Estoque</label>
      <input
        id="quantidade"
        {...register("quantidade")}
        required="required"
        type="number"
        placeholder="quantidade do produto"
      />

      <br />

      <input type="submit" value="Cadastrar" />
    </form>
  );
}

export default CadastroProdutos;
