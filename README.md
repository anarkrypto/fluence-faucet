# Fluence Faucet
A beautiful faucet for Fluence dar network

This project was built for the [HackFS Hackaton 2024](https://ethglobal.com/events/hackfs2024)

It includes a friendly and clean UI built with HTML, JS and TailwindCSS.

It connect users wallet using Web3 Modal, SIWE and Ethers.js

![image](https://github.com/anarkrypto/fluence-faucet/assets/32111208/d5c21ae1-16a8-4e28-bdd2-50d07cc0ad68)

## Disclaimer

The project does not yet implement the fluence backend, there is still no communication with smart contracts, the transaction is merely demonstrative. The initial goal of this project is to bring a new authentication mechanism with SIWE (Sign In With Ethereum) for a variety of wallets, to the Fluence faucet.

I invite Fluence DAO devs to contribute to the integration of the old backend and/or the formulation of a new cloudless backend for the fluence network.


## Get Started

### Install dependencies:
```bash
npm install
```

### Start:
```bash
npm start
```

Then, open the url in your browser: [http://localhost:3000](http://localhost:3000)

### Build:
```bash
npm run build
```

### Deploy

First, copy example.env to .env file and set your WALLET_CONNECT_PROJECT_ID env.
You can configure your projectId on [https://cloud.walletconnect.com/sign-in](https://cloud.walletconnect.com/sign-in)

You can currently deploy it to Github Pages:
```bash
npm run deploy
```
