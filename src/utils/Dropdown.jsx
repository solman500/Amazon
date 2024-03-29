import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import { useNavigate } from "react-router-dom"; // Import useNavigate
// import { authContext } from "../Contexts/isAuth";
// import  { useContext } from "react";
// import { useSelector } from 'react-redux';
import { useContext } from "react";
import { Localization } from "../constants/localization";
import { languageContext } from "../Contexts/language";

export default function MenuPopupState({ logout, setLogin }) {
  const displayName = localStorage.getItem("displayName");
  // const currentUsers = useSelector((state) => state.currentUser.currentUser);
  // const {displayName } = useContext(authContext)
  const {language}=useContext(languageContext);

  const navigate = useNavigate();

  const handleLogout = async (popupState) => {
    await logout();
    localStorage.removeItem("token");
    localStorage.removeItem("displayName");
    localStorage.removeItem("cart");
    localStorage.removeItem("email");
    localStorage.removeItem("creatAt");
    localStorage.removeItem("uid");

    setLogin(false);
    popupState.close(); // Close the menu after logout
    navigate("/signin");
  };

  const handleCheckout = (popupState) => {
    navigate("/checkout"); // Redirect to "/checkout"
    popupState.close(); // Close the menu after redirect
  };

  const handleprofile = (popupState) => {
    navigate("/dashuser");
    popupState.close();
  };

  const buttonStyle = {
    backgroundColor: "transparent", // Set to transparent to remove the background color
    boxShadow: "none", // Optional: Remove box shadow if any
  };

  // console.log(currentUsers.displayName)
  return (
    <PopupState variant="popover" popupId="demo-popup-menu">
      {(popupState) => (
        <React.Fragment>
          <Button
            variant="contained"
            style={buttonStyle}
            {...bindTrigger(popupState)}
          >
            <h6>{language==="en"?Localization.header.hello.en:Localization.header.hello.ar},{displayName}</h6>
            {/* <h6 >hello,{currentUsers.user.displayName}</h6>   */}
          </Button>
          <Menu {...bindMenu(popupState)}>
            <MenuItem onClick={() => handleprofile(popupState)}>
              Profile
            </MenuItem>
            <MenuItem onClick={() => handleCheckout(popupState)}>
              My Checkout
            </MenuItem>
            <MenuItem onClick={() => handleLogout(popupState)}>Logout</MenuItem>
          </Menu>
        </React.Fragment>
      )}
    </PopupState>
  );
}
