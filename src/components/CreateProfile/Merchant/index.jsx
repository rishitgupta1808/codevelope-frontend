import { Space,Button,Radio,Row,Col } from "antd";
import React,{useState} from "react";
import Router,{withRouter} from 'next/router'
import Link from 'next/link'
import { Link as AnchorLink } from "@mui/material";
import styles from "../index.module.css";
import {curruencies} from "../../../JsonData/currency";

const MerchantProfile = ({router}) =>{

    const [merchant,setMerchant] = useState("Yes")
    
    const onMerchantChange = (val) =>{
        console.log(val)
        setMerchant(val.target.value)
    }

    const handleContinue = () =>{
        Router.push({pathname:'/create/socials',query:{...router.query,merchant}})
    }

    return(
        <>
        <div className={styles.create_box} >
            <div>
            <Space size="middle" direction="vertical">
            <div className={styles.step_container}>
                STEP 4 0F 5
            </div>
            <div className={styles.create_heading}>
            Do you want to offer exclusive Merch?
            </div>
            <div style={{fontSize:`14px`,color:`#76736C`}}>
            Design your patron-only merch and assign it to a tier. Patreon will handle production, global shipping and support.
            <AnchorLink href="https://support.patreon.com/hc/en-gb/articles/204605905-Should-my-creator-page-be-marked-as-adult-content" target="_blank">Learn More</AnchorLink>
            </div>
            <div style={{fontWeight:`800`}}>
            Merch for Membership adds 3% to your Patreon plan fee.
            </div>
            <div className={styles.create_category_select}>
            <Radio.Group onChange={onMerchantChange} value={merchant}>
            <Space direction="vertical">
              <Radio  size="large" value="Yes" name="merchant" >Yes, I want Merch for Membership (recommended)</Radio>
              <Radio  size="large" value="No" name="merchant">No, I do not want Merch for Membership</Radio>
            </Space>
            </Radio.Group>
            </div>
            <div style={{paddingTop:`2em`}}>
                <Space size="large">
                    <Link href="/create/merchant">Back</Link>
                    <Button type="primary" shape="round" size="large" onClick={handleContinue}>Continue</Button>
                </Space>
            </div>
            <div>
                Merch for Membership <AnchorLink href= "https://www.patreon.com/merch/terms">Terms of Use.</AnchorLink>
            </div>
            </Space>
            </div>
            <div className={styles.create_image_container}>
                <img src = "https://c5.patreon.com/external/creator_onboarding/merch@2x.png" width="283px"/>
            </div>
        </div>
        </>
    )
}

export default withRouter(MerchantProfile)