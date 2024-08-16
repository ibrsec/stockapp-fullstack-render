import { Box } from "@mui/material";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import BalanceIcon from "@mui/icons-material/Balance";
import { useSelector } from "react-redux";
import useStockRequest from "../../services/useStockRequest";

const Kpi = () => {
  const { purchases, sales } = useSelector((state) => state.stock);
  const { getDataApi, getAllDataGenericApi } = useStockRequest();

  const totalSales = sales
    .map((item) => item.amount)
    .reduce((sum, current) => sum + current, 0);
  const totalPurchases = purchases
    .map((item) => item.amount)
    .reduce((sum, current) => sum + current, 0);
  const profit = totalSales - totalPurchases;

  const kpiData = [
    {
      id: 1,
      variant: "Sales",
      total: totalSales.toLocaleString("tr-TR"),
      icon: <MonetizationOnIcon />,
      bgColor: "lightpink",
      color: "hotpink",
    },
    {
      id: 2,
      variant: "Profit",
      total: profit.toLocaleString("tr-TR"),
      icon: <BalanceIcon />,
      bgColor: "#D9E291",
      color: "#62304A",
    },
    {
      id: 3,
      variant: "Purchases",
      total: totalPurchases.toLocaleString("tr-TR"),
      icon: <ShoppingCartCheckoutIcon />,
      bgColor: "#32CAFA",
      color: "#9F4C38",
    },
  ];

  return (
    <Box
      display={"flex"}
      alignItems="start"
      justifyContent="center"
      gap={2}
      mt={5}
      flexWrap="wrap"
    >
      {kpiData.map((item) => (
        <Box
          key={item.id}
          display={"flex"}
          alignItems="start"
          justifyContent="center"
          gap={3}
          borderRadius={2}
          backgroundColor="primary.main"
          p={2}
          width={250}
        >
          <Box
            variant="span"
            component="span"
            sx={{
              backgroundColor: item.bgColor,
              borderRadius: "50%",
              color: item.color,
              padding: "12px",
            }}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            {item.icon}
          </Box>
          <Box>
            <Box sx={{ color: "whiteSpec.main", fontWeight: "500", textTransform:"uppercase",letterSpacing:".7px" }}>
              {item.variant}
            </Box>
            <Box  sx={{ color: "whiteSpec.main", whiteSpace: "nowrap",fontWeight:"bold",fontSize:"1.3rem" }}>
              ${item.total}
            </Box>
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default Kpi;
