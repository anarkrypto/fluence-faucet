import { generateNonce } from "siwe";
import { createSIWEConfig, formatMessage } from "@web3modal/siwe";
import { createWeb3Modal, defaultConfig } from "@web3modal/ethers";
import { ethers, BrowserProvider } from "ethers";

// Constants

const CHAIN_ID = 2358716091832359;
const CHAIN_NAME = "Fluence dar Network";
const NATIVE_TICKER = "FLT";
const RPC_URL = "https://ipc.dar.fluence.dev";
const BLOCK_EXPLORER_URL = "https://blockscout.dar.fluence.dev";
const DECIMALS = 18;
const TUSD_TICKER = "tUSD";
const TUSD_CONTRACT_ADDRESS = "0x266EA7F56DCaD2F5FD9B480724839542Bcc0c305";
const TUSD_DECIMALS = 6;
const SIGN_MESSAGE_STATEMENT = "Fluence Faucet - Sign with your account";

const HOST = window.location.host;
const ORIGIN = window.location.origin;

// Session Utils

async function loadSession() {
	const { address, message, signature } = JSON.parse(
		localStorage.getItem("session")
	);
	if (!address || !message || !signature) {
		throw new Error("Failed to get session");
	}
	return {address, message, signature};
}

function setSession({ address, message, signature }) {
	const data = JSON.stringify({ address, message, signature });
	localStorage.setItem("session", data);
	updateAddress(address);
}

function removeSession() {
	localStorage.removeItem("session");
}

// Wallet Connect

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

const siweConfig = createSIWEConfig({
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

const ethersConfig = defaultConfig({
	metadata
});

const modal = createWeb3Modal({
	projectId,
	chains,
	ethersConfig,
	siweConfig
});

async function onStateChange(state) {
	const isConnected = state.selectedNetworkId === CHAIN_ID;
	if (isConnected) {
		updateOnConnected();
	} else {
		updateOnDisconnected();
	}
}

modal.subscribeState(onStateChange);

// Set DOM Elements and Event Listeners

const claimButton = document.getElementById("claim-btn");
const addressButton = document.getElementById("address-btn");
const importTokenButton = document.getElementById("import-tusd-btn");
const switchChainButton = document.getElementById("switch-chain-btn");
const connectedChainDiv = document.getElementById("connected-chain-div");
const connectWalletButton = document.getElementById("connect-wallet-btn");

if (
	!claimButton ||
	!addressButton ||
	!importTokenButton ||
	!switchChainButton ||
	!connectedChainDiv ||
	!connectWalletButton
) {
	throw new Error("DOM elements not found");
}

connectWalletButton.onclick = connectWallet;
claimButton.onclick = claim;
addressButton.onclick = handleOpenModal;
switchChainButton.onclick = switchChain;
importTokenButton.onclick = importToken;

async function handleOpenModal() {
	modal.open();
}

async function connectWallet() {
	try {
		modal.open();
	} catch (error) {
		alert(error.message);
	}
}

async function claim() {
	try {
		const session = loadSession();

		setReceiveLoading(true);

		// TODO: Implement receive backend

		await new Promise((resolve) => setTimeout(resolve, 2000));

		setReceiveLoading(false);
	} catch (error) {
		alert(error.message);
	} finally {
		setReceiveLoading(false);
	}
}

async function switchChain() {
	try {
		const provider = await modal.getWalletProvider();
		await provider.send("wallet_addEthereumChain", [
			{
				chainId: toHex(CHAIN_ID),
				chainName: CHAIN_NAME,
				nativeCurrency: {
					name: NATIVE_TICKER,
					symbol: NATIVE_TICKER,
					decimals: DECIMALS
				},
				rpcUrls: [RPC_URL],
				blockExplorerUrls: [BLOCK_EXPLORER_URL]
			}
		]);
		updateOnConnected();
	} catch (error) {
		console.error(error);
		alert("An error occurred, check the console for more details.");
	}
}

async function importToken() {
	try {
		const provider = new BrowserProvider(window.ethereum);
		await provider.send("wallet_watchAsset", {
			type: "ERC20",
			options: {
				address: TUSD_CONTRACT_ADDRESS,
				decimals: TUSD_DECIMALS,
				symbol: TUSD_TICKER
			}
		});
	} catch (error) {
		console.error(error);
		alert("An error occurred, check the console for more details.");
	}
}

// Utils

function toHex(value) {
	return "0x" + value.toString(16);
}

function truncateAddress(address) {
	return address.slice(0, 7) + "..." + address.slice(-5);
}

// UI Utils

function updateAddress(address) {
	addressButton.setAttribute("data-active", "true");
	addressButton.querySelector("span.address").innerText =
		truncateAddress(address);
	connectWalletButton.setAttribute("data-active", "false");
	claimButton.setAttribute("data-active", "true");
}

function resetAddress() {
	addressButton.setAttribute("data-active", "false");
	addressButton.querySelector("span.address").innerText = "";
	connectWalletButton.setAttribute("data-active", "true");
	claimButton.setAttribute("data-active", "false");
}

function updateOnConnected() {
	switchChainButton.setAttribute("data-active", "false");
	connectedChainDiv.setAttribute("data-active", "true");
}

function updateOnDisconnected() {
	switchChainButton.setAttribute("data-active", "true");
	connectedChainDiv.setAttribute("data-active", "false");
}

function setReceiveLoading(loading) {
	claimButton.setAttribute("data-loading", (loading).toString());
	claimButton.disabled = loading;
}