import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import axios from "axios";
import { baseUrl } from "../../baseUrl";

// import { useDispatch } from "react-redux";
// import abi from './utils/waveportal.json';


  
  const contractAddress='0xF1dE2cE798842c800d5d10e2A311aB355B139Caf';
  //const contractABI = abi.abi;

//   export const saveUserDataInRedux = (wallet_id) =>{

//     // const dispatch = useDispatch();

//     try{

//         let user = axios.get(baseUrl+ getUserData + wallet_id)

//         console.log(user.data.user)
//         if(user.data.success)
//         // dispatch({
//         //     type: 'SET_CURRENT_USER',                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     
//         //     payload: user.data.user,
//         //   })

//     }catch(err){
//         console.log("Utils : Login "+err)
//     }
//   }
  
  export const checkIfWalletIsConnected = async (setCurrentAccount) => {
    try {
      const { ethereum } = window;
      
      if (!ethereum) {
        console.log("Make sure you have metamask!");
        return;
      } else {
        console.log("We have the ethereum object", ethereum);
      }

      const accounts = await ethereum.request({ method: 'eth_accounts' });

      if (accounts.length !== 0) {
        const account = accounts[0];
        console.log("Found an authorized account:", account);
        setCurrentAccount(account);
        localStorage.setItem('wallet_id',account)
      } else {
        localStorage.removeItem('wallet_id')
        console.log("No authorized account found")
      }
    } catch (error) {
      console.log(error);
    }
  }

  /**
  * Implement your connectWallet method here
  */
  export const connectWallet = async (setCurrentAccount) => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("Get MetaMask!");
        return;
      }

      const accounts = await ethereum.request({ method: "eth_requestAccounts" });

      console.log("Connected", accounts[0]);
      setCurrentAccount(accounts[0]); 
      localStorage.setItem('wallet_id',accounts[0])
    } catch (error) {
      console.log(error)
    }
  }

// const wave = async () => {
//     try {
//       const { ethereum } = window;

//       if (ethereum) {
//         const provider = new ethers.providers.Web3Provider(ethereum);
//         const signer = provider.getSigner();
//         const wavePortalContract = new ethers.Contract(contractAddress, contractABI, signer);

//         let count = await wavePortalContract.get_total_waves();
//         console.log("Retrieved total wave count...", count);
//       let message = document.getElementById("message").value
//       console.log("sending message",message)
//          const waveTxn = await wavePortalContract.wave(message);
//         console.log("Mining...", waveTxn.hash);

//         await waveTxn.wait();
//         console.log("Mined -- ", waveTxn.hash);

//         count = await wavePortalContract.get_total_waves();
//         console.log("Retrieved total wave count...", count);
      
      
      
//       } else {
//         console.log("Ethereum object doesn't exist!");
//       }
//     } catch (error) {
//       console.log(error)
//     }
// }

  
//   const getAllWaves = async () => {
//     try {
//       const { ethereum } = window;
//       if (ethereum) {
//         const provider = new ethers.providers.Web3Provider(ethereum);
//         const signer = provider.getSigner();
//         const wavePortalContract = new ethers.Contract(contractAddress, contractABI, signer);

//         /*
//          * Call the getAllWaves method from your Smart Contract
//          */
//         const waves = await wavePortalContract.getAllWaves();
        

//         /*
//          * We only need address, timestamp, and message in our UI so let's
//          * pick those out
//          */
//         let wavesCleaned = [];
//         waves.forEach(wave => {
//           wavesCleaned.push({
//             address: wave.waver,
//             timestamp: new Date(wave.timestamp * 1000),
//             message: wave.message
//           });
//         });

//         /*
//          * Store our data in React State
//          */
//         setAllWaves(wavesCleaned);
//         console.log(wavesCleaned)
//       } else {
//         console.log("Ethereum object doesn't exist!")
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   }


