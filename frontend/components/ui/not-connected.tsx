import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "./button";

export default function NotConnectedCard() {
  return (
    <div>
      <div className="m-4 p-4 grid grid grid-cols-7 gap-4  ">
        <div className="col-start-3 col-span-3">
          <Card>
            <CardHeader>
              <CardTitle>Wallet Sign In Required!</CardTitle>
              <CardDescription>
                Click the Connect Wallet Button to Sign in!
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
    </div>
  );
}
