import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount, useBalance, useSendTransaction } from "wagmi";
import { useState, useEffect } from "react";
import { formatEther, parseEther } from "ethers";
import { Card } from "../components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "../components/ui/tabs";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { Progress } from "../components/ui/progress";
import Link from "next/link";

// Register chart components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LINEA_ETH_ADDRESS = "0xAF8D1c9a8A87cEeD5e3a62C0f09AEE252A7d98EB";
const SEPOLIA_ETH_ADDRESS = "0xYourSepoliaEthAddress";

const apys = {
  LineaETH: 3.5,
  SepoliaETH: 2.8,
  ETH: 4.0,
  LINK: 5.0,
  DAI: 2.5,
  PYUSD: 3.0,
  BTC: 4.5,
  USDT: 3.2,
  USDC: 3.1,
  BNB: 5.5,
  DOT: 4.2,
  ADA: 3.8,
  MATIC: 4.0,
  AVAX: 5.0,
  UNI: 3.7,
};

const getRandomData = (min, max, count) => {
  return Array.from({ length: count }, () =>
    (Math.random() * (max - min) + min).toFixed(2)
  );
};

const chartData = (label) => ({
  labels: ["May 12", "May 19", "May 26", "Jun 2", "Jun 9"],
  datasets: [
    {
      label: `${label} APY`,
      data: getRandomData(1.0, 6.0, 5),
      borderColor: "rgba(75, 192, 192, 1)",
      borderWidth: 1,
      fill: false,
    },
  ],
});

const CurrencySelect = ({ value, onChange }) => (
  <Select value={value} onValueChange={onChange}>
    <SelectTrigger>
      <SelectValue placeholder="Select currency" />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="LineaETH">LineaETH</SelectItem>
      <SelectItem value="SepoliaETH">SepoliaETH</SelectItem>
      <SelectItem value="ETH">ETH</SelectItem>
      <SelectItem value="LINK">LINK</SelectItem>
      <SelectItem value="DAI">DAI</SelectItem>
      <SelectItem value="PYUSD">PYUSD</SelectItem>
      <SelectItem value="BTC">BTC</SelectItem>
      <SelectItem value="USDT">USDT</SelectItem>
      <SelectItem value="USDC">USDC</SelectItem>
      <SelectItem value="BNB">BNB</SelectItem>
      <SelectItem value="DOT">DOT</SelectItem>
      <SelectItem value="ADA">ADA</SelectItem>
      <SelectItem value="MATIC">MATIC</SelectItem>
      <SelectItem value="AVAX">AVAX</SelectItem>
      <SelectItem value="UNI">UNI</SelectItem>
    </SelectContent>
  </Select>
);

const AmountInput = ({ value, onChange }) => (
  <Input
    type="number"
    value={value}
    onChange={onChange}
    placeholder="Enter amount"
  />
);

const Home = () => {
  const { address, isConnected } = useAccount();
  const [currency, setCurrency] = useState("LineaETH");
  const [amount, setAmount] = useState("");
  const [borrowableAmount, setBorrowableAmount] = useState(BigInt(0));
  const [progress, setProgress] = useState(0);
  const [statusMessage, setStatusMessage] = useState("");
  const [chartDataBorrow, setChartDataBorrow] = useState(chartData("Borrow"));
  const [chartDataSupply, setChartDataSupply] = useState(chartData("Supply"));
  const [showBorrowTransaction, setShowBorrowTransaction] = useState(false);

  const { data: lineaEthBalance } = useBalance({
    address: address,
    token: LINEA_ETH_ADDRESS,
  });

  const { data: sepoliaEthBalance } = useBalance({
    address: address,
    token: SEPOLIA_ETH_ADDRESS,
  });

  const { data: suppliedLineaEthBalance } = useBalance({
    address: LINEA_ETH_ADDRESS,
  });

  const { data: suppliedSepoliaEthBalance } = useBalance({
    address: SEPOLIA_ETH_ADDRESS,
  });

  const { sendTransaction } = useSendTransaction();

  useEffect(() => {
    let suppliedBalance;
    suppliedBalance = suppliedLineaEthBalance?.value || BigInt(0);
    setBorrowableAmount(
      ((suppliedBalance ? suppliedBalance : BigInt(0)) * BigInt(80)) /
        BigInt(100)
    );
  }, [currency, suppliedLineaEthBalance, suppliedSepoliaEthBalance]);

  useEffect(() => {
    setChartDataSupply(chartData("Supply"));
    setChartDataBorrow(chartData("Borrow"));
  }, [currency]);

  const handleTransaction = () => {
    if (currency === "LineaETH") {
      sendTransaction({
        to: LINEA_ETH_ADDRESS,
        value: parseEther(amount),
      });
      startProgress();
    } else if (currency === "SepoliaETH") {
      console.log("Borrowing SepoliaETH");
      startBorrowProgress();
    }
  };

  const startProgress = () => {
    setProgress(0);
    setStatusMessage("deposit spoke");

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setStatusMessage("Transaction complete");
          return 100;
        }
        if (prev >= 66) {
          setStatusMessage("confirm deposit");
        } else if (prev >= 33) {
          setStatusMessage("get deposit sequence");
        }
        return prev + 10;
      });
    }, 1000);
  };

  const startBorrowProgress = () => {
    setProgress(0);
    setStatusMessage("borrow spoke");

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setStatusMessage("Transaction complete");
          setShowBorrowTransaction(true);
          return 100;
        }
        if (prev >= 80) {
          setStatusMessage("redeem borrow");
        } else if (prev >= 60) {
          setStatusMessage("get borrow redeem sequence");
        } else if (prev >= 40) {
          setStatusMessage("confirm borrow");
        } else if (prev >= 20) {
          setStatusMessage("get borrow sequence");
        }
        return prev + 5;
      });
    }, 1000);
  };

  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <ConnectButton />
      </div>

      {isConnected ? (
        <Card className="p-8">
          <div className="flex gap-x-80	">
            <div>
              <h2 className="text-2xl font-bold mb-4">Borrow/Supply</h2>

              <Tabs defaultValue="supply" className="w-[400px] mb-4">
                <TabsList>
                  <TabsTrigger value="supply">Supply</TabsTrigger>
                  <TabsTrigger value="borrow">Borrow</TabsTrigger>
                </TabsList>
                <br />
                <TabsContent value="supply">
                  <div className="mb-4">
                    <CurrencySelect value={currency} onChange={setCurrency} />
                  </div>

                  <div className="mb-4">
                    <AmountInput
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                    />
                  </div>

                  <div className="mb-4">
                    <p className="bg-slate-900 p-2 rounded bold mb-2 flex justify-between">
                      <span className="font-bold">APY</span>
                      <span>{apys[currency]}%</span>
                    </p>
                    <p className="bg-slate-900 p-2 rounded bold mb-2 flex justify-between">
                      <span className="font-bold">Supplied</span>
                      <span>
                        {formatEther(
                          suppliedLineaEthBalance
                            ? suppliedLineaEthBalance.value
                            : BigInt(0)
                        )}{" "}
                        LineaETH
                      </span>
                    </p>
                    <p className="bg-slate-900 p-2 rounded bold flex justify-between">
                      <span className="font-bold">Borrowable</span>
                      <span>
                        {formatEther(borrowableAmount)} {currency}
                      </span>
                    </p>
                  </div>

                  <Button onClick={handleTransaction}>Supply</Button>
                </TabsContent>
                <TabsContent value="borrow">
                  <div className="mb-4">
                    <CurrencySelect value={currency} onChange={setCurrency} />
                  </div>

                  <div className="mb-4">
                    <AmountInput
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                    />
                  </div>

                  <div className="mb-4">
                    <p className="bg-slate-900 p-2 rounded bold mb-2 flex justify-between">
                      <span className="font-bold">APY</span>
                      <span>{apys[currency]}%</span>
                    </p>
                    <p className="bg-slate-900 p-2 rounded bold flex justify-between">
                      <span className="font-bold">Borrowable</span>
                      <span>
                        {formatEther(borrowableAmount)} {currency}
                      </span>
                    </p>
                  </div>

                  <Button onClick={handleTransaction}>Borrow</Button>
                </TabsContent>
              </Tabs>
              {progress > 0 && (
                <div className="mt-4">
                  <Progress value={progress} />
                  <p className="mt-2 text-center">{statusMessage}</p>
                </div>
              )}
              {showBorrowTransaction && (
                <div className="mt-4">
                  <Link href="https://sepolia.etherscan.io/tx/0x7b10eb992351dce405f75d7347549f6bf114c8af541a23c2e47a3a5ba095c824">
                    View transaction
                  </Link>
                </div>
              )}
            </div>

            <div className="bg-slate-900 p-12 rounded-xl">
              {/* Charts */}
              <div>
                <div>
                  <h3 className="text-xl font-bold mb-4">Supply APY</h3>
                  <div className="w-[400px] h-[200px]">
                    <Line data={chartDataSupply} />
                  </div>
                </div>
                <br />
                <br />
                <div>
                  <h3 className="text-xl font-bold mb-4">Borrow APY</h3>
                  <div className="w-[400px] h-[200px]">
                    <Line data={chartDataBorrow} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      ) : (
        <p>Please connect your wallet</p>
      )}
    </div>
  );
};

export default Home;
