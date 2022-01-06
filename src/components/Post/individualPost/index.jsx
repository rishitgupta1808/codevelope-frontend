import { Row, Col, Button, Space } from "antd";
import axios from "axios";
import Router, { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { baseUrl } from "../../../baseUrl";
import {
  getPostByPostId,
  increaseLikes,
  deceaseLikes,
  getUserData,
} from "../../../endpoints";
import AttachFileOutlinedIcon from "@mui/icons-material/AttachFileOutlined";
import FavoriteTwoToneIcon from "@mui/icons-material/FavoriteTwoTone";

import styles from "../index.module.css";
import userStyles from "../../userPanel/userVisit/index.module.css";
import { HeartFilled, HeartOutlined, HeartTwoTone } from "@ant-design/icons";

import { Comment, Avatar, Form, List, Input } from "antd";
import moment from "moment";

const { TextArea } = Input;

const CommentList = ({ comments }) => (
  <List
    dataSource={comments}
    header={`${comments.length} ${comments.length > 1 ? "replies" : "reply"}`}
    itemLayout="horizontal"
    renderItem={(props) => <Comment {...props} />}
  />
);

const Editor = ({ onChange, onSubmit, submitting, value }) => (
  <>
    <Form.Item>
      <TextArea rows={4} onChange={onChange} value={value} />
    </Form.Item>
    <Form.Item>
      <Button
        htmlType="submit"
        loading={submitting}
        onClick={onSubmit}
        type="primary"
      >
        Add Comment
      </Button>
    </Form.Item>
  </>
);

const IndividualPost = ({ userFeed }) => {
  const router = useRouter();

  const { postId } = router.query;

  const [post, setPost] = useState();

  const [postLikes, setPostLikes] = useState(0);

  const [postLiked, setPostLiked] = useState(false);

  const [postComments, setPostComments] = useState({
    comments: [],
    submitting: false,
    value: "",
  });

  const [postUser, setPostUser] = useState();
  const [currUser, setCurrUser] = useState();

  console.log(postId);

  useEffect(async () => {
    if (!postId) return;

    const fetchPostDetails = async () => {
      try {
        let post = await axios.get(baseUrl + getPostByPostId + postId);

        if (post.data.success) {
          setPost(post.data.post);
          setPostLikes(post.data.post.likes);

          let users = await axios.get(
            baseUrl + getUserData + post.data.post.wallet_id
          );
          console.log(users);
          if (users.data.success) setUser(users.data.user);
        }

        console.log(post.data.post.wallet_id);
      } catch (err) {
        console.log("Component : individualPost : useEffet " + err);
      }
    };

    const fetchPostUserDetails = async () => {
      console.log(post.wallet_id);

      console.log(baseUrl + getUserData + post.wallet_id);
    };

    const fetchCurrUserDetails = async () => {
      // console.log(post.wallet_id)

      //console.log(baseUrl+ getUserData + post.wallet_id)

      let wallet_id = localStorage.getItem("wallet_id");

      console.log(baseUrl + getUserData + wallet_id);
      let users = await axios.get(baseUrl + getUserData + wallet_id);
      console.log(users);
      if (users.data.success) setCurrUser(users.data.user);
    };

    await fetchPostDetails();
    // await fetchPostUserDetails();
    await fetchCurrUserDetails();
  }, [postId]);

  console.log(post);

  const convertToDate = (date) => {
    const temp = new Date(date);

    return temp.toDateString();
  };

  const increaseLike = async () => {
    try {
      let likes = await axios.get(baseUrl + increaseLikes + postId);

      if (likes.data.success) {
        setPostLikes(postLikes + 1);
        setPostLiked(true);
      }
    } catch (err) {
      console.log("Component : individualPost : increaseLikes " + err);
    }
  };

  const decreaseLike = async () => {
    try {
      let likes = await axios.get(baseUrl + deceaseLikes + postId);

      if (likes.data.success) {
        setPostLikes(postLikes - 1);
        setPostLiked(false);
      }
    } catch (err) {
      console.log("Component : individualPost : increaseLikes " + err);
    }
  };

  const handleSubmit = () => {
    if (!postComments.value) {
      return;
    }

    setPostComments({
      ...postComments,
      submitting: true,
    });

    setTimeout(() => {
      let photo = currUser.profilePhoto;
      let name = currUser.name;

      setPostComments({
        submitting: false,
        value: "",
        comments: [
          ...postComments.comments,
          {
            author: name,
            avatar: photo,
            content: <p>{postComments.value}</p>,
            datetime: moment().fromNow(),
          },
        ],
      });
    }, 1000);
  };

  const handleChange = (e) => {
    setPostComments({
      ...postComments,
      value: e.target.value,
    });
  };

  return (
    <>
      <div className={styles.post_panel_container}>
        <Row gutter={[16, 16]}>
          <Col span={24}>
            {post && (
              <div>
                <div
                  className={styles.post_panel_box}
                  style={{ padding: `2em 2em 1em 2em` }}
                >
                  {post.postType === "image" ? (
                    <>
                      <div>
                        <img src={post.imageUrl} width="100%" />
                        <Space size="small" direction="vertical">
                          <div
                            className={styles.user_inbox_message}
                            style={{
                              fontSize: `10px`,
                              fontWeight: `500`,
                              marginTop: `3em`,
                            }}
                          >
                            {convertToDate(post.createdAt).toUpperCase()}
                          </div>
                          <div className={styles.user_inbox_heading}>
                            {post.postTitle}
                          </div>
                          <div
                            className={styles.user_inbox_message}
                            dangerouslySetInnerHTML={{
                              __html: post.description,
                            }}
                          ></div>
                          <div>
                            <AttachFileOutlinedIcon sx={{ fontSize: 15 }} />
                            {post.attachments.map((file, i) => (
                              <Button
                                key={i}
                                type="link"
                                onClick={() => Router.push(file.url)}
                              >
                                {file.title}
                              </Button>
                            ))}
                          </div>
                          <div style={{ display: `flex` }}>
                            {post.tags.map((tag, i) => (
                              <div
                                key={i}
                                style={{
                                  color: `rgb(51, 89, 194)`,
                                  paddingRight: `10px`,
                                }}
                              >
                                {tag}
                              </div>
                            ))}
                          </div>
                        </Space>
                      </div>
                    </>
                  ) : (
                    <></>
                  )}
                  {post.postType === "text" ? (
                    <>
                      <div>
                        <Space size="small" direction="vertical">
                          <div
                            className={styles.user_inbox_message}
                            style={{
                              fontSize: `10px`,
                              fontWeight: `500`,
                              marginTop: `3em`,
                            }}
                          >
                            {convertToDate(post.createdAt).toUpperCase()}
                          </div>
                          <div className={styles.user_inbox_heading}>
                            {post.postTitle}
                          </div>
                          <div
                            className={styles.user_inbox_message}
                            dangerouslySetInnerHTML={{
                              __html: post.description,
                            }}
                          ></div>
                          <div>
                            <AttachFileOutlinedIcon sx={{ fontSize: 15 }} />
                            {post.attachments.map((file, i) => (
                              <Button
                                key={i}
                                type="link"
                                onClick={() => Router.push(file.url)}
                              >
                                {file.title}
                              </Button>
                            ))}
                          </div>
                          <div style={{ display: `flex` }}>
                            {post.tags.map((tag, i) => (
                              <div
                                key={i}
                                style={{
                                  color: `rgb(51, 89, 194)`,
                                  paddingRight: `10px`,
                                }}
                              >
                                {tag}
                              </div>
                            ))}
                          </div>
                        </Space>
                      </div>
                    </>
                  ) : (
                    <></>
                  )}
                  {post.postType === "video" ? (
                    <>
                      <div>
                        <div style={{ width: `100%` }}>
                          <iframe
                            src={post.videoLink}
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          ></iframe>
                        </div>
                        <Space size="small" direction="vertical">
                          <div
                            className={styles.user_inbox_message}
                            style={{
                              fontSize: `10px`,
                              fontWeight: `500`,
                              marginTop: `3em`,
                            }}
                          >
                            {convertToDate(post.createdAt).toUpperCase()}
                          </div>
                          <div className={styles.user_inbox_heading}>
                            {post.postTitle}
                          </div>
                          <div
                            className={styles.user_inbox_message}
                            dangerouslySetInnerHTML={{
                              __html: post.description,
                            }}
                          ></div>
                          <div>
                            <AttachFileOutlinedIcon sx={{ fontSize: 15 }} />
                            {post.attachments.map((file, i) => (
                              <Button
                                key={i}
                                type="link"
                                onClick={() => Router.push(file.url)}
                              >
                                {file.title}
                              </Button>
                            ))}
                          </div>
                          <div style={{ display: `flex` }}>
                            {post.tags.map((tag, i) => (
                              <div
                                key={i}
                                style={{
                                  color: `rgb(51, 89, 194)`,
                                  paddingRight: `10px`,
                                }}
                              >
                                {tag}
                              </div>
                            ))}
                          </div>
                        </Space>
                      </div>
                    </>
                  ) : (
                    <></>
                  )}
                  <div
                    style={{
                      marginTop: `3em`,
                      display: `flex`,
                      justifyContent: `space-between`,
                    }}
                  >
                    <div>
                      {postLiked ? (
                        <>
                          <HeartFilled
                            style={{ fontSize: "25px", color: `red` }}
                            onClick={decreaseLike}
                          />
                        </>
                      ) : (
                        <>
                          <HeartOutlined
                            style={{ fontSize: "25px" }}
                            onClick={increaseLike}
                          />
                        </>
                      )}
                    </div>
                    <div>{postLikes} Likes</div>
                  </div>
                </div>
                <div
                  className={styles.post_panel_box}
                  style={{ pading: `0em`, marginTop: `1em` }}
                >
                  <Comment
                    avatar={
                      <Avatar src={currUser?.profilePhoto} alt="Han Solo" />
                    }
                    content={
                      <Editor
                        onChange={handleChange}
                        onSubmit={handleSubmit}
                        submitting={postComments.submitting}
                        value={postComments.value}
                      />
                    }
                  />
                  {postComments.comments.length > 0 && (
                    <CommentList comments={postComments.comments} />
                  )}
                </div>
              </div>
            )}
          </Col>
          {/* <Col span = {8}>
                <div className={styles.post_panel_box}>
                {user &&
                 <div>
                 <div className={localStyles.cover_image_container} style={{backgroundImage:`url(${user.coverPhoto})`}}>
                     <div className={localStyles.profile_image_container}>
                         <div className={localStyles.profile_image} style={{backgroundImage:`url(${user.profilePhoto})`}}/>
                     </div>
                 </div>
                 <div className={localStyles.content_container}>
                     <div className={localStyles.page_name}>
                         {user.pageName}
                     </div>
                     <div className={localStyles.content_name}>
                         {
                             user.mutipleCreators==="solo"?
                             <>is creating </>
                             :
                             <>are creating </>
                         }
                         {user.contentName}
                    </div>
                    </div>
                </div>
                }
            </div>
            </Col>*/}
        </Row>
      </div>
    </>
  );
};

export default IndividualPost;
