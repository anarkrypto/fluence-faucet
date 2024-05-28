import { BrowserProvider } from "ethers";
import { SiweMessage } from "siwe";

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

const scheme = window.location.protocol.slice(0, -1);
const domain = window.location.host;
const origin = window.location.origin;
const provider = new BrowserProvider(window.ethereum);

// Set DOM Elements and Event Listeners

const connectWalletBtn = document.getElementById("connectWalletBtn");
const siweBtn = document.getElementById("siweBtn");
const addressButton = document.getElementById("address-button");
const popoverAddress = document.getElementById("address-popover");
const switchChainButton = document.getElementById("switch-chain");
const connectedChainButton = document.getElementById("connected-chain");
const importTokenButton = document.getElementById("import-tusd");

if (!connectWalletBtn || !siweBtn || !addressButton || !popoverAddress || !switchChainButton || !connectedChainButton || !importTokenButton) {
	throw new Error("DOM elements not found");
}

connectWalletBtn.onclick = connectWallet;
siweBtn.onclick = signInWithEthereum;
switchChainButton.onclick = switchChain;
importTokenButton.onclick = importToken;

// Wallet Utils

function createSiweMessage(address, statement) {
	const message = new SiweMessage({
		scheme,
		domain,
		address,
		statement,
		uri: origin,
		version: "1",
		chainId: "1"
	});
	return message.prepareMessage();
}

async function connectWallet() {
	try {
		const signer = await provider.getSigner();
		if (signer.address) {
			updateAddress(signer.address);
		}
	} catch {
		alert("user rejected request");
	}
}

async function signInWithEthereum() {
	try {
		const signer = await provider.getSigner();
		const message = createSiweMessage(
			signer.address,
			"Sign in with Ethereum to the app."
		);
		console.log(await signer.signMessage(message));
	} catch (error) {
		if (error instanceof Error && error.reason === "rejected") {
			alert("User rejected request");
		} else {
			alert("An error occurred, check the console for more details.");
			console.error(error);
		}
	}
}

async function switchChain() {
	try {
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
		updateOnConnected(true);
	} catch (error) {
		console.error(error);
		alert("An error occurred, check the console for more details.");
	}
}

async function importToken() {
	try {
		await provider.send("wallet_watchAsset", {
			type: "ERC20",
			options: {
				address: TUSD_CONTRACT_ADDRESS,
				decimals: TUSD_DECIMALS,
				symbol: TUSD_TICKER,
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

// UI Utils

function updateAddress(address) {
	addressButton.setAttribute("data-active", "true");
	addressButton.querySelector("span.address").innerText =
		truncateAddress(address);
	connectWalletBtn.setAttribute("data-active", "false");
	popoverAddress.querySelector("span.address").innerText =
		truncateAddress(address);
	siweBtn.removeAttribute("disabled");
}

function updateOnConnected() {
	switchChainButton.setAttribute("data-active", "false");
	connectedChainButton.setAttribute("data-active", "true");
}

function updateOnDisconnected() {
	switchChainButton.setAttribute("data-active", "true");
	connectedChainButton.setAttribute("data-active", "false");
}

function truncateAddress(address) {
	return address.slice(0, 7) + "..." + address.slice(-5);
}

// Triggered on page load

async function onLoad() {
	try {
		const network = await provider.getNetwork();
		const isConnected = toHex(network.chainId) === toHex(CHAIN_ID);
		if (isConnected) {
			updateOnConnected();
		} else {
			updateOnDisconnected();
		}
	} catch (error) {
		console.error(error);
		alert("An error occurred, check the console for more details.");
	}
}

onLoad();