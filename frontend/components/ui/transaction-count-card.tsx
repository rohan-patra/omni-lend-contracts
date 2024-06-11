import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./card";
import { useAccount, useWriteContract } from "wagmi";

import { useTransactionCount } from "wagmi";
import { Button } from "./button";

export default function TransactionCard() {
  const { address } = useAccount();
  const { data } = useTransactionCount({
    address,
  });

  return (
    <div className="">
      <div className="">
        <Card>
          <CardHeader>
            <CardTitle>
              Transactions from this Wallet: {data?.toString() ?? "0"}
            </CardTitle>
            <CardDescription>
              {(() => {
                switch (true) {
                  case data?.toString() === "0":
                    return (
                      <p>
                        There are no transactions from this wallet. Try getting
                        a Gumball!
                      </p>
                    );
                  case BigInt(data?.toString() ?? 0) > 5:
                    return (
                      <div>
                        <p>
                          More than 5 Transactions?! Get lit with the gif yuhhh
                        </p>
                        <img
                          src="https://cdn.dribbble.com/users/1235500/screenshots/3568653/media/9a1185cc272f6b44d96d9e8ca4843e67.gif"
                          alt="This is a gif of a gumball machine"
                        />
                      </div>
                    );
                  default:
                    return (
                      <p>
                        Look at you! Keep interacting with the Machine to see a
                        surprise!
                      </p>
                    );
                }
              })()}
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
}
