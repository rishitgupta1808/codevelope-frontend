import { Space,Upload,message} from "antd";
import React,{useEffect, useState} from "react";
import Router from 'next/router'
import Link from 'next/link'
import MdEditor from 'react-markdown-editor-lite';
import MarkdownIt from 'markdown-it';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';
import { LoadingOutlined, PlusOutlined,InboxOutlined } from '@ant-design/icons';
import { Link as AnchorLink,TextField,RadioGroup,FormControlLabel,Radio } from "@mui/material";
import styles from "../index.module.css";
import axios from "axios";


const PageSettings = ({profileData, setProfileData}) =>{

    const [lastName,setLastName] = useState("")
    const [lastNameError,setLastNameError] = useState(false)

    const handleLastName = (val) =>{
        setLastName(val)
        if(!val.length)
        setLastNameError(true)
        else
        setLastNameError(false)
    }

    const [firstName,setFirstName] = useState("")
    const [firstNameError,setFirstNameError] = useState(false)

    const handleFirstName = (val) =>{
        setFirstName(val)
        if(!val.length)
        setFirstNameError(true)
        else
        setFirstNameError(false)
    }

    const [country,setCountry] = useState("")

    const handleCountry = (val) =>{
        setCountry(val)
    }



    useEffect(async()=>{

        setProfileData({
            ...profileData,
            firstName,
            lastName,
            country
        })
    },[firstName,lastName,country])

    return(
        <>
        <div className={styles.panel_container} style={{width:`1020px`}}>
        <Space align="center" size="small" direction="vertical">
        <div className={styles.panel_heading}>
        Page Settings     
        </div>
        <p className={styles.panel_heading} style={{color: `#76736C`,fontSize: `16px`,fontWeight: `400`}}>
        Set your creator details and make a great first impression
        </p>
        </Space>
                <div className={styles.panel_box}>
                  <div className={styles.input_container}>
                    <div className={styles.input_label} style={{width:`100%`}}>
                        <div className={styles.input_heading}>Creator Account Details</div>
                        <div className={styles.input_subheading}>This account information will not appear on your public page.</div>
                    </div>
                  </div>
                  <div className={styles.input_container}>
                    <div className={styles.input_label}>
                        <div className={styles.input_heading}>Legal First Name</div>
                        <div className={styles.input_subheading}>Required</div>
                    </div>
                    <div className={styles.input_textfield_container}>               
                    <TextField
                      error={firstNameError}
                      id="outlined-error"
                      label="First Name"
                      value={firstName}
                      fullWidth
                      onChange={(e)=>handleFirstName(e.target.value)}
                    //   defaultValue="Hello World"
                    />
                    </div>
                  </div> 
                  <div className={styles.input_container}>
                    <div className={styles.input_label}>
                        <div className={styles.input_heading}>Legal Last Name</div>
                        <div className={styles.input_subheading}>Required</div>
                    </div>
                    <div className={styles.input_textfield_container}>               
                    <TextField
                      error={lastNameError}
                      id="outlined-error"
                      label="Last Name"
                      value={lastName}
                      fullWidth
                      onChange={(e)=>handleLastName(e.target.value)}
                    //   defaultValue="Hello World"
                    />
                    </div>
                  </div> 
                  <div className={styles.input_container}>
                    <div className={styles.input_label}>
                        <div className={styles.input_heading}>Country</div>
                        <div className={styles.input_subheading}>Required</div>
                    </div>
                    <div className={styles.input_textfield_container}>               
                    <TextField
                      id="outlined-error"
                      label="Country"
                      value={country}
                      fullWidth
                      onChange={(e)=>handleCountry(e.target.value)}
                    //   defaultValue="Hello World"
                    />
                    </div>
                  </div> 
                </div>

        </div>
        </>
    )
}

export default PageSettings