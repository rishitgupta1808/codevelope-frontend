import { Space,Upload,message, Row,Col, Button} from "antd";
import React,{useEffect, useState} from "react";
import Router from 'next/router'
import Link from 'next/link'
// import style manually
import styles from "../index.module.css";
import localStyles from "./index.module.css";
import axios from "axios";
import { baseUrl } from "../../../baseUrl";
import { getUserData } from "../../../endpoints";
import {Editor, EditorState} from 'draft-js';
import 'draft-js/dist/Draft.css';
import AttachFileSharpIcon from '@mui/icons-material/AttachFileSharp';
import { convertToHTML } from 'draft-convert';

const PostDescription = ({postData,setPostData}) =>{

    const [postTitle,setPostTitle] = useState()

    const handlePostTitle = (val) =>{
        setPostTitle(val)
    }

    const [editorState,setEditorState] = useState( () => EditorState.createEmpty());
    const [description,setDescription] = useState()

    const handleEditorChange = (state) => {
      setEditorState(state);
      convertContentToHTML();
    }
    const convertContentToHTML = () => {
      let currentContentAsHTML = convertToHTML(editorState.getCurrentContent());
      setDescription(currentContentAsHTML);
    }

    const [uploading,setUploading] = useState(false)
    const [fileList,setFileList] = useState([])

    console.log(description)
    const handleChange = info => {
        
        let fileList = [...info.fileList];
        // 1. Limit the number of uploaded files
        // Only to show two recent uploaded files, and old ones will be replaced by the new
        fileList = fileList.slice(-5);
    
        // 2. Read from response and show file link
        // fileList = fileList.map(file => {
        //   if (file.response) {
        //     // Component will show file.url as link
        //     file.url = file.response.url;
        //   }
        //   return file;
        // });
    
        setFileList(fileList)
      };

      const handleFile = (val)=>{
          console.log(val)
      }

    const uploadProps = {
       // action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
        onChange: handleChange,
        multiple: true,
      };

      useEffect(()=>{

        setPostData({
         ...postData,
         postTitle,
         description,
         attachments : fileList
        })

      },[postTitle,description,fileList])

    return(
        <>
        <div className={styles.post_panel_box} style={{borderRadius:`0px`,borderBottom:`0px`}}>
            
           <input 
           name="title"
           value={postTitle}
           onChange={(e)=>handlePostTitle(e.target.value)}
           style={{border:`0px`}}
           className={localStyles.input_post_title}
           placeholder="Post Title (Required)"
           ></input>
          
           <div style={{padding:`2em 0em 4em 0em`}}>
           <Editor editorState={editorState} onChange={handleEditorChange}   />
           </div>

          
             
        </div>
        
        <div className={styles.post_panel_box_heading} style={{justifyContent:`space-between`}}>
                <div style={{display:`flex`}}>
                 <AttachFileSharpIcon/> 
                 <div style={{paddingLeft:`5px`}}>Attachments</div>
                 </div>
                 <div >
                 <Upload {...uploadProps} fileList={fileList}>
                 <Button 
                 type="text"
                 loading={uploading}
                 >Upload</Button>
                 </Upload>
                 </div>
            </div>
        </>
    )
}

export default PostDescription