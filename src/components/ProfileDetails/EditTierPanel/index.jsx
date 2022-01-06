import { Space,Upload,message,Select,Option,Button} from "antd";
import React,{useState,useEffect} from "react";
import Router,{withRouter} from 'next/router'
import { LoadingOutlined, PlusOutlined,InboxOutlined, CodeSandboxCircleFilled } from '@ant-design/icons';
import { Link as AnchorLink,TextField,RadioGroup,FormControl,Radio,InputAdornment,InputLabel,OutlinedInput } from "@mui/material";
import {  } from "@mui/icons-material";
import styles from "../index.module.css";
import { benefites } from "../../../JsonData/TierBenefites";


const children = [];
for (let i = 0; i < benefites.length; i++) {
  children.push(<Option key={benefites[i]}>{benefites[i]}</Option>);
}

const EditTierPanel = ({
  router,
  tiers,
  setTiers,
  editMode,
  setEditMode,
  sendTier
}) =>{

    const [tierTitle,setTierTitle] = useState("")
    const [tierTitleError,setTierTitleError] = useState(false)

    const [tier,setTier] = useState() 

    const handleTierTitle = (val) =>{
        setTierTitle(val)
        if(!val.length)
        setTierTitleError(true)
        else
        setTierTitleError(false)
    }

    const [tierPrice,setTierPrice] = useState("")
    const [tierPriceError,setTierPriceError] = useState(false)

    const handleTierPrice = (val) =>{
        setTierPrice(val)
        //console.log(val)
        if(!val.length)
        setTierPriceError(true)
        else
        setTierPriceError(false)
    }

    const [tierDescription,setTierDescription] = useState("")

    const handleTierDescription = (val) =>{
        setTierDescription(val)
    }

    const [tierBenefit,setTierBenefit] = useState()

    const handleBenefitChange = (val) =>{
        console.log(val)
        setTierBenefit(val)
    }

    const saveChanges = () =>{
      let temp_tiers = tiers
      if(sendTier){
      temp_tiers.forEach((tier,i)=>{
        console.log(tier.id,sendTier.id)
        if(tier.id===sendTier.id){
        tier = {
          id:sendTier.id,
          name:tierTitle,
          price:tierPrice,
          benefites:tierBenefit,
          description:tierDescription
        }
        temp_tiers[i] = tier
        }
        })
      }else{
        temp_tiers.push({
          id:Date.now(),
          name:tierTitle,
          price:tierPrice,
          benefites:tierBenefit,
          description:tierDescription
        })
      }
        console.log(temp_tiers)
        setTiers(temp_tiers)
    }

    useEffect(()=>{
      console.log("fjygjgjk")
      console.log(sendTier)
      if(sendTier){
      let tierData = sendTier
      
     // console.log(tierData)
     console.log(tierData.benefites)
      setTierBenefit(tierData.benefites)
      setTierTitle(tierData.name)
      setTierPrice(tierData.price)   
      }else{
        setTierBenefit(["Behind-the-scenes content",
        "Livestreams",
        "Patron-only voting power",
        "Early access to content",
        "Patron-only posts and messages",
        "Full library access"])
      }
      console.log(children)
    },[])

    useEffect(()=>{
      console.log("vfdgvdbtbrt",tierBenefit)
    },[tierBenefit])

    return(
        <>
        <div className={styles.panel_container}>
        <Space align="center" size="small" direction="vertical">
        <div className={styles.panel_heading}>
        Tiers     
        </div>
        <p className={styles.panel_heading} style={{color: `#76736C`,fontSize: `16px`,fontWeight: `400`}}>
        Choose what to offer your patrons
        </p>
        </Space>
                <div className={styles.panel_box}>
                  <div className={styles.input_container}>
                    <div className={styles.input_label}>
                        <div className={styles.input_heading}>Tier Title</div>
                        <div className={styles.input_subheading}>Required</div>
                    </div>
                    <div className={styles.input_textfield_container}>               
                    <TextField
                      error={tierTitleError}
                      id="outlined-error"
                      label="Tier Title"
                      value={tierTitle}
                      fullWidth
                      onChange={(e)=>handleTierTitle(e.target.value)}
                    //   defaultValue="Hello World"
                    />
                    </div>
                  </div>
                  <div className={styles.input_container}>
                    <div className={styles.input_label}>
                        <div className={styles.input_heading}>Tier Price</div>
                        <div className={styles.input_subheading}>Required</div>
                    </div>
                    <div className={styles.input_textfield_container}>               
                    <FormControl fullWidth sx={{ m: 1 }}>
                      <InputLabel htmlFor="outlined-adornment-amount">Tier Price</InputLabel>
                      <OutlinedInput
                        id="outlined-adornment-amount"
                        error={tierPriceError}
                        value={tierPrice}
                        onChange={(e)=>handleTierPrice(e.target.value)}
                        startAdornment={<InputAdornment position="start">$</InputAdornment>}
                        label="Amount"
                      />
                    </FormControl>
                    </div>
                  </div> 
                  <div className={styles.input_container}>
                  <div className={styles.input_label}>
                        <div className={styles.input_heading}>Benefites</div>
                        <div className={styles.input_subheading}>You must have at least one benefit in each tier.</div>
                    </div>
                    <div className={styles.input_textfield_container}>
                      {/* {benefites.length} */}
                      {
                        tierBenefit && benefites?
                        <Select
                      mode="tags"
                      size="large"
                      placeholder="Please select"
                      defaultValue={tierBenefit}
                      onChange={handleBenefitChange}
                      bordered={false}
                      style={{ width: '100%' }}
                    >
                      {
                      benefites.map(
                        (benefit,i)=>
                        <Option key={i}>{benefit}</Option>
                        )
                      }
                    </Select>
                    :
                    <></>
                      }
                    
                    </div>
                  </div>
                  <div className={styles.input_container}>
                  <div className={styles.input_label}>
                        <div className={styles.input_heading}>Tier Description</div>
                        <div className={styles.input_subheading}>Visible to everyone</div>
                    </div>
                    <div className={styles.input_textfield_container}>
                      <TextField
                       id="outlined-multiline-static"
                       label="Multiline"
                       multiline
                       value={tierDescription}
                       onChange={(e)=>handleTierDescription(e.target.value)}
                       fullWidth
                       rows={4}
                       defaultValue="Default Value"
                     />
                    </div>
                  </div>
                  <div style={{paddingTop:`2em`}}>
                  <Space size="middle">
                    <Button type="primary" shape="round" size="large" onClick={()=>setEditMode(false)}>Back</Button>
                    <Button type="primary" shape="round" size="large" onClick={saveChanges}>Save Changes</Button>
                  </Space>
                </div>
                </div>
        </div>
        </>
    )
}

export default withRouter(EditTierPanel)