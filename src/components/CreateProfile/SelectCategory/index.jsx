import { Space, Checkbox, Row, Col, Button, Typography } from "antd";
import React, { useState } from "react";
import { categories } from "../../../JsonData/categories";
import { useHistory } from "react-router-dom";

import styles from "../index.module.css";

const { Text, Link } = Typography;

const SelectCategory = () => {
  const history = useHistory()
  const [checkBoxDisabled, setCheckBoxDisabled] = useState();
  const [selectedCategories, setSelectedCategories] = useState([]);

  const onCategoryChange = (val) => {
    if (val.length == 2) setCheckBoxDisabled(true);
    setSelectedCategories(val);
  };

  const [errorMessage, setErrorMessage] = useState(false);

  const handleContinue = () => {
    if (selectedCategories.length)
      history.push({
        pathname: "/create/adult",
        query: { categories: selectedCategories },
      });
    else setErrorMessage(true);
  };

  return (
    <>
      <div className={styles.create_box}>
        <div>
          <Space size="middle" direction="vertical">
            <div className={styles.step_container}>STEP 1 0F 5</div>
            <div className={styles.create_heading}>
              What describes your content?
            </div>
            <div className={styles.create_category_select}>
              <Checkbox.Group onChange={onCategoryChange}>
                <Row>
                  {categories.map((category, i) => (
                    <Col key={i} span={12}>
                      <Checkbox value={category} disabled={checkBoxDisabled}>
                        {category}
                      </Checkbox>
                    </Col>
                  ))}
                </Row>
              </Checkbox.Group>
            </div>

            <div>
              {errorMessage ? (
                <Text type="danger">You can pick up to two categories.</Text>
              ) : (
                <></>
              )}
            </div>

            <div style={{ paddingTop: `2em` }}>
              <Button
                type="primary"
                shape="round"
                size="large"
                onClick={handleContinue}
              >
                Continue
              </Button>
            </div>
          </Space>
        </div>
        <div className={styles.create_image_container}>
          <img
            src="https://c5.patreon.com/external/creator_onboarding/categories@2x.png"
            width="283px"
          />
        </div>
      </div>
    </>
  );
};

export default SelectCategory;
