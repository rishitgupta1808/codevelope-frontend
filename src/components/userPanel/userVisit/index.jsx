import {
  Comment,
  Tooltip,
  List,
  Space,
  Upload,
  message,
  Row,
  Col,
  Button,
  Collapse,
} from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import router, { Router, useRouter } from "next/router";
import Link from "next/link";
import web3 from "web3";
import {
  TextField,
  InputAdornment,
  FormControl,
  OutlinedInput,
  InputLabel,
} from "@mui/material";
// import style manually

const { Panel } = Collapse;
import localStyles from "./index.module.css";
import tierStyles from "../../ProfileDetails/index.module.css";
import axios from "axios";
import { baseUrl } from "../../../baseUrl";
import {
  getAllPosts,
  getPostByWalletId,
  getTierdData,
  getUserByWalletId,
  getUserData,
} from "../../../endpoints";
import { ProfileFilled } from "@ant-design/icons";
import TierPage from "../../ProfileDetails/Tiers";
import NewsFeed from "../../Feed";

import { ethers } from "ethers";
import Web3Modal from "web3modal";
import { deploymentAddress } from "../../../utils/contractsFunctions/config";

import Payments from "../../../artifacts/contracts/Payments.sol/Payments.json";

import Donate from "../../../artifacts/contracts/donate.sol/donate.json";

const data = [
  {
    content: (
      <>
        <div style={{ fontSize: `16px`, fontWeight: `700` }}>0.5 ETHER</div>
        <p>
          We supply a series of design principles, practical patterns and high
          quality design resources (Sketch and Axure), to help people create
          their product prototypes beautifully and efficiently.
        </p>
      </>
    ),
    datetime: (
      <Tooltip
        title={moment().subtract(1, "days").format("YYYY-MM-DD HH:mm:ss")}
      >
        <span>{moment().subtract(1, "days").fromNow()}</span>
      </Tooltip>
    ),
  },
  {
    content: (
      <>
        <div style={{ fontSize: `16px`, fontWeight: `700` }}>0.5 ETHER</div>
        <p>
          We supply a series of design principles, practical patterns and high
          quality design resources (Sketch and Axure), to help people create
          their product prototypes beautifully and efficiently.
        </p>
      </>
    ),
    datetime: (
      <Tooltip
        title={moment().subtract(2, "days").format("YYYY-MM-DD HH:mm:ss")}
      >
        <span>{moment().subtract(2, "days").fromNow()}</span>
      </Tooltip>
    ),
  },
];

const UserVisit = ({}) => {
  const router = useRouter();

  const [user, setUser] = useState();

  const [tiers, setTier] = useState();

  const [posts, setPosts] = useState();

  const [donationAmount, setDonationAmount] = useState();

  const handleDonationAmount = (val) => {
    setDonationAmount(val);
  };

  const [message, setMessage] = useState("");

  const handleMessage = (val) => {
    setMessage(val);
  };

  console.log(router.query);

  const { userId } = router.query;

  useEffect(async () => {
    console.log(userId);

    if (!userId) return;

    const fetchUserDetails = async () => {
      try {
        let user = await axios.get(baseUrl + getUserData + userId);
        let tier = await axios.get(baseUrl + getTierdData + userId);
        let posts = await axios.get(baseUrl + getPostByWalletId + userId);

        if (user.data.success) {
          setUser(user.data.user);
          setTier(tier.data.tiers);
          setPosts(posts.data.allPosts);
          console.log(user.data.user);
        }

        // console.log("plans", donate)

        //setPlans(plans)
        //   plans.map(plan => {
        //     console.log("amount", plan.amount.toNumber())
        //     console.log("merchant", plan.merchant)
        //     console.log("frequency", plan.frequency.toNumber())
        //   })
      } catch (err) {
        console.log("Component : userVisit : useEffet " + err);
      }
    };

    fetchUserDetails();
  }, [userId]);

  const donateToken = async () => {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const donateContract = new ethers.Contract(
      deploymentAddress,
      Donate.abi,
      signer
    );

    let reciever = userId;
    const donate = await donateContract.sendDonatedAmount(reciever, message, {
      value: web3.utils.toWei(`${donationAmount}`, "ether"),
    });

    console.log(donate);
  };

  const dateString = (date) => {
    const tierDate = new Date(date);

    return tierDate.toDateString();
  };

  const [donationList, setDonationList] = useState();

  useEffect(async () => {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    // const provider = new ethers.providers.JsonRpcProvider(`https://polygon-mumbai.infura.io/v3/609f9d9efb844b349a353b2d85e5c878`)
    // const signer = provider.getSigner()
    const donateContract = new ethers.Contract(
      "0x5FbDB2315678afecb367f032d93F642f64180aa3",
      Donate.abi,
      signer
    );
    const donate = await donateContract.fetchAllDonations();

    console.log("donations", donate);
    setDonationList(donate);
  }, []);

  return (
    <>
      {user && (
        <div>
          <div
            className={localStyles.cover_image_container}
            style={{ backgroundImage: `url(${user.coverPhoto})` }}
          >
            <div className={localStyles.profile_image_container}>
              <div
                className={localStyles.profile_image}
                style={{ backgroundImage: `url(${user.profilePhoto})` }}
              />
            </div>
          </div>
          <div className={localStyles.content_container}>
            <div className={localStyles.page_name}>{user.pageName}</div>
            <div className={localStyles.content_name}>
              {user.mutipleCreators === "solo" ? (
                <>is creating </>
              ) : (
                <>are creating </>
              )}
              {user.contentName}
            </div>

            <div
              className={localStyles.content_container}
              style={{ marginTop: `2em`, margin: `0 auto`, width: `60%` }}
            >
              {/* <div className={localStyles.about_container}>Donate {user.pageName}</div>
                <div className={tierStyles.panel_box} style={{margin: `0 auto`,width: `60%`}} >
                <FormControl fullWidth sx={{ m: 1 }} style={{marginLeft:`-2px`}}>
                  <InputLabel htmlFor="outlined-adornment-amount">Donation Amount</InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-amount"
                    value={donationAmount}
                    onChange={(e)=>handleDonationAmount(e.target.value)}
                    startAdornment={<InputAdornment position="start">ETH</InputAdornment>}
                    label="Amount"
                  />
                </FormControl>
               
                <TextField
                  id="outlined-multiline-static"
                  label="Message"
                  multiline
                  rows={4}
                  fullWidth
                  value={message}
                  onChange={(e)=>handleMessage(e.target.value)}
                /> */}

              <Button
                type="primary"
                shape="round"
                size="large"
                style={{ marginTop: `2em` }}
                onClick={() => router.push(`/donate/${userId}`)}
              >
                Donate to {user.pageName}
              </Button>

              {/* </div>
                <div style={{marginTop:`2em`,fontSize:`32px`}}>
                <Collapse  ghost>
                  <Panel header="Donation List" key="1" >
                  <List
                     className="comment-list"
                     header={`${data.length} replies`}
                     itemLayout="horizontal"
                     dataSource={data}
                     renderItem={item => (
                       <li>
                         <Comment
                           actions={item.actions}
                           author={item.author}
                           avatar={item.avatar}
                           content={item.content}
                           datetime={item.datetime}
                         />
                       </li>
                     )}
                   />
                  </Panel>
                </Collapse>
                </div> */}
            </div>
            <div>
              <div style={{ width: "80%", margin: "0 auto" }}>
                <div
                  style={{
                    fontWeight: `800`,
                    fontSize: `34px`,
                    marginTop: `2em`,
                    marginBottom: `0.5em`,
                  }}
                  className={localStyles.content_container}
                >
                  Select a membership level
                </div>
                <Row gutter={[16, 16]}>
                  {tiers?.map((tier, i) => (
                    <Col key={i} span={8}>
                      <div
                        className={tierStyles.panel_box}
                        style={{ padding: `1em` }}
                      >
                        <div className={tierStyles.input_subheading}>
                          Published {dateString(tier.createdAt)}
                        </div>
                        <div className={tierStyles.input_subheading}>
                          {tier.member} Members
                        </div>
                        <br />
                        <div className={tierStyles.input_heading}>
                          {tier.name}
                        </div>
                        <div className={tierStyles.input_subheading}>
                          ${tier.price} per month
                        </div>
                        <br />
                        {tier.benefites.map((benefit) => (
                          <>
                            <div className={tierStyles.tier_benefit_container}>
                              {benefit}
                            </div>
                          </>
                        ))}
                        <div
                          className={localStyles.content_container}
                          style={{ marginTop: `2em` }}
                        >
                          <Button type="primary" shape="round" size="large">
                            Join for ${tier.price}
                          </Button>
                        </div>
                      </div>
                    </Col>
                  ))}
                </Row>
              </div>
            </div>
            <div style={{ display: `flex`, marginTop: `2em` }}>
              <div>
                <div style={{ fontSize: `21px`, fontWeight: `600` }}>
                  {user.members}
                </div>
                <div
                  style={{
                    fontSize: `10px`,
                    fontWeight: `500`,
                    color: `#706C64`,
                  }}
                >
                  MEMBERS
                </div>
              </div>
              <div style={{ marginLeft: `15px` }}>
                <div style={{ fontSize: `21px`, fontWeight: `600` }}>
                  ${user.coins}
                </div>
                <div
                  style={{
                    fontSize: `10px`,
                    fontWeight: `500`,
                    color: `#706C64`,
                  }}
                >
                  COINS
                </div>
              </div>
            </div>
            <div
              className={localStyles.content_container}
              style={{ marginTop: `2em` }}
            >
              <div className={localStyles.about_container}>
                About {user.pageName}
              </div>
              <div
                className={tierStyles.panel_box}
                style={{ margin: `0 auto`, width: `60%`, paddingTop: `4em` }}
              >
                {user.about}
              </div>
            </div>
            <div
              className={localStyles.content_container}
              style={{ marginTop: `2em` }}
            >
              <div className={localStyles.about_container}>
                Some Posts of {user.pageName}
              </div>
              <div style={{ margin: `0 auto`, width: `60%` }}>
                {" "}
                <NewsFeed userFeed={posts} />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UserVisit;
