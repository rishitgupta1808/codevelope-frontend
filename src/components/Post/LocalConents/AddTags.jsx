import { Space,Upload,message, Row,Col, Button,Tag,Input,Tooltip} from "antd";
import React,{useEffect, useState} from "react";

import styles from "../index.module.css";
import localStyles from "./index.module.css";
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';

const AddTags = ({postData,setPostData}) =>{

   const [tags,setTags] = useState([])
   const [inputVisible,setInputVisible] = useState(false)
   const [inputValue,setInputValue] = useState('')
   const [editInputIndex,setEditInputIndex] = useState(-1)
   const [editInputValue,setEditInputValue] = useState("")

   const handleClose = removedTag => {
    const temp = tags.filter(tag => tag !== removedTag);
    console.log(temp);
    setTags(temp)
    };

    const showInput = () => {
      setInputVisible(true, () => this.input.focus());
    };

    const handleInputChange = e => {
      setInputValue(e.target.value);
    };

    const handleInputConfirm = () => {
        let temp
      if (inputValue && tags.indexOf(inputValue) === -1) {
          temp = [...tags, inputValue];
      }
      console.log(temp);
      setTags(temp)
      setInputVisible(false)
      setInputValue('')
    };

    const handleEditInputChange = e => {
      setEditInputValue(e.target.value)
    };

    const handleEditInputConfirm = () => {

        const newTags = [...tags];
        newTags[editInputIndex] = editInputValue;

        setTags(newTags)
        setEditInputValue('')
        setEditInputIndex(-1)
        
      };
    
      const saveInputRef = input => {
        setEditInputValue(input)
      };
    
      const saveEditInputRef = input => {
        setEditInputValue(input)
      };

      useEffect(()=>{
        setPostData({
            ...postData,
            tags       
          })
      },[tags])


    return(
        <>
        <div className={styles.post_panel_box} style={{padding:`0em`}}>
                <div className={styles.post_panel_box_heading} style={{justifyContent:`flex-start`}}>
                <div style={{display:`flex`}}>
                 <LocalOfferOutlinedIcon/> 
                 <div style={{paddingLeft:`5px`}}>Tags</div>
                 </div>
                 </div>
                 <div style={{display:`flex`}}>
                 {tags.map((tag, index) => {
          if (editInputIndex === index) {
            return (
              <Input
              styl={{border:`0px`}}
                ref={this.saveEditInputRef}
                key={tag}
                size="small"
                className="tag-input"
                value={editInputValue}
                onChange={handleEditInputChange}
                onBlur={handleEditInputConfirm}
                onPressEnter={handleEditInputConfirm}
              />
            );
          }

          const isLongTag = tag.length > 20;

                   const tagElem = (
              <Tag
                className="edit-tag"
                key={tag}
                closable={index !== 0}
                onClose={() => handleClose(tag)}
              >
                <span
                  onDoubleClick={e => {
                    if (index !== 0) {
                        setEditInputIndex(index)
                        setEditInputValue(tag,()=>editInput.focus())
                      e.preventDefault();
                    }
                  }}
                >
                  {isLongTag ? `${tag.slice(0, 20)}...` : tag}
                </span>
              </Tag>
            );
            return isLongTag ? (
              <Tooltip title={tag} key={tag}>
                {tagElem}
              </Tooltip>
            ) : (
              tagElem
            );
          })}
          {inputVisible && (
            <Input
              ref={saveInputRef}
              type="text"
              size="small"
              className="tag-input"
              value={inputValue}
              onChange={handleInputChange}
              onBlur={handleInputConfirm}
              onPressEnter={handleInputConfirm}
            />
          )}
          {!inputVisible && (
            <Tag className="site-tag-plus" onClick={showInput}>
              New Tag
          </Tag>
        )}
      </div>
            </div>

        </>
    )
}

export default AddTags