import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./card";
export default function IncorrectChain({ chain }: { chain: string }) {
  return (
    <div className="m-4 p-4 grid grid grid-cols-7 gap-4  ">
      <div className="col-start-3 col-span-3">
        <Card>
          <CardHeader>
            <CardTitle>{chain} not supported</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Please switch chain to Sepolia Test Net</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
