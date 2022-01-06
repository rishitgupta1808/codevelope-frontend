import { Space,Upload,message, Row,Col, Button} from "antd";
import React,{useEffect, useState} from "react";
import Router from 'next/router'
import Link from 'next/link'
// import style manually

import { LoadingOutlined, PlusOutlined,InboxOutlined, ConsoleSqlOutlined } from '@ant-design/icons';
import { Link as AnchorLink,TextField,RadioGroup,FormControlLabel,Radio, Icon } from "@mui/material";
import WbIncandescentOutlinedIcon from '@mui/icons-material/WbIncandescentOutlined';
     
import TextFieldsRoundedIcon from '@mui/icons-material/TextFieldsRounded';
import CameraAltTwoToneIcon from '@mui/icons-material/CameraAltTwoTone';
import OndemandVideoTwoToneIcon from '@mui/icons-material/OndemandVideoTwoTone';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import styles from "../index.module.css";
import axios from "axios";
import { baseUrl } from "../../../baseUrl";
import { getUserData } from "../../../endpoints";




const SelectPostType = ({}) =>{

    return(
        <>
        <div className={styles.post_panel_container}>
            <div className={styles.post_panel_box} style={{padding:`0em`}}>
                <div className={styles.post_panel_box_heading}>
                    CHOOSE POST TYPE
                </div>
                <Row>
                    <Col span={8}>
                    <div className={styles.post_type_panel_box} style={{display:`flex`}} onClick={()=>Router.push(`/posts/text/${parseInt(Date.now() * Math.random())}`)}>
                    <TextFieldsRoundedIcon color="primary" sx={{ fontSize: 60 }}/>
                    <div className={styles.post_panel_inbox_heading}>Text</div>
                    </div>
                    </Col>
                    <Col span={8}>
                    <div className={styles.post_type_panel_box} style={{display:`flex`}} onClick={()=>Router.push(`/posts/images/${parseInt(Date.now() * Math.random())}`)}>
                    <CameraAltTwoToneIcon color="primary" sx={{ fontSize: 60 }}/>
                    <div className={styles.post_panel_inbox_heading}>Images</div>
                    </div>
                    </Col>
                    <Col span={8}>
                    <div className={styles.post_type_panel_box} style={{display:`flex`}} onClick={()=>Router.push(`/posts/video/${parseInt(Date.now() * Math.random())}`)}>
                    <OndemandVideoTwoToneIcon color="primary" sx={{ fontSize: 60 }}/>
                    <div className={styles.post_panel_inbox_heading}>Videos</div>
                    </div>
                    </Col>
                </Row>
            </div>

            <div className={styles.user_panel_box}>
                    <div style={{display:`flex`}}>
                        <Icon><WbIncandescentOutlinedIcon color="primary"/></Icon>
                        <div style={{display:`flex`,flexDirection:`column`,paddingLeft:`1em`}}>
                        <div className={styles.user_inbox_heading}>Need ideas for a post?</div>
                        <div className={styles.user_inbox_message}>
                            <Row>
                                <Col span ={12}>
                                    <ul>
                                        <li>Behind the scenes</li>
                                        <li>Livestream, Q&A</li>
                                        <li>Early access</li>
                                    </ul>
                                </Col>
                                <Col span={12}>
                                <ul>
                                        <li>Polls</li>
                                        <li>Exclusive downloads</li>
                                        <li>Life & work updates</li>
                                    </ul>
                                </Col>
                            </Row>
                        </div>
                        </div>
                    </div>
                </div>

                <div className={styles.user_panel_box} >
                    <div style={{display:`flex`}}>
                        <CalendarTodayOutlinedIcon color="primary"/>
                        <div style={{display:`flex`,flexDirection:`column`,paddingLeft:`1em`}}>
                        <div className={styles.user_inbox_heading}>Post regularly</div>
                        <div className={styles.user_inbox_message}>
                        Creators who post patron-only content twice a month tend to retain more patrons
                        </div>
                        </div>
                    </div>
                </div>
        </div>
        </>
    )
}

export default SelectPostType