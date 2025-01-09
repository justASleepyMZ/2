const Marketplace = artifacts.require("Marketplace");

contract("Marketplace", (accounts) => {
  it("should allow a user to list a model", async () => {
    const instance = await Marketplace.deployed();
    await instance.listModel("Model1", "Description1", web3.utils.toWei("1", "ether"), { from: accounts[0] });

    const model = await instance.models(0);
    assert.equal(model.name, "Model1");
    assert.equal(model.price, web3.utils.toWei("1", "ether"));
  });
});
