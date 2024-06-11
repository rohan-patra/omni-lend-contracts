import { Terminal } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "./alert";
import { useAccount } from "wagmi";
import { useBalance } from "wagmi";
import { useGasPrice } from "wagmi";
import { useBlock } from "wagmi";

export default function BalanceAlert() {
  const { address } = useAccount();
  const { data } = useBalance({
    address,
  });
  const { data: gasData } = useGasPrice({});
  const { data: block } = useBlock({});

  return (
    <div className="">
      <div className="">
        <Alert>
          <Terminal className="h-4 w-4" />
          <AlertTitle>Heads up!</AlertTitle>
          <AlertDescription>
            Your current balance is: {data?.formatted} {data?.symbol}
          </AlertDescription>
          <AlertDescription>
            Estimated Gas Cost is: {gasData?.toString()} GWEI
          </AlertDescription>
          <AlertDescription>
            Current Block Number: {block?.number.toString()}
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}
