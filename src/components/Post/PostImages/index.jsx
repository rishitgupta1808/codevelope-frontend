import { Space,Upload,message, Row,Col, Button} from "antd";
import React,{useEffect, useState} from "react";
import Router, { useRouter } from 'next/router'
import Link from 'next/link'
// import style manually
import styles from "../index.module.css";
import axios from "axios";
import { baseUrl } from "../../../baseUrl";
import { getUserData, publishPostData } from "../../../endpoints";
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined';
import CloseSharpIcon from '@mui/icons-material/CloseSharp';
import PostDescription from "../LocalConents/PostDescription";
import AddTags from "../LocalConents/AddTags";
import PrivacySettings from "../LocalConents/PrivacySettings";
import { PlusOutlined,LoadingOutlined } from "@ant-design/icons";

const { Dragger } = Upload;

function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }
  

const PostImages = ({}) =>{

    const [coverImageUrl,setCoverImageUrl] = useState(false)
    const [coverLoading,setCoverLoading] = useState(false)
    const [image,setImage] = useState()
    const [postData, setPostData] = useState()

    const router = useRouter();

    const postId = router.query.pid

    const uploaCoverdButton = (
        <div >
          {coverLoading ? <LoadingOutlined /> : <PlusOutlined />}
          <div>Any JPG, JPEG, PNG, or GIF up to 512MB </div>
        </div>
      );
  



      const daggerData = {
        name: 'file',
        multiple: false,
        maxCount:1,
        showUploadList:false,
        //action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
        onChange(info) {
            if (info.file.status === 'uploading') {
                setCoverLoading(true)
                return;
              }
              if (info.file.status === 'done') {
                // Get this url from response in real world.
                getBase64(info.file.originFileObj, imageUrl =>
                  {
                      setCoverImageUrl(imageUrl)
                      setCoverLoading(false)
                  }
                );

                setImage(info.file.originFileObj)
              }
        },
        
      }

      const handlePost = async() =>{
        let formdata = new FormData();

        console.log(postData)

        let wallet_id = localStorage.getItem('wallet_id');
        let attachments = postData.attachments;
        // postData.attachments.map(file=>{
        //     console.log(file)
        //    attachments.push(file.originFileObj)
        // })
        console.log(attachments)
        //delete postData.attachments
        let payload = {
            wallet_id,
            postId,
            postType : "image",
            ...postData
        }
        
        formdata.append("post",JSON.stringify(payload));
        formdata.append("files",image)
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
                 <CameraAltOutlinedIcon/> 
                 <div style={{paddingLeft:`5px`}}>Images</div>
                 </div>
                 <div style={{cursor:`pointer`}} onClick={()=>Router.push('/posts/new')}>
                 <CloseSharpIcon/>
                 </div>
                </div>
                <Dragger {...daggerData}>
                        {coverImageUrl ? <img src={coverImageUrl} alt="avatar" style={{ height:'400px',width:'400px' }} /> : uploaCoverdButton}
                </Dragger>
                <PostDescription postData = {postData} setPostData = {setPostData}/>
                <AddTags postData = {postData} setPostData = {setPostData}/>
            </div> 
              </Col>
              <Col span = {8}>
              <Button type="primary" shape="round" size="large" style={{width:`100%`}} onClick={handlePost}>Publish Now</Button>  
               <PrivacySettings postData = {postData} setPostData = {setPostData}/>
              </Col>
          </Row>
        </div>
        </>
    )
}

export default PostImages