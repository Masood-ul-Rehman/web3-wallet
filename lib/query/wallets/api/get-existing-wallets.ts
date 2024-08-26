import axios from "axios";
const getExistingWallets = async ({ id }: { id: string }) => {
  const response = await axios.get("/api/get-wallets", {});
  const data = await response.data;
  return data;
};

export default getExistingWallets;
