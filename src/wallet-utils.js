import { modal } from './wallet-connect.js';
import { setReceiveLoading } from './ui-utils.js';
import { loadSession } from './session-utils.js';
import { BrowserProvider } from 'ethers';
import { TUSD_CONTRACT_ADDRESS, TUSD_DECIMALS, TUSD_TICKER } from './constants.js';
import { claimButton, claimedSuccessDiv } from './dom.js';

export async function openWalletModal() {
    modal.open();
}

export async function connectWallet() {
    try {
        modal.open();
    } catch (error) {
        alert(error.message);
    }
}

export async function claim() {
    try {
        const session = await loadSession();

        setReceiveLoading(true);

        // TODO: Implement receive backend

        await new Promise((resolve) => setTimeout(resolve, 1500));

        claimedSuccessDiv.setAttribute('data-active', 'true')
        claimButton.setAttribute('data-active', 'false');

        setReceiveLoading(false);
    } catch (error) {
        alert(error.message);
    } finally {
        setReceiveLoading(false);
    }
}

export async function importToken() {
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
