import { Space,Upload,message, Row,Col, Button} from "antd";
import React,{useEffect, useState} from "react";
import Router from 'next/router'
import Link from 'next/link'
// import style manually
import styles from "../index.module.css";
import localStyles from "./index.module.css";
import axios from "axios";
import { baseUrl } from "../../../baseUrl";
import { getTierdData } from "../../../endpoints";
import { FormControlLabel,RadioGroup,FormControl,Radio,Checkbox,FormLabel,InputAdornment,FormGroup,FormHelperText,TextField,InputLabel,OutlinedInput} from "@mui/material";




const PrivacySettings = ({postData,setPostData}) =>{

    const [viewType,setViewType] = useState()

    const handleViewType = (val)=>{
        setViewType(val)
    }

    const [tiers,setTiers] = useState()

    const [selectedTier,setSelectedTier] = useState([])

    const handleTierChange = (val) =>{
        console.log(val)
        if(val.target.checked)
        setSelectedTier([...selectedTier,val.target.name])
        else{
            let temp = selectedTier
            let index = temp.indexOf(val.target.name)
            if(index>-1)
            temp.splice(index,1);
            setSelectedTier(temp)
        }
        console.log(selectedTier)
    }

    const [earlyAccess,setEarlyAccess] = useState(false)

    const handleAccessChange = () =>{
        setEarlyAccess(!earlyAccess)
    }

    const [teaserText,setTeaserText] = useState("")

    const handleTeaserText = (val) =>{
        setTeaserText(val)
    } 
    const [donationAmount,setDonationAmount] = useState(0)

    const handleDonationAmount = (val) =>{
        setDonationAmount(val)
    }
    
    //console.log(tiers)
    const getUserTiers = async() =>{

        try{

            let wallet_id = localStorage.getItem('wallet_id');
            let tiers = await axios.get(baseUrl+ getTierdData +wallet_id)

            if(tiers.data.success)
            {
                setTiers(tiers.data.tiers)
            }
            

        }catch(err){
            console.log("Componenets : PrivacySettings : getTiers() "+err)
        }
    }

    console.log(tiers)
    useEffect(()=>getUserTiers(),[])

    useEffect(()=>{
        
        setPostData({
            ...postData,
            viewType,
            selectedTier,
            earlyAccess,
            teaserText,
            price : donationAmount
        })

    },[viewType,selectedTier,earlyAccess,teaserText])

    return(
        <>
        <div className={styles.post_panel_box} style={{marginTop:`1em`,padding:`1.5em`}}>
          <div className={styles.post_panel_box_heading} style={{justifyContent:`flex-start`,padding:`1em 0em`,flexDirection:`column`}}>
          HOW MUCH FOR THIS POST        
         <br/>
         
         <div className={styles.user_inbox_message} style={{paddingBottom:`1em`}}>

         <FormControl fullWidth sx={{ m: 1 }} style={{marginLeft:`-2px`}}>
                  <InputLabel htmlFor="outlined-adornment-amount">Price</InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-amount"
                    value={donationAmount}
                    onChange={(e)=>handleDonationAmount(e.target.value)}
                    startAdornment={<InputAdornment position="start">ETH</InputAdornment>}
                    label=""
                  />
        </FormControl>

        <div className={styles.user_inbox_message} style={{paddingBottom:`1em`}}>
            This amount of ether user have to pay to see your content
         <br/>
         </div>

        <div>

        </div>
        
         </div>

        </div>  
         {/* <div className={styles.user_inbox_message} style={{paddingBottom:`1em`}}>
             
         <FormControl component="fieldset">    
         <RadioGroup
           aria-label="gender"
           defaultValue="Patrons Only"
           name="radio-buttons-group"
           value={viewType}
           onChange={(e)=>handleViewType(e.target.value)}
         >
           <FormControlLabel value="Public" control={<Radio />} label="Public" />
           <FormControlLabel value="Patrons Only" control={<Radio />} label="Patrons Only" />
           <FormControlLabel value="Select Tier" control={<Radio />} label="Select Tier" />
         </RadioGroup>
         </FormControl> 
         </div> */}

        {/* {
            viewType=="Select Tier"?
            (
                <div className={styles.post_panel_box_heading} style={{justifyContent:`flex-start`,padding:`0em`,flexDirection:`column`}}>    
                <div className={styles.user_inbox_message} >
                 <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
                <FormLabel component="legend" style={{color:`black`}}>Select which tiers have access</FormLabel>
                <FormGroup>
                    {      
                        tiers?.map(tier=>(
                            <>
                            <FormControlLabel
                              control={
                                <Checkbox checked={selectedTier.indexOf(tier.name)>-1} onChange={(e)=>handleTierChange(e)} name={tier.name} />
                              }
                              label={tier.name}
                              
                            /><FormHelperText>${tier.price} per month - {tier.members} members</FormHelperText>
                            </>
                        ))
                    }
                 </FormGroup>
                 </FormControl>
                 </div>  
                 </div>
                
            ):
            <>
            </>
        } */}
        <>
        {
            viewType!=="Public"?
            (
                <>
                {/* <div className={styles.post_panel_box_heading} style={{justifyContent:`flex-start`,padding:`1em 0em`,flexDirection:`column`}}>
        EARLY ACCESS
         
         <br/>
         <div className={styles.user_inbox_message} style={{paddingBottom:`1em`}}>

         <FormControlLabel
          control={<Checkbox checked={earlyAccess} onChange={(e)=>handleAccessChange(e)} name="early-access"/>}
          label="Offer patrons early access to content before the rest of the world."
          labelPlacement="start"
        />
        
         </div>

        </div>  */}
       

        <div className={styles.post_panel_box_heading} style={{justifyContent:`flex-start`,padding:`1em 0em`,flexDirection:`column`}}>
        TEASER TEXT
         
         <br/>
         <div className={styles.user_inbox_message} style={{paddingBottom:`1em`}}>
         Teaser text will display publicly to fans and patrons who do not have access to this post.
         <br/>
         <br/>
         <TextField
          id="outlined-multiline-flexible"
          label="Teaser Text"
          multiline
          fullWidth
          rows={4}
          value={teaserText}
          onChange={(e)=>handleTeaserText(e.target.value)}
         
        />
        
         </div>

        </div> 
        </>
            ):
            <>
            </>
        
     }
     </>
       </div>
        
        </>
    )
}

export default PrivacySettings