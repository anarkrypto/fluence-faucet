import { connectWallet, claim, openWalletModal, importToken } from './wallet-utils.js';

export const claimButton = document.getElementById("claim-btn");
export const addressButton = document.getElementById("address-btn");
export const importTokenButton = document.getElementById("import-tusd-btn");
export const addressAvatarImg = document.getElementById("address-avatar-img");
export const connectWalletButton = document.getElementById("connect-wallet-btn");

if (!claimButton || !addressButton || !importTokenButton || !addressAvatarImg || !connectWalletButton) {
    throw new Error("DOM elements not found");
}

connectWalletButton.onclick = connectWallet;
claimButton.onclick = claim;
addressButton.onclick = openWalletModal;
importTokenButton.onclick = importToken;
