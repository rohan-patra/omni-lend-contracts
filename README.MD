# Omni-Lend Contracts

This repository contains the smart contracts for Omni-Lend, a decentralized lending platform. The repository is organized into the following main directories:

## Directory Structure

- **backend**: Contains the backend logic and smart contracts.
- **frontend**: Contains the front-end application to interact with the smart contracts.
- **interact**: Scripts and tools for interacting with the deployed contracts.

## Getting Started

### Prerequisites

Ensure you have the following installed:

- Node.js
- npm or yarn
- Hardhat

### Installation

Clone the repository and install the dependencies:

```bash
git clone https://github.com/rohan-patra/omni-lend-contracts.git
cd omni-lend-contracts
npm install
```

### Running the Tests

To run the tests, use the following command:

```bash
npx hardhat test
```

### Deploying the Contracts

To deploy the contracts to a network, use the following command:

```bash
npx hardhat run scripts/deploy.js --network <network-name>
```

Replace `<network-name>` with the target network (e.g., `localhost`, `rinkeby`, `mainnet`).

## Contributing

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add some feature'`).
5. Push to the branch (`git push origin feature/your-feature`).
6. Open a pull request.
