import {
    paymentAddress
  } from './config'

import Payments from '../../artifacts/contracts/Payments.sol/Payments.json'

import { ethers } from 'ethers'
import Web3Modal from "web3modal"



export const createPlan = async (planAmount,planFrequency) => {
    // const infuraId = "609f9d9efb844b349a353b2d85e5c878";

    // const provider = new ethers.providers.JsonRpcProvider(`https://polygon-mumbai.infura.io/v3/${infuraId}`)
    // console.log(provider)
    const web3Modal = new Web3Modal()
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner()

    const paymentsContract = new ethers.Contract(paymentAddress, Payments.abi, signer)
    console.log(paymentsContract)
    let polygonAddress = "0x2d7882beDcbfDDce29Ba99965dd3cdF7fcB10A1e"
    console.log("Create a plan")
    const transaction = await paymentsContract.createPlan(polygonAddress, planAmount, planFrequency,)
    // await transaction.wait()
    console.log("Plan created", transaction.hash)


    paymentsContract
      .on('PlanCreated', async function (merchant,
        planId,
        date, event) {
        console.log("Count was incremented by address: " + merchant,
          planId.toNumber(),
          date.toNumber());
        // Do something here
      })
      .on('error', console.error);

    // let planListener = paymentsContract.PlanCreated();

    // planListener.watch(function (err, result) {
    //   console.log("listenfing to plan creation")
    //   if (err) {
    //     return error(err);
    //   }

    //   console.log("Count was incremented by address: " + result.args.merchant, result.args.planId, result.args.date);

    // });


  }