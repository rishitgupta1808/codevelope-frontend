import React,{useEffect, useState} from "react";
import {Comment, Tooltip, List, Space,Upload,message as antMessage, Row,Col, Button,Collapse} from "antd";
import moment from 'moment';
import router, { Router, useRouter } from 'next/router'
import Link from 'next/link'
import web3 from "web3";
import { TextField ,InputAdornment,FormControl,OutlinedInput,InputLabel} from "@mui/material";
// import style manually

const { Panel } = Collapse;
import localStyles from "./index.module.css";
import tierStyles from "../../ProfileDetails/index.module.css";
import axios from "axios";
import { baseUrl } from "../../../baseUrl";


import { ethers } from 'ethers'
import Web3Modal from "web3modal"
import { deploymentAddress } from "../../../utils/contractsFunctions/config";

import Donate from '../../../artifacts/contracts/donate.sol/donate.json'

const key = 'updatable';
const data = [
  ];

const DonateToken = ({}) =>{

    const router = useRouter();

    const [donationAmount,setDonationAmount] = useState(0)

    const handleDonationAmount = (val) =>{
        setDonationAmount(val)
    }
    
    const [message,setMessage] = useState("")

    const handleMessage = (val) =>{
        setMessage(val)
    }

     console.log(router.query)

     const {userId} = router.query
    
    useEffect(async()=>{
        console.log(userId)

        if(!userId)
        return;

        // const fetchUserDetails = async() =>{
        //     try{
        //         let user = await axios.get(baseUrl+ getUserData +userId)
        //         let tier = await axios.get(baseUrl + getTierdData + userId)
        //         let posts = await axios.get(baseUrl+getPostByWalletId+userId)
        
    
        //         if(user.data.success){
        //         setUser(user.data.user)
        //         setTier(tier.data.tiers)
        //         setPosts(posts.data.allPosts)
        //         console.log(user.data.user)
        //         }

        //        // console.log("plans", donate)

        //        //setPlans(plans)
        //     //   plans.map(plan => {
        //     //     console.log("amount", plan.amount.toNumber())
        //     //     console.log("merchant", plan.merchant)
        //     //     console.log("frequency", plan.frequency.toNumber())
        //     //   })
    
        //     }catch(err){
        //         console.log("Component : userVisit : useEffet "+err)
        //     }
        // } 

      //  fetchUserDetails();

        

        
    },[userId])

    const donateToken = async() =>{

      antMessage.loading({ content: 'Sending Token....', key });
        const web3Modal = new Web3Modal()
        const connection = await web3Modal.connect()
        const provider = new ethers.providers.Web3Provider(connection)
        const signer = provider.getSigner()
        const donateContract = new ethers.Contract(deploymentAddress, Donate.abi, signer)
  
        let reciever = userId
        const donate = await donateContract.sendDonatedAmount(reciever,message,{ 
            value: web3.utils.toWei(`${donationAmount}`,'ether')
          })

        console.log(donate)
        setDonationList(donate)
        antMessage.success({ content: 'Token is sended To Creator', key, duration: 2 });
       // fetchDonationList()
    }

    const dateString = (date)=>{
        const tierDate = new Date(date);

        return tierDate.toDateString();
    } 

    const [donationList,setDonationList] = useState([])

    const fetchDonationList = async () => {
      const web3Modal = new Web3Modal()
      const connection = await web3Modal.connect()
      const provider = new ethers.providers.Web3Provider(connection)
      const signer = provider.getSigner()
      // const provider = new ethers.providers.JsonRpcProvider(`https://polygon-mumbai.infura.io/v3/609f9d9efb844b349a353b2d85e5c878`)
      // const signer = provider.getSigner()
      const donateContract = new ethers.Contract('0x5FbDB2315678afecb367f032d93F642f64180aa3', Donate.abi, signer)
      const donate = await donateContract.fetchAllDonations()

      console.log("donations",donate)
      setDonationList(donate)
    }
    
    useEffect(async()=>{
       fetchDonationList();
    },[])

    useEffect(()=>{
      if(!donationList[0])
      return;

      donationList.map((donate)=>{
        data.push({
          content: (
            <>
            <div style={{fontSize:`16px`,fontWeight:`700`}}>
                {web3.utils.fromWei(`${donate.amount}`,'ether')} ETHER
            </div>
            <p>
             {donate.message}
            </p>
            </>
          ),
          datetime: (
            <Tooltip title={moment().subtract(2, 'days').format('YYYY-MM-DD HH:mm:ss')}>
              <span>{moment().subtract(2, 'days').fromNow()}</span>
            </Tooltip>
          ),
        })
      })
    },[donationList])

    return(
        <>
        {userId && donationList[0] &&
         <div>
           <Row gutter={[16,16]}>
             <Col span={16}>
             <div className={tierStyles.panel_box} >
             <List
                     className="comment-list"
                     header={`${data.length} Donations`}
                     itemLayout="horizontal"
                     dataSource={data}
                     renderItem={item => (
                       <li>
                         <Comment
                           actions={item.actions}
                           author={item.author}
                           avatar={item.avatar}
                           content={item.content}
                           datetime={item.datetime}
                         />
                       </li>
                     )}
                   />
               </div>
              </Col>
              <Col span={8}>
                
                <div className={tierStyles.panel_box} style={{margin: `0 auto`,width: `100%`}} >
                <FormControl fullWidth sx={{ m: 1 }} style={{marginLeft:`-2px`}}>
                  <InputLabel htmlFor="outlined-adornment-amount">Donation Amount</InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-amount"
                    value={donationAmount}
                    onChange={(e)=>handleDonationAmount(e.target.value)}
                    startAdornment={<InputAdornment position="start">ETH</InputAdornment>}
                    label="Amount"
                  />
                </FormControl>
               
                <TextField
                  id="outlined-multiline-static"
                  label="Message"
                  multiline
                  rows={4}
                  fullWidth
                  value={message}
                  onChange={(e)=>handleMessage(e.target.value)}
                />
                
                <Button type="primary" shape="round" size="large"  style={{marginTop:`2em`}} onClick={donateToken}>Send Token</Button>
                
                </div>
                
                {/* <div style={{marginTop:`2em`,fontSize:`32px`}}>
                <Collapse  ghost>
                  <Panel header="Donation List" key="1" >
                  <List
                     className="comment-list"
                     header={`${data.length} replies`}
                     itemLayout="horizontal"
                     dataSource={data}
                     renderItem={item => (
                       <li>
                         <Comment
                           actions={item.actions}
                           author={item.author}
                           avatar={item.avatar}
                           content={item.content}
                           datetime={item.datetime}
                         />
                       </li>
                     )}
                   />
                  </Panel>
                </Collapse>
                </div> */}
                
           
            
        </Col>
        </Row>
         </div>
        }
       
       </>
    )
}

export default DonateToken