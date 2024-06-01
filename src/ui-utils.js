import { addressAvatarImg, addressButton, connectWalletButton, claimButton } from './dom.js';

export function truncateAddress(address) {
    return address.slice(0, 7) + "..." + address.slice(-5);
}

export function updateAddress(address) {
    addressAvatarImg.setAttribute("alt", address);
    addressAvatarImg.setAttribute("address", address);
    addressButton.setAttribute("data-active", "true");
    addressButton.querySelector("span.address").innerText = truncateAddress(address);
    connectWalletButton.setAttribute("data-active", "false");
    claimButton.setAttribute("data-active", "true");
}

export function resetAddress() {
    addressAvatarImg.setAttribute("alt", "");
    addressAvatarImg.setAttribute("address", "");
    addressButton.setAttribute("data-active", "false");
    addressButton.querySelector("span.address").innerText = "";
    connectWalletButton.setAttribute("data-active", "true");
    claimButton.setAttribute("data-active", "false");
}

export function setReceiveLoading(loading) {
    claimButton.setAttribute("data-loading", loading.toString());
    claimButton.disabled = loading;
}
