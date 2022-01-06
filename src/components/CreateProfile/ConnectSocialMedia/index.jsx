import { Space, Button, Radio, Typography } from "antd";
import React, { useState } from "react";
import Router, { withRouter } from "next/router";
import Link from "next/link";
import { Link as AnchorLink, Icon } from "@mui/material";
import styles from "../index.module.css";
import FacebookTwoToneIcon from "@mui/icons-material/FacebookTwoTone";
import { socials } from "../../../JsonData/socialmedia";
import axios from "axios";

import localStyles from "./index.module.css";
import { FacebookSignIn, FacebookUser } from "../../../utils/firbase";
import { baseUrl } from "../../../baseUrl";
import { postInitialDetails } from "../../../endpoints";
import { useDispatch } from "react-redux";

const { Text } = Typography;

const ConnectSocialMedia = ({ router }) => {
  const [errorMessage, setErrorMessage] = useState(false);

  const handleContinue = async () => {
    if (FacebookUser) {
      let wallet_id = localStorage.getItem("wallet_id");
      try {
        let payload = {
          wallet_id: wallet_id,
          custom_details: {
            ...router.query,
            socials_data: [FacebookUser],
          },
        };
        let res = await axios.post(baseUrl + postInitialDetails, payload);
        if (res.data.success) Router.push("/edit/about");
      } catch (err) {
        console.log("Component : ConnectSocialMedia :" + err);
      }
    } else setErrorMessage(true);
  };

  React.useEffect(() => {
    // window is accessible here.
    console.log("window.innerHeight", window.innerHeight);
  }, []);

  return (
    <>
      <div className={styles.create_box}>
        <div>
          <Space size="middle" direction="vertical">
            <div className={styles.step_container}>STEP 5 0F 5</div>
            <div className={styles.create_heading}>
              Want to reserve a custom URL for your Patreon page?
            </div>
            <div style={{ fontSize: `14px`, color: `#76736C` }}>
              {
                "Connect at least 1 social media account where we can verify your identity as a creator. You'll be able to set your custom URL before you launch."
              }
            </div>

            <div className={localStyles.social_connect}>
              <div style={{ display: `flex` }}>
                <Icon>
                  <FacebookTwoToneIcon color="primary" />
                </Icon>
                <div style={{ paddingLeft: `1em`, paddingTop: `2px` }}>
                  Facebook
                </div>
              </div>
              <div>
                <Button
                  style={{ textDecoration: `none` }}
                  onClick={() => FacebookSignIn()}
                >
                  Connect
                </Button>
              </div>
            </div>

            <div>
              {errorMessage ? (
                <Text type="danger">Connect one of the Social Media</Text>
              ) : (
                <></>
              )}
            </div>

            <div style={{ paddingTop: `2em` }}>
              <Space size="large">
                <Link href="/create/categories">Back</Link>
                <Button
                  type="primary"
                  shape="round"
                  size="large"
                  onClick={handleContinue}
                >
                  Continue
                </Button>
              </Space>
            </div>
          </Space>
        </div>
        <div className={styles.create_image_container}>
          <img
            src="https://c5.patreon.com/external/creator_onboarding/social_media_connect@2x.png"
            width="283px"
          />
        </div>
      </div>
    </>
  );
};

export default withRouter(ConnectSocialMedia);
