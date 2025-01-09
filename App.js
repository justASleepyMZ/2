import React, { useState, useEffect } from "react";
import web3 from "./utils/web3";
import contract from "./utils/contract";

function App() {
  const [models, setModels] = useState([]);
  const [account, setAccount] = useState("");
  const [newModel, setNewModel] = useState({ name: "", description: "", price: "" });

  useEffect(() => {
    const fetchAccount = async () => {
      const accounts = await web3.eth.getAccounts();
      setAccount(accounts[0]);
    };
    fetchAccount();
    fetchModels();
  }, []);

  const fetchModels = async () => {
    const totalModels = await contract.methods.modelsLength().call();
    const allModels = [];
    for (let i = 0; i < totalModels; i++) {
      const model = await contract.methods.getModelDetails(i).call();
      allModels.push({ ...model, id: i });
    }
    setModels(allModels);
  };

  const listModel = async () => {
    const { name, description, price } = newModel;
    await contract.methods.listModel(name, description, web3.utils.toWei(price, "ether")).send({ from: account });
    fetchModels();
  };

  const purchaseModel = async (id, price) => {
    await contract.methods.purchaseModel(id).send({ from: account, value: web3.utils.toWei(price, "ether") });
    fetchModels();
  };

  return (
    <div>
      <h1>AI Model Marketplace</h1>
      <h2>Account: {account}</h2>

      <h3>List a New Model</h3>
      <input type="text" placeholder="Name" onChange={(e) => setNewModel({ ...newModel, name: e.target.value })} />
      <input type="text" placeholder="Description" onChange={(e) => setNewModel({ ...newModel, description: e.target.value })} />
      <input type="number" placeholder="Price in ETH" onChange={(e) => setNewModel({ ...newModel, price: e.target.value })} />
      <button onClick={listModel}>List Model</button>

      <h3>Available Models</h3>
      <ul>
        {models.map((model, index) => (
          <li key={index}>
            <h4>{model.name}</h4>
            <p>{model.description}</p>
            <p>Price: {web3.utils.fromWei(model.price, "ether")} ETH</p>
            <button onClick={() => purchaseModel(model.id, model.price)}>Purchase</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
