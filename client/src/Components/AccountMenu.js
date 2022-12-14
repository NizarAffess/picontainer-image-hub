import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
// import ListItemIcon from "@mui/material/ListItemIcon";
// import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
// import Logout from "@mui/icons-material/Logout";
import Divider from "@mui/material/Divider";
import { Link } from "react-router-dom";
const AccountMenu = (props) => {
  return (
    <Menu
      anchorEl={props.anchorEl}
      id="account-menu"
      open={props.open}
      onClose={props.handleClose}
      onClick={props.handleClose}
      sx={{ ml: "12px" }}
      PaperProps={{
        elevation: 0,
        sx: {
          overflow: "visible",
          filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
          mt: 1.5,
          "& .MuiAvatar-root": {
            width: 32,
            height: 32,
            ml: -0.5,
            mr: 1,
          },
          "&:before": {
            content: '""',
            display: "block",
            position: "absolute",
            top: 0,
            right: 30,
            width: 10,
            height: 10,
            bgcolor: "background.paper",
            transform: "translateY(-50%) rotate(45deg)",
            zIndex: 0,
          },
        },
      }}
      transformOrigin={{ horizontal: "right", vertical: "top" }}
      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
    >
      <Link className="account-link" to="/user/profile">
        <MenuItem>
          <Avatar src={props.photo} /> Profile
        </MenuItem>
      </Link>
      <Link className="account-link" to="/user/account">
        <MenuItem>
          {/* <AdminPanelSettingsIcon /> */}
          <Avatar /> My account
        </MenuItem>
      </Link>
      <Divider />
      <Link className="account-link" to="/user/saved-items">
        <MenuItem>
          {/* <ListItemIcon>
          <BookmarkBorderIcon fontSize="small" />
        </ListItemIcon> */}
          Saved images
        </MenuItem>
      </Link>
      <MenuItem onClick={props.handleLogout}>
        {/* <ListItemIcon>
          <Logout fontSize="small" />
        </ListItemIcon> */}
        Logout
      </MenuItem>
    </Menu>
  );
};

export default AccountMenu;
