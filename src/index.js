import { BrowserProvider } from 'ethers';
import { SiweMessage } from 'siwe';

// Constants

const scheme = window.location.protocol.slice(0, -1);
const domain = window.location.host;
const origin = window.location.origin;
const provider = new BrowserProvider(window.ethereum);



// Set DOM Elements and Event Listeners

const connectWalletBtn = document.getElementById('connectWalletBtn');
const siweBtn = document.getElementById('siweBtn');
const addressButton = document.getElementById('address-button');
const popoverAddress = document.getElementById('address-popover')

connectWalletBtn.onclick = connectWallet;
siweBtn.onclick = signInWithEthereum;



// Wallet Utils

function createSiweMessage(address, statement) {
  const message = new SiweMessage({
    scheme,
    domain,
    address,
    statement,
    uri: origin,
    version: '1',
    chainId: '1'
  });
  return message.prepareMessage();
}

async function connectWallet() {
  try {
    const signer = await provider.getSigner();
    if (signer.address) {
      updateAddress(signer.address)
    }
  } catch {
    alert('user rejected request')
  }
}

async function signInWithEthereum() {
  try {
    const signer = await provider.getSigner();
    const message = createSiweMessage(
      signer.address,
      'Sign in with Ethereum to the app.'
    );
    console.log(await signer.signMessage(message));
  } catch (error) {
    if (error instanceof Error && error.reason === 'rejected') {
      alert("User rejected request")
    } else {
      alert("An error occurred, check the console for more details.")
      console.error(error);
    }
  }
}



// UI Utils

function updateAddress (address) {
  addressButton.setAttribute('data-active', true);
  addressButton.querySelector("span.address").innerText = truncateAddress(address);
  connectWalletBtn.setAttribute('data-active', false);
  popoverAddress.querySelector('span.address').innerText = truncateAddress(address);
  siweBtn.removeAttribute('disabled');
}

function truncateAddress(address) {
  return address.slice(0, 7) + '...' + address.slice(-5);
}