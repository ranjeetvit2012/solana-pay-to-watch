import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { PublicKey, Transaction } from '@solana/web3.js';
import { createMint, getOrCreateAssociatedTokenAccount, mintTo, TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { useCallback } from 'react';
import { toast } from 'react-hot-toast';

const MintToken = () => {
  const { connection } = useConnection();
  const { publicKey, signTransaction, sendTransaction } = useWallet();

  const onCreateMintToken = useCallback(async () => {
    if (!publicKey || !signTransaction) {
      toast.error("Wallet not connected");
      return;
    }

    const toastId = toast.loading("Creating mint...");

    try {
      // 1. Create new mint token
      const mint = await createMint(
        connection,           // Connection to Solana cluster
        publicKey,            // Payer of the transaction (you)
        publicKey,            // Mint authority (you can mint more tokens)
        publicKey,            // Freeze authority (you can freeze token transfers if needed)
        9                     // Decimals for the token (for example, 9 for SOL-like precision)
      );

      toast.success(`Mint created successfully: ${mint.toBase58()}`, { id: toastId });

      // 2. Create an associated token account for the wallet (if it doesn't exist)
      const tokenAccount = await getOrCreateAssociatedTokenAccount(
        connection,
        publicKey,  // Payer of the transaction
        mint,       // The mint address
        publicKey   // Owner of the token account (you)
      );

      // 3. Mint tokens to your associated token account
      const amount = 100 * 10 ** 9; // Amount to mint, adjusted for decimals (100 tokens here)
      const mintTransaction = new Transaction().add(
        mintTo(
          publicKey,          // Payer of the transaction
          mint,               // Mint address
          tokenAccount.address, // Your token account address
          publicKey,          // Mint authority (you)
          [],                 // Any additional signers (none in this case)
          amount              // Amount of tokens to mint
        )
      );

      // 4. Sign and send the mint transaction
      const signedTransaction = await signTransaction(mintTransaction);
      const signature = await sendTransaction(signedTransaction, connection);
      await connection.confirmTransaction(signature);

      toast.success("Tokens minted successfully!");
    } catch (error) {
      toast.error(`Minting failed: ${error.message}`, { id: toastId });
    }
  }, [publicKey, connection, signTransaction, sendTransaction]);

  return (
    <div>
      <button onClick={onCreateMintToken}>Create and Mint Token</button>
    </div>
  );
};

export default MintToken;
