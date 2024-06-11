import { TransactionBlock } from "@mysten/sui.js";

const recipient_chain =  22; // Aptos ID
const recipient = "some address";
const relayerFee = 0; // 0 for now
const nonce = 0; // 0 for now
const clock = `0x0000000000000000000000000000000000000000000000000000000000000006`; // object ID
const whFee = 100000000000000; // 0.0001 SUI
const tokenBridgeState = "0x6fb10cdb7aa299e9a4308752dadecb049ff55a892de92992a1edbd7912b3d6da";
const wormholeState = "0x31358d198147da50db32eda2562951d53973a0c0ad5ed738e9b17d88b213d790";
const coinInfo = "0x1875a6f35f7258517d100837ba4dc7cc49c6f29c53d21b7f2315af26abb0dce4";
const coinType = "0x2::sui::SUI"; // TODO: support other coin types rather than just SUI
const amount = 1000000000000000; // 1 SUI

const txb = new TransactionBlock();

const [coinMsgFee, coinTransferAmount] = txb.splitCoins(txb.gas, [txb.pure(whFee), txb.pure(amount)]); // take some number of coins from the gas coin for wh fee and amount
  
  txb.moveCall({
    target: "0x11aaa795a873c9cefa2257b8d34eb29d5521d84878dbbd6403e244e16183a9bc::scripts::bridge_wormhole",
    arguments: [
      coinTransferAmount,
      txb.pure(recipient_chain),
      txb.pure(recipient),
      txb.pure(relayerFee),
      txb.pure(nonce),
      txb.object(clock),
      coinMsgFee,
      txb.object(tokenBridgeState),
      txb.object(wormholeState),
      txb.object(coinInfo)
    ],
    typeArguments: [
      coinType
    ]
  })
