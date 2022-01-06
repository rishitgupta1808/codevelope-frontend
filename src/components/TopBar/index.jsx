import React, { useState, useRef, useEffect } from "react";
import { Affix, Input, Button, Select, Avatar} from "antd";
import { DingdingOutlined, SearchOutlined } from "@ant-design/icons";
import { styled, useTheme } from "@mui/material/styles";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import styles from "./index.module.css";
import { useHistory } from "react-router-dom";
import useDebounce from "../../utils/debounce/use-debounce";
import axios from "axios";
import {baseUrl}from "../../baseUrl";
import { getProfilesBySearch } from "../../endpoints";
import { checkIfWalletIsConnected, connectWallet } from "../../utils/login";

const { Search } = Input;
const { Option } = Select;

const drawerWidth = 240;

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-start",
}));

const TopBar = () => {
  const [container, setContainer] = useState(null);
  const [open, setOpen] = useState(false);

  const history = useHistory()

  const [search, setSearch] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const [currenAccount, setCurrentAccount] = useState("");

  const onSearch = (val) => {
    setSearch(val);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const createAccount = () => {
    const wallet_id = localStorage.getItem("wallet_id");
    if (wallet_id) history.push("/create/categories");
    else alert("First authenticate with metamask");
  };

  const searchProfiles = async (val) => {
    try {
      let profiles = await axios.get(baseUrl + getProfilesBySearch + val);

      if (profiles.data.success) return profiles.data.profiles;
      else return false;
    } catch (err) {
      console.log(" Components : Topbar : searchProfiels ");
    }
  };
  const debouncedSearchTerm = useDebounce(search, 300);

  const [searchedProfiles, setSearchedProfiles] = useState([]);

  const [children, setChildren] = useState();

  const handleProfileChange = () => {};

  useEffect(() => {
    const temp = [];

    searchedProfiles.map((profile) => {
      temp.push(
       
      );
    });

    setChildren(temp);
  }, [searchedProfiles]);

  const searchUser = (id) => {
    setSearch("");
    history.push(`/user/${id}`);
  };

  useEffect(() => {
    console.log(debouncedSearchTerm);
    if (debouncedSearchTerm) {
      setIsSearching(true);
      searchProfiles(debouncedSearchTerm).then((results) => {
        if (!results) setSearchedProfiles([]);
        else {
          setIsSearching(false);
          console.log(results);
          setSearchedProfiles(results);
        }
      });
    } else {
      setSearchedProfiles([]);
      setIsSearching(false);
    }
  }, [debouncedSearchTerm]);

  const loginWithWallet = () => {
    connectWallet(setCurrentAccount);
  };

  useEffect(() => {
    console.log(currenAccount);
    checkIfWalletIsConnected(setCurrentAccount);
  }, []);

  return (
    <>
      <Affix
        style={{
          top: 0,
          left: 0,
          width: `100%`,
          borderBottom: `1px solid #E5E3DD`,
        }}
      >
        <div className={styles.background_topbar}>
          <div className={styles.topbar_container}>
            <div className={styles.lefttopbar_container}>
              <div className={styles.topbar_content}>
                <DingdingOutlined
                  style={{
                    fontSize: "28px",
                    color: "#1990FF",
                    padding: `5px 0em`,
                  }}
                />
              </div>
              <h2 className={styles.topbar_heading}>Super Asisstant</h2>
            </div>
            <div className={styles.righttopbar_container}>
              <div
                className={styles.topbar_content}
                style={{
                  padding: `4px 0em`,
                  display: `flex`,
                  flexDirection: `column`,
                }}
              >
                <Search
                  placeholder="Search the creator"
                  value={search}
                  onChange={(e) => onSearch(e.target.value)}
                  style={{ height: `120%` }}
                />
                {searchedProfiles[0] ? (
                  <div className={styles.search_profile_dropdown}>
                    <div className={styles.search_profile_items}>
                      {searchedProfiles.map((profile, i) => (
                        <div
                          key={i}
                          className={styles.profile_list_cotainer}
                          onClick={() => searchUser(profile.wallet_id)}
                        >
                          <div style={{ marginRight: `5px` }}>
                            <Avatar src={profile.profilePhoto} />
                          </div>
                          <div className={styles.profile_desciption}>
                            <div
                              style={{ fontSize: `15px`, fontWeight: `700` }}
                            >
                              {profile.pageName}
                            </div>
                            <div
                              style={{
                                fontSize: `13px`,
                                fontWeight: `300`,
                                color: `#76736C`,
                              }}
                            >
                              {profile.contentName}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <></>
                )}
              </div>
              <div
                className={styles.topbar_content}
                style={{ padding: `5px 0em 0px 1em`, cursor: "pointer" }}
                onClick={loginWithWallet}
              >
                Log In
              </div>
              <div className={styles.topbar_content}>
                <Button
                  type=""
                  shape="round"
                  size="large"
                  onClick={createAccount}
                  style={{ backgroundColor: "#1990FF", color: "#fff" }}
                >
                  Become a Creator
                </Button>
              </div>
              <div className={styles.topbar_content}>
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  edge="end"
                  onClick={handleDrawerOpen}
                  sx={{ ...(open && { display: "none" }) }}
                >
                  <AccountBalanceWalletIcon />
                </IconButton>
              </div>
            </div>
          </div>
        </div>
      </Affix>
      <SwipeableDrawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
          },
        }}
        variant="persistent"
        anchor="right"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            <ChevronRightIcon />
          </IconButton>
        </DrawerHeader>
        <Divider />
        <div style={{ padding: `0em` }}>
          <div
            className={styles.wallet_provider_container}
            onClick={loginWithWallet}
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/MetaMask_Fox.svg/220px-MetaMask_Fox.svg.png"
              width="45px"
            />
            <div className={styles.wallet_provider_container_name}>
              Metamask
            </div>
          </div>
        </div>
      </SwipeableDrawer>
    </>
  );
};

export default TopBar;
