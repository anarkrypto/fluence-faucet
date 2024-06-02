import { modal } from './wallet-connect.js';
import { setClaimedSuccess, setReceiveLoading } from './ui-utils.js';
import { loadSession } from './session-utils.js';
import { BrowserProvider } from 'ethers';
import { TUSD_CONTRACT_ADDRESS, TUSD_DECIMALS, TUSD_TICKER } from './constants.js';

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

/*
 * This function is used to simulate a claim request.
 * TODO: Implement claim service API
 */
export async function claim() {
    try {
        const session = await loadSession();

        setReceiveLoading(true);

        await new Promise((resolve) => setTimeout(resolve, 1500));
    
        const day = 24 * 60 * 60 * 1000;
        const resetAt = Date.now() + day;

        setClaimedSuccess(resetAt)

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
