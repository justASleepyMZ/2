// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Marketplace {
    struct Model {
        string name;
        string description;
        uint256 price;
        address creator;
        uint256 totalRatings;
        uint256 ratingCount;
    }

    Model[] public models;
    mapping(address => uint256) public balances;

    // Add a new AI model to the marketplace
    function listModel(string memory name, string memory description, uint256 price) public {
        require(price > 0, "Price must be greater than zero.");
        models.push(Model(name, description, price, msg.sender, 0, 0));
    }

    // Purchase a model by ID
    function purchaseModel(uint256 modelId) public payable {
        require(modelId < models.length, "Model does not exist.");
        Model storage model = models[modelId];
        require(msg.value == model.price, "Incorrect payment amount.");
        
        balances[model.creator] += msg.value;
    }

    // Rate a purchased model
    function rateModel(uint256 modelId, uint8 rating) public {
        require(modelId < models.length, "Model does not exist.");
        require(rating >= 1 && rating <= 5, "Rating must be between 1 and 5.");
        
        Model storage model = models[modelId];
        model.totalRatings += rating;
        model.ratingCount += 1;
    }

    // Withdraw accumulated funds
    function withdrawFunds() public {
        uint256 balance = balances[msg.sender];
        require(balance > 0, "No funds to withdraw.");
        
        balances[msg.sender] = 0;
        payable(msg.sender).transfer(balance);
    }

    // Retrieve details of a specific model
    function getModelDetails(uint256 modelId)
        public
        view
        returns (string memory, string memory, uint256, address, uint256)
    {
        require(modelId < models.length, "Model does not exist.");
        Model storage model = models[modelId];
        uint256 averageRating = model.ratingCount > 0 ? model.totalRatings / model.ratingCount : 0;
        return (model.name, model.description, model.price, model.creator, averageRating);
    }
}
