import { Space, Upload, message, Row, Col, Button } from "antd";
import React, { useEffect, useState } from "react";
import Router from "next/router";
import Link from "next/link";
// import style manually

import {
  LoadingOutlined,
  PlusOutlined,
  InboxOutlined,
  ConsoleSqlOutlined,
} from "@ant-design/icons";
import {
  Link as AnchorLink,
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
  Icon,
} from "@mui/material";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import PaidOutlinedIcon from "@mui/icons-material/PaidOutlined";
import WbIncandescentOutlinedIcon from "@mui/icons-material/WbIncandescentOutlined";

import styles from "../index.module.css";
import axios from "axios";
import { baseUrl } from "../../../baseUrl";
import { getUserData } from "../../../endpoints";

const UserHome = ({}) => {
  const [user, setUser] = useState();

  console.log(user);

  useEffect(async () => {
    try {
      let wallet_id = localStorage.getItem("wallet_id");
      let userData = await axios.get(baseUrl + getUserData + wallet_id);

      if (userData.data.success) setUser(userData.data.user);
    } catch (err) {
      console.log("Component : UserHome :" + err);
    }
  }, []);

  return (
    <>
      <div className={styles.user_panel_container}>
        <div className={styles.user_panel_heading}>
          Hi, {user ? user.name : <>Anomynous</>}
        </div>
        <Row gutter={[16, 16]}>
          <Col span={14}>
            <div className={styles.user_box_heading}>OVERVIEW</div>
            <div className={styles.user_panel_box}>
              <div style={{ display: `flex` }}>
                <Icon>
                  <GroupsOutlinedIcon color="disabled" />
                </Icon>
                <div
                  style={{
                    display: `flex`,
                    flexDirection: `column`,
                    padding: `0em 4em 0em 2em`,
                  }}
                >
                  <div className={styles.user_inbox_heading}>
                    {user ? user.members : 0}
                  </div>
                  <div className={styles.user_inbox_message}>
                    active members
                  </div>
                </div>
                <div
                  style={{
                    borderLeft: `1px #E5E3DD solid`,
                    paddingRight: `3em`,
                  }}
                ></div>
                <Icon>
                  <PaidOutlinedIcon color="disabled" />
                </Icon>
                <div
                  style={{
                    display: `flex`,
                    flexDirection: `column`,
                    padding: `0em 4em 0em 2em`,
                  }}
                >
                  <div className={styles.user_inbox_heading}>
                    ${user ? user.coins : 0}
                  </div>
                  <div className={styles.user_inbox_message}>per month</div>
                </div>
              </div>
            </div>
            <div className={styles.user_box_heading}>NEXT STEPS</div>
            <div className={styles.user_panel_box}>
              <div style={{ display: `flex` }}>
                <Icon>
                  <WbIncandescentOutlinedIcon color="primary" />
                </Icon>
                <div
                  style={{
                    display: `flex`,
                    flexDirection: `column`,
                    paddingLeft: `1em`,
                  }}
                >
                  <div className={styles.user_inbox_heading}>
                    Need ideas for a post?
                  </div>
                  <div className={styles.user_inbox_message}>
                    <Row>
                      <Col span={12}>
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
            <div className={styles.user_panel_box}>
              <div style={{ display: `flex` }}>
                <Icon>
                  <WbIncandescentOutlinedIcon color="primary" />
                </Icon>
                <div
                  style={{
                    display: `flex`,
                    flexDirection: `column`,
                    paddingLeft: `1em`,
                  }}
                >
                  <div className={styles.user_inbox_heading}>
                    Ideas for promoting on social media
                  </div>
                  <div className={styles.user_inbox_message}>
                    To help you build your audience and get your amazing works
                    out to more people, here are 8 quick tips for posting on
                    social media.
                  </div>
                  <div style={{ paddingTop: `1em` }}>
                    <Button
                      value="default"
                      style={{ width: `30%` }}
                      shape="round"
                      onClick={() =>
                        Router.push(
                          "https://blog.patreon.com/en-GB/social-media-promotion"
                        )
                      }
                    >
                      Get Examples
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Col>
          <Col span={10}>
            <div className={styles.user_box_heading}>RECENT ACTIVITY</div>
            <div className={styles.user_panel_box}>
              <Space size="middle" align="center" direction="vertical">
                <div
                  className={styles.user_inbox_message}
                  style={{ justifyContent: `center` }}
                >
                  {"You haven't posted anything yet"}
                </div>
                <Button
                  shape="round"
                  type="primary"
                  size="large"
                  ghost
                  onClick={() => Router.push("/posts/new")}
                >
                  Create a post
                </Button>
              </Space>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default UserHome;
