import { Space, Row, Col } from "antd";
import React, { useEffect, useState } from "react";
import MarkdownIt from "markdown-it";
// import style manually
import "react-markdown-editor-lite/lib/index.css";
import { RotateRightOutlined } from "@ant-design/icons";
import { Link as AnchorLink } from "@mui/material";
import styles from "../index.module.css";
import localStyles from "./index.module.css";
import Router from "next/router";
import defaultTier, { Tiers } from "../../../JsonData/defaultTier";
import Edittierpanel from "../Edittierpanel";

const TierPage = ({ profileData, setProfileData }) => {
  let date = new Date();
  const dateString = date.toDateString();

  const [editMode, setEditMode] = useState(false);
  const [localTiers, setTiers] = useState(Tiers);
  const [sendTierData, setSendTier] = useState();

  const sendTier = (tier) => {
    //console.log(tier)
    setSendTier(tier);
    setEditMode(true);
    // Router.push({pathname:'/edit/tier',query:{tier:JSON.stringify(tier)}})
  };

  useEffect(() => {
    setProfileData({
      ...profileData,
      tiers: localTiers,
    });
  }, [localTiers]);

  useEffect(() => {
    setProfileData({
      ...profileData,
      tiers: localTiers,
    });
  }, []);

  return (
    <>
      {editMode ? (
        <Edittierpanel
          tiers={localTiers}
          setTiers={setTiers}
          editMode={editMode}
          setEditMode={setEditMode}
          sendTier={sendTierData}
        />
      ) : (
        <>
          <div className={styles.panel_container}>
            <Space align="center" size="small" direction="vertical">
              <div className={styles.panel_heading}>Tiers</div>
              <p
                className={styles.panel_heading}
                style={{
                  color: `#76736C`,
                  fontSize: `16px`,
                  fontWeight: `400`,
                }}
              >
                Choose what to offer your patrons
              </p>
            </Space>
            <div className={styles.panel_box}>
              <Row gutter={[16, 16]}>
                {localTiers.map((tier, i) => (
                  <Col key={i} span={8}>
                    <div
                      className={styles.panel_box}
                      style={{ padding: `1em` }}
                    >
                      <AnchorLink onClick={() => sendTier(tier)}>
                        Edit Tier
                      </AnchorLink>
                      <div className={styles.input_subheading}>
                        Published {dateString}
                      </div>
                      <div className={styles.input_subheading}>0 Members</div>
                      <br />
                      <div className={styles.input_heading}>{tier.name}</div>
                      <div className={styles.input_subheading}>
                        ${tier.price} per month
                      </div>
                      <br />
                      {tier.benefites.map((benefit) => (
                        <>
                          <div className={localStyles.tier_benefit_container}>
                            {benefit}
                          </div>
                        </>
                      ))}
                    </div>
                  </Col>
                ))}
              </Row>
              <Row>
                <Col span={8}>
                  <div className={styles.panel_box} style={{ padding: `1em` }}>
                    <AnchorLink onClick={() => sendTier(null)}>
                      Add Tier
                    </AnchorLink>
                  </div>
                </Col>
              </Row>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default TierPage;
