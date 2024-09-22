
import React, { useRef, useState } from 'react';
import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import {
  WalletModalProvider,
  WalletDisconnectButton,
  WalletMultiButton
} from '@solana/wallet-adapter-react-ui';
import { Button, Checkbox, Label, Modal, TextInput } from "flowbite-react";
import {
  Connection,
  Keypair,
  SystemProgram,
  LAMPORTS_PER_SOL,
  Transaction,
  sendAndConfirmTransaction,
  PublicKey
} from "@solana/web3.js";
function VideoPlayer({ mp4Source, oggSource }) {
  const videoRef = useRef(null);
  const [isPlayable, setIsPlayable] = useState(false);
  const [playButton,SetplayButton] = useState(false)
  const [openModal, setOpenModal] = useState(false);
  const [toPublicKey, setToPublicKey] = useState('DASsSUmt5ZATP5ouAp5sj3Aj4qyvGusRUrKJiZbfXCDk');
 
  const wallet = useWallet();
  const { connection } = useConnection();

  const handleCanPlay = () => {
    console.log("handleCanPlay-------------")
    setIsPlayable(true);
  };

  const handleSendBalance =async ()=>{
    const bal = 1 * LAMPORTS_PER_SOL
    console.log("bal-------",bal,"toPublicKey",toPublicKey)
    const transaction = new Transaction();
    transaction.add(SystemProgram.transfer({
        fromPubkey: wallet.publicKey,
        toPubkey: new PublicKey(toPublicKey),
        lamports: bal,
    }));

    await wallet.sendTransaction(transaction, connection);
    setOpenModal(false);
    SetplayButton(true)
    alert("successfully sent SOL!");
}

  const playVideo = () => {
    // console.log("dddddddddddd")
    // videoRef.current.play();
    setIsPlayable(true)
  };
 

  function onCloseModal() {
    setOpenModal(false);
   
  }

  return (
    <div>
      {/* <video
        ref={videoRef}
        width="320"
        height="240"
        controls
        onCanPlay={handleCanPlay}
      > */}
       <video width="320" height="40" controls={isPlayable}>
        <source src={mp4Source} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      {playButton ?  <Button onClick={playVideo} >play Video</Button>
       :<Button onClick={() => setOpenModal(true)}>Pay 1 Sol</Button>}

       {/* MODE START */}

      <Modal show={openModal} size="lg" onClose={onCloseModal} popup>
        <Modal.Header />
        <Modal.Body>
          <div className='flex justify-around'>
          <WalletMultiButton />
          <WalletDisconnectButton />
          </div>
          <div className="space-y-6">
          
            <h3 className="text-xl font-medium text-gray-900
             dark:text-white">Pay 1 SOL</h3>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="public" value="Enter your public key" />
              </div>
              <TextInput
                id="public"
                placeholder="Enter your public key"
                value={wallet.publicKey}
               
                required
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="password" value="Your SOL" />
              </div>
              <TextInput id="password" type="number" value="1" required />
            </div>
            <div className="flex justify-between">
              <div className="flex items-center gap-2">
                {/* <Checkbox id="remember" />
                <Label htmlFor="remember">Remember me</Label> */}
              </div>
              {/* <a href="#" className="text-sm text-cyan-700 hover:underline dark:text-cyan-500">
                Lost Password?
              </a> */}
            </div>
            <br></br>
            <div className="w-full">
              <Button onClick={handleSendBalance}>Pay </Button>
            </div>
            <div className="flex justify-between text-sm font-medium text-gray-500 dark:text-gray-300">
              {/* Not registered?&nbsp; */}
              {/* <a href="#" className="text-cyan-700 hover:underline dark:text-cyan-500">
                Create account
              </a> */}
            </div>
          </div>
        </Modal.Body>
      </Modal>
     
    </div>
  );
}

export default VideoPlayer;




// function VideoPlayer({ mp4Source, oggSource }) {
//     return (
//       <div>
//         <video width="320" height="40" controls>
//           <source src={mp4Source} type="video/mp4" />
//           <source src={oggSource} type="video/ogg" />
//           Your browser does not support the video tag.
//         </video>
//       </div>
//     );
//   }
  
//   export default VideoPlayer;
  