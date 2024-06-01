import { updateAddress } from "./ui-utils";

export async function loadSession() {
    const { address, message, signature } = JSON.parse(localStorage.getItem("session"));
    if (!address || !message || !signature) {
        throw new Error("Failed to get session");
    }
    return { address, message, signature };
}

export function setSession({ address, message, signature }) {
    const data = JSON.stringify({ address, message, signature });
    localStorage.setItem("session", data);
    updateAddress(address);
}

export function removeSession() {
    localStorage.removeItem("session");
}
