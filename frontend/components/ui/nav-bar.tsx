import { ConnectButton } from "@rainbow-me/rainbowkit";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./card";

export default function NavBar() {
  return (
    <div>
      <Card>
        <CardHeader>
          <div className=" inset-0 flex items-center justify-center text-white font-bold ">
            <p className="bg-clip-text text-transparent drop-shadow-2xl bg-gradient-to-b from-black/80 to-black/20 pointer-events-none text-5xl text-center">
              {" "}
              Choose Wallet
            </p>
          </div>
          <CardTitle>
            <nav className="grid grid-cols-1 m-2 p-2 justify-items-center">
              <ConnectButton />
            </nav>
          </CardTitle>
        </CardHeader>
      </Card>
    </div>
  );
}
