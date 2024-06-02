import {
	addressAvatarImg,
	addressButton,
	connectWalletButton,
	claimButton,
    claimedSuccessDiv,
    claimCountdownSpan
} from "./dom.js";

export function truncateAddress(address) {
	return address.slice(0, 7) + "..." + address.slice(-5);
}

export function updateAddress(address) {
	addressAvatarImg.setAttribute("alt", address);
	addressAvatarImg.setAttribute("address", address);
	addressButton.setAttribute("data-active", "true");
	addressButton.querySelector("span.address").innerText =
		truncateAddress(address);
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
	resetClaimedSuccess();
}

export function setReceiveLoading(loading) {
	claimButton.setAttribute("data-loading", loading.toString());
	claimButton.disabled = loading;
}

export function setClaimedSuccess(resetAt) {
	claimedSuccessDiv.setAttribute("data-active", "true");
	claimButton.setAttribute("data-active", "false");
    startClaimCountdown(resetAt);
}

export function resetClaimedSuccess() {
	claimedSuccessDiv.setAttribute("data-active", "false");
	claimButton.setAttribute("data-active", "false");
}

function updateClaimCountdown(remainingSeconds) {
    const hours = Math.floor(remainingSeconds / 3600);
    const minutes = Math.floor((remainingSeconds % 3600) / 60);
    const seconds = remainingSeconds % 60;
    claimCountdownSpan.innerText = `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function startClaimCountdown(resetAt) {
    let remainingSeconds = Math.floor((new Date(resetAt) - new Date()) / 1000);
    updateClaimCountdown(remainingSeconds);
    const timer = setInterval(() => {
        remainingSeconds -= 1;
        if (remainingSeconds <= 0) {
            clearInterval(timer);
            claimCountdownSpan.innerText = "0:00:00";
            return;
        }
        updateClaimCountdown(remainingSeconds);
    }, 1000);
}