# AI Model Marketplace dApp

## Overview
A decentralized application for listing, purchasing, and rating AI models.

## Usage
1. Clone the repository.
2. Deploy the smart contract.
3. Start the frontend.
4. Use the dApp to list, purchase, and rate models.

## License
MIT

## How It Works

## Smart Contract
The core logic is handled by the smart contract, Marketplace.sol, written in Solidity. Key functionalities include:

Listing Models:
Users can list a new AI model by providing a name, description, and price.

Purchasing Models:
Users can purchase a listed model by sending the required payment. The payment is transferred to the model creator.

Rating Models:
After purchasing a model, users can provide a rating between 1 and 5.

Withdrawing Funds:
Model creators can withdraw their accumulated funds earned through sales.

Viewing Model Details:
Anyone can retrieve details about a specific AI model, such as its name, description, price, creator, and average rating.

## Frontend
The frontend is built with React and allows users to interact with the smart contract via MetaMask. Key components:

List Models:
A form to add new AI models to the marketplace.

Display Models:
A grid/list view showing all available AI models.

Purchase Models:
A button to buy a selected model by interacting with the smart contract.

Rate Models:
A form to rate purchased models, contributing to their overall rating.

Withdraw Funds:
A button for model creators to withdraw their earnings.

## Code Explanation

## Smart Contract (contracts/Marketplace.sol)
listModel:
Allows users to list new models. Each model is stored as a struct with attributes like name, description, price, and ratings.
purchaseModel:
Transfers the price from the buyer to the model creator and tracks sales.
rateModel:
Updates the total rating and count for a model, enabling the calculation of an average rating. Only valid ratings (1–5) are accepted.
withdrawFunds:
Allows creators to withdraw their earnings. It ensures no re-entrancy attacks by setting the balance to zero before transferring funds.
getModelDetails:
Fetches the complete details of a model, including its average rating.

## Frontend (frontend/src)
web3.js:
Initializes a Web3 instance to connect the dApp with MetaMask.
contract.js:
Loads the deployed smart contract's ABI and address, enabling function calls.
App.js:
The main React component that:
Fetches and displays the list of models.
Allows users to interact with the smart contract (list, purchase, rate, withdraw).
Updates the UI based on blockchain events.
