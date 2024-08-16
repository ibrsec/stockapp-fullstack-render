import InboxIcon from "@mui/icons-material/MoveToInbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import Divider from "@mui/material/Divider";
import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import SellIcon from "@mui/icons-material/Sell";
import StoreIcon from "@mui/icons-material/Store";
import SmartButtonIcon from "@mui/icons-material/SmartButton";
import InventoryIcon from "@mui/icons-material/Inventory";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

let icons = [
  {
    iconName: <SpaceDashboardIcon />,
    title: "Dashboard",
    path: "/stock",
    active: true,
  },
  {
    iconName: <ShoppingBasketIcon />,
    title: "Purchases",
    path: "/stock/purchases",
    active: false,
  },
  {
    iconName: <SellIcon />,
    title: "Sales",
    path: "/stock/sales",
    active: false,
  },
  {
    iconName: <StoreIcon />,
    title: "Firms",
    path: "/stock/firms",
    active: false,
  },
  {
    iconName: <SmartButtonIcon />,
    title: "Brands",
    path: "/stock/brands",
    active: false,
  },
  {
    iconName: <InventoryIcon />,
    title: "Products",
    path: "/stock/products",
    active: false,
  },
];

const MenuListComp = () => {
  const navigate = useNavigate();
  const [activeList, setActiveList] = useState(localStorage.getItem("activeMenu") || "Dashboard");
  icons.map((item) => {
    if (item.title === activeList) {
      return { ...item, active: true };
    } else {
      return { ...item, active: false };
    }
  });

  const handleClickItem = (item) => {
    navigate(item.path);
    setActiveList(item.title);
    localStorage.setItem("activeMenu",item.title)
  };

  const listStyle = {
    backgroundColor:"primary.dark",
    color: "whiteSpec.main",
    "& .MuiSvgIcon-root": { color: "whiteSpec.main" },
    "& .MuiListItemButton-root:hover": { color: "blueSpec.main" },
    "& .MuiListItemButton-root:hover .MuiSvgIcon-root": {
      color: "greenSpec.main",
    },
  };

  const activeListStyle = {
    backgroundColor:"primary.main",
    color: "blueSpec.main",
    "& .MuiSvgIcon-root": { color: "greenSpec.main" },
    "& .MuiListItemButton-root:hover": { color: "whiteSpec.main" },
    "& .MuiListItemButton-root:hover .MuiSvgIcon-root": {
      color: "whiteSpec.main",
    },
  };
  return (
    <>
      <List>
        {icons.map((item, index) => (
          <ListItem
            key={index}
            disablePadding
            onClick={() => handleClickItem(item)}
            sx={item.title === activeList ? activeListStyle : listStyle}
          >
            <ListItemButton focusVisibleClassName="focus-visible-aaa">
              <ListItemIcon>{item.iconName}</ListItemIcon>
              <ListItemText primary={item.title} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default MenuListComp;
