import { generateNonce } from "siwe";
import { createSIWEConfig, formatMessage } from "@web3modal/siwe";
import { createWeb3Modal, defaultConfig } from "@web3modal/ethers";
import { ethers } from "ethers";
import { ORIGIN, HOST, BLOCK_EXPLORER_URL, CHAIN_ID, CHAIN_NAME, NATIVE_TICKER, RPC_URL, SIGN_MESSAGE_STATEMENT } from './constants.js';
import { loadSession, setSession, removeSession } from './session-utils.js';
import { updateAddress, resetAddress } from './ui-utils.js';

async function getMessageParams() {
    return {
        domain: HOST,
        uri: ORIGIN,
        chains: [CHAIN_ID],
        statement: SIGN_MESSAGE_STATEMENT
    };
}

async function getSession() {
    const { address } = await loadSession();
    const chainId = CHAIN_ID;
    onSignIn({ address, chainId });
    return { address, chainId };
}

async function verifyMessage({ message, signature }) {
    try {
        const address = await ethers.verifyMessage(message, signature);
        setSession({ address, message, signature });
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}

async function signOut() {
    removeSession();
}

async function onSignIn(data) {
    updateAddress(data.address);
}

async function onSignOut() {
    resetAddress();
}

export const siweConfig = createSIWEConfig({
    getMessageParams,
    createMessage: ({ address, ...args }) => formatMessage(args, address),
    getNonce: async () => generateNonce(),
    getSession,
    verifyMessage,
    signOut,
    onSignIn,
    onSignOut
});

const projectId = process.env.WALLET_CONNECT_PROJECT_ID || "WALLET_CONNECT_TEST_PROJECT_ID";
const chains = [
    {
        chainId: CHAIN_ID,
        name: CHAIN_NAME,
        currency: NATIVE_TICKER,
        rpcUrl: RPC_URL,
        explorerUrl: BLOCK_EXPLORER_URL
    }
];
const metadata = {
    name: "fluence-faucet",
    description: "Connect to receive FLT & tUSDC for testnet",
    url: ORIGIN,
    icons: [`${ORIGIN}/icon.png`]
};

export const ethersConfig = defaultConfig({
    metadata
});

export const modal = createWeb3Modal({
    projectId,
    chains,
    ethersConfig,
    siweConfig,
    themeVariables: {
        "--w3m-accent": "#E41C5C",
    }
});
