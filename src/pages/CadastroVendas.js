import React, { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import EmpresaContext from "../context/EmpresaContext";

function CadastroVendas() {
  const [productsToSell, setProductsToSell] = useState([]);
  const [productQty, setProductQty] = useState("1");
  const [selectedProduct, setSelectedProduct] = useState({});
  const [sellingInfo, setSellingInfo] = useState({});
  const [paidValue, setPaidValue] = useState(0)
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => console.log(data);

  console.log("productsToSell", productsToSell);

  const { empresas, clientes, produtos } = useContext(EmpresaContext);

  // const handleUpdateStock = () => {
  //   for (let i = 0; i < produtos.length; i++) {
  //     const currentProduct = produtos[i];
  //   }
  // }

  const addProduct = () => {
    const newProduct = {
      name: selectedProduct.name,
      quantity: productQty,
      price: selectedProduct.price,
      promotionPrice: selectedProduct.promotion,
    };

    setProductsToSell([...productsToSell, newProduct]);
    handleCalculateAmounts([...productsToSell, newProduct]);
  };

  const handleCalculateAmounts = (sellingProducts) => {
    const totalAmount = sellingProducts.reduce((acc, curr) => {
      return parseFloat(acc) + parseFloat(curr.price * curr.quantity);
    }, 0);

    const totalPromotion = sellingProducts.reduce((acc, curr) => {
      return parseFloat(acc) + parseFloat(curr.promotionPrice * curr.quantity);
    }, 0);

    const totalWithDiscount = totalAmount - totalPromotion;
    const discountPercentage = (totalWithDiscount * 100) / totalAmount;

    setSellingInfo({
      totalAmount,
      totalPromotion,
      discountPercentage,
    });
  };

  const handleChooseProduct = (event) => {
    const productChosen = event.target.value;
    const productData = produtos.find(
      (product) => product.name === productChosen
    );
    setSelectedProduct(productData);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1>Cadastro de Vendas</h1>
        {/* <label for="empresa">Empresa: </label>
        <input
          id="empresa"
          {...register("empresa")}
          required="required"
          type="text"
          placeholder="Nome da empresa"
        /> */}

        <label for="empresa">Empresa :</label>
        <select id="empresa" {...register("empresa")}>
          {empresas.map(({ name }, index) => (
            <option key={index} value={name}>
              {name}
            </option>
          ))}
        </select>
        <br />

        {/*<label for="cliente">Cliente</label>
         <input
          id="cliente"
          {...register("cliente")}
          required="required"
          type="number"
          placeholder="Nome do cliente"
        /> */}

        <label for="clientes">Clientes :</label>
        <select id="clientes" {...register("clientes")}>
          {clientes.map(({ name }, index) => (
            <option key={index} value={name}>
              {name}
            </option>
          ))}
        </select>

        <br />

        <label for="data">Data da Venda</label>
        <input
          id="data"
          name="data"
          required="required"
          type="date"
          {...register("data")}
        />

        <br />

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
          }}
        >
          <label for="produtos">Produtos</label>
          <select
            id="produtos"
            {...register("produtos")}
            onChange={(event) => handleChooseProduct(event)}
            defaultValue=""
          >
            <option value="">-</option>
            {produtos.map(({ name }, index) => (
              <option key={index} value={name}>
                {name}
              </option>
            ))}
          </select>

          <label for="quantidade">Quantidade</label>
          <input
            id="quantidade"
            {...register("quantidade")}
            required="required"
            type="number"
            placeholder="quantidade"
            onChange={(event) => setProductQty(event.target.value)}
          />
          <button type="button" onClick={addProduct}>adicionar</button>
        </div>      

        <div>
          <input
            id="valorPago"
            {...register("valorPago")}
            required="required"
            type="number"
            placeholder="valor pago"
            onChange={(event) => setPaidValue(event.target.value)}
          />
        </div>  
        
        {productsToSell.length > 0 && (
          <input type="submit" value="Cadastrar" />
        )}
      </form>

      <div>
        {Object.entries(sellingInfo).length > 0 && paidValue && (
          <>
            <h3>Informações da venda</h3>
            <div>Desconto em %: {sellingInfo.discountPercentage.toFixed(2)}%</div>
            <div>Total da Venda (sem desconto): R${sellingInfo.totalAmount}</div>
            <div>
              Total da Venda (com desconto): R${sellingInfo.totalPromotion}
            </div>
            <div>
              Troco: R${paidValue - sellingInfo.totalPromotion}
            </div>
          </>
        )}

        <h3>Listagem de produtos</h3>
        <ol>
          {productsToSell.map(({ name, quantity, price }, index) => (
            <li
              key={index}
              style={{ display: "flex", justifyContent: "center", gap: "10px" }}
            >
              <div>Produto: {name}</div>
              <div>Quantidade: {quantity}</div>
              <div>Preço: {price}</div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

export default CadastroVendas;
