import { Space, Button, Radio, Icon } from "antd";
import React, { useState } from "react";
import Router, { withRouter } from "next/router";
import Link from "next/link";
import { Link as AnchorLink } from "@mui/material";
import styles from "../index.module.css";

const SelectCategory = ({ router }) => {
  const [adultContent, setAdultContent] = useState("No");

  const onAdultContentChange = (val) => {
    console.log(val);
    setAdultContent(val.target.value);
  };

  const handleContinue = () => {
    Router.push({
      pathname: "/create/currency",
      query: { ...router.query, adultContent },
    });
  };

  return (
    <>
      <div className={styles.create_box}>
        <div>
          <Space size="middle" direction="vertical">
            <div className={styles.step_container}>STEP 2 0F 5</div>
            <div className={styles.create_heading}>
              Does your work contain 18+ themes such as real or illustrated
              nudity?
            </div>
            <div style={{ fontSize: `14px`, color: `#76736C` }}>
              {`Patreon is a place where all types of artists can express themselves freely. 
            At the same time, we need to ensure that the browsing experience is sensitive to different age groups, 
            cultures, and contexts. "18+" means material that features real or illustrated nudity,
             or other creations that may be considered inappropriate for people under 18 years old.`}
              <AnchorLink
                href="https://support.patreon.com/hc/en-gb/articles/204605905-Should-my-creator-page-be-marked-as-adult-content"
                target="_blank"
              >
                Learn More
              </AnchorLink>
            </div>
            <div className={styles.create_category_select}>
              <Radio.Group onChange={onAdultContentChange} value={adultContent}>
                <Radio size="large" value="No" name="adultContent">
                  No, my work does not contain real or illustrated nudity.
                </Radio>
                <Radio size="large" value="Yes" name="adultContent">
                  Yes, my work contains real or illustrated nudity.
                </Radio>
              </Radio.Group>
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
            src="https://c5.patreon.com/external/creator_onboarding/18_plus@2x.png"
            width="283px"
          />
        </div>
      </div>
    </>
  );
};

export default withRouter(SelectCategory);
