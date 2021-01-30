import { Avatar, Badge, Button, makeStyles, Popover } from "@material-ui/core";
import {
  Apps,
  CameraAltOutlined,
  Menu,
  Notifications,
  PersonAddOutlined,
  Search,
  VideoCall,
} from "@material-ui/icons";
import React from "react";
import logo from "../../assets/logo1.png";
import { useAppContext } from "../../context/appContext";
import { auth } from "../../lib/firebase";
import "./styles.css";

const useStyles = makeStyles((theme) => ({
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));

const Header = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const classes = useStyles();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const { currentUser, setShowUploadVideo } = useAppContext();
  return (
    <div className="header">
      <div className="header__left">
        <Menu className="header__menuicon" />
        <img className="header__logo" src={logo} alt="Youtube" />
      </div>

      <form className="header__center">
        <input className="header__input" placeholder="Search" />
        <Button className="header__btn">
          <Search className="header__searchIcon" />
        </Button>
      </form>

      <div className="header__right">
        <VideoCall onClick={() => setShowUploadVideo(true)} />
        <Apps />
        <Notifications />
        <Avatar onClick={handleClick} />

        <Popover
          open={open}
          id={id}
          onClose={handleClose}
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "top",
          }}
        >
          <div className="home__popoverContainer">
            <div className="home__popover__top">
              <Badge
                overlap="circle"
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                badgeContent={
                  <div className="home__badge">
                    <CameraAltOutlined className="home__camera" />
                  </div>
                }
              >
                <Avatar className={classes.large} />
              </Badge>

              <div className="home__text">
                <div className="home__displayName">
                  {currentUser?.displayName}
                </div>
                <div className="home__mail">{currentUser?.email}</div>
              </div>
              <div className="home__btn">Manage your google account</div>
            </div>

            <div className="home__popover__btm">
              <div className="home__addBtn">
                <PersonAddOutlined className="home__addIcon" />
                <p>Add another account</p>
              </div>

              <Button
                onClick={() => auth.signOut()}
                variant="outlined"
                className="home__signOut"
              >
                Sign Out
              </Button>

              <div className="home__popover__footer">
                <p>Privacy Policy</p>
                <span>•</span>
                <p>Terms of service</p>
              </div>
            </div>
          </div>
        </Popover>
      </div>
    </div>
  );
};

export default Header;
