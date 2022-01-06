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
import { convertToHTML } from 'draft-convert';

const { Dragger } = Upload;

const mdParser = new MarkdownIt(/* Markdown-it options */);

function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }
  
  function beforeUpload(file) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
  }
  

const Basics = ({profileData, setProfileData}) =>{

    const [pageName,setPageName] = useState("")
    const [pageNameError,setPageNameError] = useState(false)

    const handlePageName = (val) =>{
        setPageName(val)
        if(!val.length)
        setPageNameError(true)
        else
        setPageNameError(false)
    }

    const [contentName,setContentName] = useState("")
    const [contentNameError,setContentNameError] = useState(false)

    const handleContentName = (val) =>{
        setContentName(val)
        if(!val.length)
        setContentNameError(true)
        else
        setContentNameError(false)
    }

    const [pageUrl,setPageUrl] = useState("")
   

    const handlePageUrl = (val) =>{
        setPageUrl(val)
    }

    const [mutipleCreators,setMultipleCreators] = useState("solo")

    const handleMutipleCreatorsChange = (val) => {
        setMultipleCreators(val)
    }  

    const [loading,setLoading] = useState(false)
    const [imageUrl,setImageUrl] = useState()
    const [profilePhoto,setProfilePhoto] = useState()
    
    const [coverImageUrl,setCoverImageUrl] = useState()
    const [coverPhoto,setCoverPhoto] = useState()
    const [coverLoading,setCoverLoading] = useState(false)

    const [about,setAbout] = useState("")

    function handleEditorChange({ html, text }) {
        console.log('handleEditorChange', html, text);
        console.log(text)
        setAbout(text)
      }

    const uploadButton = (
      <div >
        {loading ? <LoadingOutlined /> : <PlusOutlined />}
        <div>Upload</div>
      </div>
    );

    const uploaCoverdButton = (
        <div >
          {coverLoading ? <LoadingOutlined /> : <PlusOutlined />}
          <div>Upload</div>
        </div>
      );
  

    const handleChange = info => {
        console.log(info)
        if (info.file.status === 'uploading') {
          setLoading(true)
          return;
        }
        if (info.file.status === 'done') {
          // Get this url from response in real world.
          getBase64(info.file.originFileObj, imageUrl =>
            {
                setImageUrl(imageUrl)
                console.log("vfjhhgi",imageUrl)
                
                setLoading(false)
            }
          );
          setProfilePhoto(info.file.originFileObj)
        }
      };

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
                      console.log(imageUrl)
                      
                      setCoverLoading(false)
                      
                  }
                );
                setCoverPhoto(info.file.originFileObj)
              }
        },
        
      }

      useEffect(()=>{
        setProfileData({
          ...profileData,
          pageName,
          contentName,
          mutipleCreators,
          pageUrl,
          imageUrl : profilePhoto,
          coverImageUrl : coverPhoto,
          about
        })
      },[pageName,contentName,mutipleCreators,pageUrl,imageUrl,coverImageUrl,about])

    return(
        <>
        <div className={styles.panel_container}>
        <Space align="center" size="small" direction="vertical">
        <div className={styles.panel_heading}>
                Basics     
        </div>
        <p className={styles.panel_heading} style={{color: `#76736C`,fontSize: `16px`,fontWeight: `400`}}>
            Set your creator details
        </p>
        </Space>
                <div className={styles.panel_box}>
                  <div className={styles.input_container}>
                    <div className={styles.input_label}>
                        <div className={styles.input_heading}>Name of Patreon page</div>
                        <div className={styles.input_subheading}>Required</div>
                    </div>
                    <div className={styles.input_textfield_container}>               
                    <TextField
                      error={pageNameError}
                      id="outlined-error"
                      label="Name of the page"
                      value={pageName}
                      fullWidth
                      onChange={(e)=>handlePageName(e.target.value)}
                    //   defaultValue="Hello World"
                    />
                    </div>
                  </div>
                  <div className={styles.input_container}>
                    <div className={styles.input_label}>
                        <div className={styles.input_heading}>What you are creating?</div>
                        <div className={styles.input_subheading}>Required</div>
                    </div>
                    <div className={styles.input_textfield_container}>               
                    <TextField
                      error={contentNameError}
                      id="outlined-error"
                      label="Content Name"
                      value={contentName}
                      fullWidth
                      onChange={(e)=>handleContentName(e.target.value)}
                    //   defaultValue="Hello World"
                    />
                    </div>
                  </div> 
                  <div className={styles.input_container}>
                    <div className={styles.input_label}>
                        <div className={styles.input_heading}>Which Sound more Correct?</div>
                    </div>
                    <div className={styles.input_textfield_container}>               
                    <RadioGroup
                     aria-label="gender"
                     name="controlled-radio-buttons-group"
                     value={mutipleCreators}
                     onChange={(e)=>handleMutipleCreatorsChange(e.target.value)}
                    >
                        <FormControlLabel value="group" control={<Radio />} label={`${pageName} are creating ${contentName}`} />
                        <FormControlLabel value="solo" control={<Radio />} label={`${pageName} is creating ${contentName}`} />
                      </RadioGroup>
                    </div>
                  </div>
                </div>






                <div className={styles.panel_box}>
                    <div className={styles.input_container}>
                        <div className={styles.input_label}>
                            <div className={styles.input_heading}>Profile Photo</div>
                            <div className={styles.input_subheading}>Required</div>
                            <div className={styles.input_subheading}>We recommend a 256px by 256px image.</div>
                        </div>
                        <div className={styles.input_textfield_container}>
                        <Upload
                            name="avatar"
                            listType="picture-card"
                            className="avatar-uploader"
                            showUploadList={false}
                           // action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                            beforeUpload={beforeUpload}
                            onChange={handleChange}
                          >
                            {imageUrl ? <img src={imageUrl} alt="avatar" style={{ height:'100px',width:'100px auto' }} /> : uploadButton}
                            
                          </Upload>
                        </div>
                      </div>

                      <div className={styles.input_container}>
                        <div className={styles.input_label}>
                            <div className={styles.input_heading}>Cover Photo</div>
                            <div className={styles.input_subheading}>Required</div>
                            <div className={styles.input_subheading}>We recommend an image at least 1600px wide and 400px tall.</div>
                        </div>
                        <div className={styles.input_textfield_container}>
                        <Dragger {...daggerData}>
                        {coverImageUrl ? <img src={coverImageUrl} alt="avatar" style={{ height:'150px ',width:'500px' }} /> : uploaCoverdButton}
                         </Dragger>
                        </div>
                      </div>

                      <div className={styles.input_container}>
                    <div className={styles.input_label}>
                        <div className={styles.input_heading} style={{marginTop:`1em`}}>Patreon page URL</div>
                        {/* <div className={styles.input_subheading}>Required</div> */}
                    </div>
                    <div className={styles.input_subheading} style={{marginTop:`1em`,fontSize:`16px`}}> patreon.com/</div>
                    <div className={styles.input_textfield_container}>               
                    
                    <TextField
                      id="outlined-error"
                      label="Page Url"
                      value={pageUrl}
                      fullWidth
                      onChange={(e)=>handlePageUrl(e.target.value)}
                    //   defaultValue="Hello World"
                    />
                    </div>
                  </div>
                </div>


                <div className={styles.panel_box} >
                <div className={styles.input_container} style={{flexDirection:`column`}}>
                    <div className={styles.input_label} style={{width:`80%`}}>
                        <div className={styles.input_heading}>About your Patreon page</div>
                        <div className={styles.input_subheading}>Required</div>
                        <div className={styles.input_subheading}>This is the first thing potential patrons will see when they land on your page, so make sure you paint a compelling picture of how they can join you on this journey.</div>
                    </div>
                    <div className={styles.input_textfield_container} style={{marginTop:`2em`}}>
                        <MdEditor style={{ height: '250px',width:`120%` }} renderHTML={text => mdParser.render(text)} onChange={handleEditorChange} />
                    </div>
                  </div>
                </div>

        </div>
        </>
    )
}

export default Basics