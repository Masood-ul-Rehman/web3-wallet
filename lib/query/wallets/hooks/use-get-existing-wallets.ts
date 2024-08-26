import { useQuery } from "react-query";
import getExistingWallets from "../api/get-existing-wallets";

export const useGetExistingWallets = (enabled: boolean, userId: string) => {
  const { data, isLoading } = useQuery({
    queryKey: ["get-existing-wallets"],
    enabled: enabled,
    queryFn: () => getExistingWallets({ id: userId }),
  });

  return { data, isLoading };
};
