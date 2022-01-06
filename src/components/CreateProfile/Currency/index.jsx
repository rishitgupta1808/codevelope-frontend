import { Space, Button, Radio, Row, Col } from "antd";
import React, { useState } from "react";
import { Link as AnchorLink } from "@mui/material";
import styles from "../index.module.css";
import { useHistory,Link } from "react-router-dom";
import { curruencies } from "../../../JsonData/currency";

const SelectCurrency = ({ router }) => {
  const [currncyVal, setCurrencyVal] = useState("US Dollars");

  const history = useHistory();

  const onCurrencyChange = (val) => {
    console.log(val);
    setCurrencyVal(val.target.value);
  };

  const handleContinue = () => {
    history.push({
      pathname: "/create/merchant",
      query: { ...router.query, currency: currncyVal },
    });
  };

  return (
    <>
      <div className={styles.create_box}>
        <div>
          <Space size="middle" direction="vertical">
            <div className={styles.step_container}>STEP 3 0F 5</div>
            <div className={styles.create_heading}>Pick your currency</div>
            <div style={{ fontSize: `14px`, color: `#76736C` }}>
              The currency you choose here is what you will price your
              membership and be paid in. Your patrons can pay in any of these
              currencies. We’ll automatically convert your tier prices to show
              potential patrons their native currency on your page, if it is one
              of these currencies. If not, we will show prices in your default
              currency.
            </div>
            <div className={styles.create_category_select}>
              <Radio.Group onChange={onCurrencyChange} value={currncyVal}>
                <Row>
                  {curruencies.map((curr, i) => (
                    <Col key={i} span={12}>
                      <Radio size="large" value={curr} name="currency">
                        {curr}
                      </Radio>
                    </Col>
                  ))}
                </Row>
              </Radio.Group>
            </div>
            <div style={{ paddingTop: `2em` }}>
              <Space size="large">
                <Link to="/create/adult">Back</Link>
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
        <div className={styles.create_image_container}></div>
      </div>
    </>
  );
};

export default SelectCurrency;
