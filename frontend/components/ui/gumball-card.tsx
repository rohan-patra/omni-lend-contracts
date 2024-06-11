import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./card";
import { Button } from "./button";
import { useReadContract } from "wagmi";
import { useWriteContract } from "wagmi";
import { GumballForm } from "./gumball-form";

const abi = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_gumballinit",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_gumballadd",
        type: "uint256",
      },
    ],
    name: "addFreshGumballs",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getGumball",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getNumberOfGumballs",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;

export default function GumballCard() {
  const { writeContract } = useWriteContract();
  async function getAGumball() {
    await writeContract({
      address: "0x6df511640a9ed4615A4679246E561f711FABDD61",
      abi,
      functionName: "getGumball",
      args: [],
    });
  }

  function ViewingGumball() {
    const { data } = useReadContract({
      abi,
      address: "0x6df511640a9ed4615A4679246E561f711FABDD61",
      functionName: "getNumberOfGumballs",
    });
    return data;
  }

  return (
    <div className="">
      <div className="col ">
        <Card>
          <CardHeader>
            <CardTitle>Gumball Machine</CardTitle>
            <CardDescription>
              <p>Number of Gumballs: {ViewingGumball()?.toString()}</p>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="p-2" onClick={() => getAGumball()}>
              Get a Gumball{" "}
            </Button>
          </CardContent>
          <CardFooter>
            <GumballForm />
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
