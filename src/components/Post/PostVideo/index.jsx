import { Space,Upload,message, Row,Col, Button} from "antd";
import React,{useEffect, useState} from "react";
import Router, { useRouter } from 'next/router'
import Link from 'next/link'
// import style manually
import styles from "../index.module.css";
import axios from "axios";
import { baseUrl } from "../../../baseUrl";
import { getUserData, publishPostData } from "../../../endpoints";

import OndemandVideoOutlinedIcon from '@mui/icons-material/OndemandVideoOutlined';
import CloseSharpIcon from '@mui/icons-material/CloseSharp';
import PostDescription from "../LocalConents/PostDescription";
import AddTags from "../LocalConents/AddTags";
import PrivacySettings from "../LocalConents/PrivacySettings";
import { TextField } from "@mui/material";



const PostVideo = ({}) =>{

    const [videoLink,setVideoLink] = useState()

    const handleVideoLink = (val) =>{
        setVideoLink(val)
    }

    const router = useRouter();

    const postId = router.query.pid

    const [postData,setPostData] = useState()

    const handlePost = async() =>{
        let formdata = new FormData();

        console.log(postData)

        let wallet_id = localStorage.getItem('wallet_id');
        let attachments = postData.attachments;

        console.log(attachments)

        let payload = {
            postId,
            wallet_id,
            postType:"video",
            videoLink,
            ...postData
        }
        
        formdata.append("post",JSON.stringify(payload));
        attachments.map((file)=>{
            formdata.append("files",file.originFileObj)
        })
        

        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };

        let post = await axios.post(baseUrl+publishPostData,formdata,config)

        if(post.data.success)
        alert("posted")
    }
   
    return(
        <>
        <div className={styles.post_panel_container}>
          <Row gutter={[16]}>
              <Col span={16}>
              <div className={styles.post_panel_box} style={{padding:`0em`}}>
                <div className={styles.post_panel_box_heading} style={{justifyContent:`space-between`}}>
                <div style={{display:`flex`}}>
                 <OndemandVideoOutlinedIcon/> 
                 <div style={{paddingLeft:`5px`}}>Video</div>
                 </div>
                 <div style={{cursor:`pointer`}} onClick={()=>Router.push('/posts/new')}>
                 <CloseSharpIcon/>
                 </div>
                </div>
                <div className={styles.user_inbox_message} style={{padding:`2em`,display:`flex`,flexDirection:`column`}}>
                 Add a url to upload a video
                 <div style={{paddingTop:`1em`}}>
                 <TextField
                  
                  fullWidth
                  value={videoLink}
                  onChange={(e)=>handleVideoLink(e.target.value)}
                  id="outlined-required"
                  label="Link"
                  
                />
                </div>
                </div>
                <PostDescription postData = {postData} setPostData = {setPostData}/>
                <AddTags postData = {postData} setPostData = {setPostData}/>
            </div> 
              </Col>
              <Col span = {8}>
              <Button type="primary" shape="round" size="large" style={{width:`100%`}} onClick ={handlePost}>Publish Now</Button>  
               <PrivacySettings postData = {postData} setPostData = {setPostData}/>
              </Col>
          </Row>
        </div>
        </>
    )
}

export default PostVideo