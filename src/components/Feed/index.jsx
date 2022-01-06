import { Row, Col, Button } from "antd";
import axios from "axios";
import Router from "next/router";
import React, { useEffect, useState } from "react";
import { baseUrl } from "../../baseUrl";
import { getAllPosts } from "../../endpoints";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { Button as muiButton } from "@mui/material";
import Typography from "@mui/material/Typography";
import styles from "./index.module.css";

import { ethers } from "ethers";
import Web3Modal from "web3modal";
import { paymentForPostAddress } from "../../utils/contractsFunctions/config";
import PaymentForPost from "../../artifacts/contracts/paymentForPost.sol/PaymentForPost.json";
import web3 from "web3";
import { LockOutlined } from "@ant-design/icons";
import { Skeleton } from "@mui/material";

const NewsFeed = ({ userFeed }) => {
  const [allPosts, setAllPosts] = useState(userFeed);

  console.log(allPosts);

  const convertDate = (date) => {
    let temp = new Date(date);
    return temp.toDateString();
  };

  const getPostVisible = async (postId) => {
    let wallet_id = localStorage.getItem("wallet_id");

    // const provider = new ethers.providers.JsonRpcProvider(`https://polygon-mumbai.infura.io/v3/609f9d9efb844b349a353b2d85e5c878`)
    // const signer = provider.getSigner()
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const paymentForPostContract = new ethers.Contract(
      paymentForPostAddress,
      PaymentForPost.abi,
      signer
    );

    const visible = await paymentForPostContract.fetchAllPosts(
      postId,
      wallet_id
    );

    if (visible) {
      console.log(visible.paid);
      return visible.paid;
    }
  };

  useEffect(async () => {
    if (userFeed) return;

    let wallet_id = localStorage.getItem("wallet_id");

    let posts = await axios.get(baseUrl + getAllPosts);

    if (posts.data.success) {
      let temp = await posts.data.allPosts;
      for (let i = 0; i < temp.length; i++) {
        temp[i].visible = await getPostVisible(temp[i].postId);
      }
      console.log(temp);
      setAllPosts(temp);
    }
  }, []);

  const payForPost = async (postId, price, reciever) => {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const paymentForPostContract = new ethers.Contract(
      paymentForPostAddress,
      PaymentForPost.abi,
      signer
    );

    const donate = await paymentForPostContract.sendAmount(reciever, postId, {
      value: web3.utils.toWei(`${price}`, "ether"),
    });

    let temp = allPosts;

    console.log("before", temp);
    temp.map((post) => {
      if (post.postId == postId) post.visible = true;
    });

    console.log("after", temp);

    setAllPosts(temp);
  };

  return (
    <>
      <div className=" flex flex-row flex-wrap justify-evenly">
        {allPosts?.map((post, i) => {
          return (
            <div
              key={i}
              className={`${styles.post_wrapper} post-wrapper rounded-lg overflow-hidden border border-gray-300 mb-4 cursor-pointer`}
            >
              {post.visible ? (
                <div onClick={() => Router.push(`/posts/${post.postId}`)}>
                  {post.postType === "image" && (
                    <div className={`${styles.post_image} post-image `}>
                      <img
                        src={post.imageUrl}
                        alt=""
                        className="h-full w-full object-cover"
                      />
                    </div>
                  )}
                  {post.postType === "video" && (
                    <div className={`${styles.post_image} post-image `}>
                      <iframe
                        className="w-full h-full"
                        src={post.videoLink}
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    </div>
                  )}
                </div>
              ) : (
                <div
                  className={`${styles.post_locked} post-locked-wrapper flex justify-center items-center flex-col relative`}
                >
                  <div
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                    }}
                    className="w-full"
                  >
                    <Skeleton
                      variant="rectangular"
                      // width="100px"
                      height="250px"
                    />
                  </div>
                  <div className="flex justify-center items-center flex-col">
                    <div className="lock-icon mb-4">
                      <LockOutlined
                        style={{ fontSize: "50px" }}
                        className="text-gray-500"
                      />
                    </div>
                    <div className="lock-text text-xl font-semibold">
                      Unlock this post by becoming a member
                    </div>
                  </div>
                  {/* <div className="lock-button"></div> */}
                </div>
              )}
              <div className="post-info-wrapper p-4">
                <div className="post-title-info">
                  <div className="post-time mb-2">
                    <span className="text-xs font-semibold text-gray-500">
                      {/* 1 JAN 2022 AT 22:30 */}Published on{" "}
                      {convertDate(post.createdAt)}
                    </span>
                  </div>
                  <div className="post-title text-xl">
                    {post?.visible
                      ? post?.postTitle
                      : post?.teaserText || "Teaser text"}
                  </div>
                </div>
                {!post.visible && (
                  <div className="post-button py-4 grid justify-strech">
                    <button
                      onClick={() =>
                        payForPost(post.postId, post.price, post.wallet_id)
                      }
                      className="px-4 py-2 bg-blue-400 rounded-lg text-white font-semibold"
                    >
                      Pay ETH {post?.price}
                    </button>
                  </div>
                )}

                <div className="post-details">
                  <div>
                    <span className="mr-3">{post?.likes} Likes</span>
                    <span>{post?.comments?.length} Comments</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        {/* </div> */}
      </div>
      {/* <div className={styles.feed_container}>
        <Row span={[16, 16]}>
          {allPosts?.map((post) => {
            if (post.postType === "image") {
              console.log(post);
              return (
                <Col span={12}>
                  <div>
                    <Card sx={{ maxWidth: 345 }}>
                      {true || post.visible ? (
                        <div
                          onClick={() => Router.push(`/posts/${post.postId}`)}
                        >
                          <CardMedia
                            component="img"
                            alt="green iguana"
                            height="200"
                            image={post.imageUrl}
                          />
                        </div>
                      ) : (
                        <CardMedia
                          component="img"
                          alt="green iguana"
                          height="200"
                          image="https://i.ibb.co/XxxynzC/Progressively-Loading-Images-With-Blur-Effect-min.png"
                        />
                      )}

                      <div style={{ backgroundColor: `#E7EBEF` }}>
                        <CardContent>
                          {post.visible ? (
                            <Typography
                              gutterBottom
                              variant="h5"
                              component="div"
                            >
                              {post.postTitle}{" "}
                            </Typography>
                          ) : (
                            <Typography
                              gutterBottom
                              variant="h5"
                              component="div"
                            >
                              {post.teaserText}
                            </Typography>
                          )}

                          <Typography variant="body2" color="text.secondary">
                            Published on {convertDate(post.createdAt)}
                          </Typography>
                        </CardContent>
                        <CardActions>
                          <Button
                            type="primary"
                            shape="round"
                            size="large"
                            style={{ marginTop: `2em` }}
                            onClick={() =>
                              payForPost(
                                post.postId,
                                post.price,
                                post.wallet_id
                              )
                            }
                          >
                            Pay ETH {post?.price}
                          </Button>
                        </CardActions>
                      </div>
                    </Card>
                  </div>
               
                </Col>
              );
            }
            // <iframe
            //   className={styles.media_container}
            //   src={post.videoLink}
            //   title="YouTube video player"
            //   frameborder="0"
            //   allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            //   allowfullscreen
            // ></iframe>;
            if (post.postType === "video") {
              return (
                <Col span={12}>
                  <div onClick={() => Router.push(`/posts/${post.postId}`)}>
                    <Card sx={{ maxWidth: 345 }}>
                      {true || post.visible ? (
                        <iframe
                          className={styles.media_container}
                          src={post.videoLink}
                          title="YouTube video player"
                          frameborder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowfullscreen
                        ></iframe>
                      ) : (
                        <CardMedia
                          component="img"
                          alt="green iguana"
                          height="200"
                          image="https://i.ibb.co/XxxynzC/Progressively-Loading-Images-With-Blur-Effect-min.png"
                        />
                      )}

                      <div style={{ backgroundColor: `#E7EBEF` }}>
                        <CardContent>
                          {post.visible ? (
                            <Typography
                              gutterBottom
                              variant="h5"
                              component="div"
                            >
                              {post.postTitle}{" "}
                            </Typography>
                          ) : (
                            <Typography
                              gutterBottom
                              variant="h5"
                              component="div"
                            >
                              {post.teaserText}
                            </Typography>
                          )}
                          <Typography variant="body2" color="text.secondary">
                            Published on {convertDate(post.createdAt)}
                          </Typography>
                        </CardContent>
                        <CardActions>
                          <Button
                            type="primary"
                            shape="round"
                            size="large"
                            style={{ marginTop: `2em` }}
                          >
                            Pay ETH {post?.price}
                          </Button>
                        </CardActions>
                      </div>
                    </Card>
                  </div>
                </Col>
              );
            }

            if (post.postType === "text") {
              return (
                <Col span={12}>
                  <Card sx={{ maxWidth: 345 }}>
                    <CardContent>
                      <div onClick={() => Router.push(`/posts/${post.postId}`)}>
                        {post.visible ? (
                          <Typography gutterBottom variant="h5" component="div">
                            {post.postTitle}{" "}
                          </Typography>
                        ) : (
                          <Typography gutterBottom variant="h5" component="div">
                            {post.teaserText}
                          </Typography>
                        )}
                      </div>
                      <Typography variant="body2" color="text.secondary">
                        Published on {convertDate(post.createdAt)}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button
                        type="primary"
                        shape="round"
                        size="large"
                        style={{ marginTop: `2em` }}
                        onClick={() =>
                          payForPost(post.postId, post.price, post.wallet_id)
                        }
                      >
                        Pay ETH {post?.price}
                      </Button>
                    </CardActions>
                  </Card>
                </Col>
              );
            }
          })}
        </Row>
      </div> */}
    </>
  );
};

export default NewsFeed;
