import React from "react";
import { Avatar } from "rsuite";
import BLUR from "../images/tokens/BLUR.svg";
import bNEO from "../images/tokens/bNEO.svg";
import BUSD from "../images/tokens/BUSD.svg";
import USD from "../images/tokens/USD.svg";
import ETH from "../images/tokens/ETH.svg";
import GMX from "../images/tokens/GMX.svg";
import STEVMOS from "../images/tokens/stEVMOS.svg";
import LUNA from "../images/tokens/LUNA.svg";
import RATOM from "../images/tokens/rATOM.svg";
import STRD from "../images/tokens/STRD.svg";
import EVMOS from "../images/tokens/EVMOS.svg";
import IBCX from "../images/tokens/IBCX.svg";
import IRIS from "../images/tokens/IRIS.svg";
import ampLUNA from "../images/tokens/ampLUNA.svg";
import KUJI from "../images/tokens/KUJI.svg";
import STOSMO from "../images/tokens/stOSMO.svg";
import USDC from "../images/tokens/USDC.svg";
import axlUSDC from "../images/tokens/axlUSDC.svg";
import ATOM from "../images/tokens/ATOM.svg";
import STATOM from "../images/tokens/stATOM.svg";
import OSMO from "../images/tokens/OSMO.svg";
import rSWTH from "../images/tokens/rSWTH.svg";
import STLUNA from "../images/tokens/stLUNA.svg";
import LSI from "../images/tokens/LSI.svg";
import OKB from "../images/tokens/OKB.svg";
import OKT from "../images/tokens/OKT.svg";
import SWTH from "../images/tokens/SWTH.svg";
import USC from "../images/tokens/USC.svg";
import WBTC from "../images/tokens/WBTC.svg";
import wstETH from "../images/tokens/wstETH.svg";
import YieldUSD from "../images/tokens/YieldUSD.svg";
import ZIL from "../images/tokens/ZIL.svg";
const valueMap = {
  BLUR,
  bNEO,
  BUSD,
  USD,
  ETH,
  GMX,
  STEVMOS,
  LUNA,
  RATOM,
  STRD,
  EVMOS,
  IBCX,
  IRIS,
  ampLUNA,
  KUJI,
  STOSMO,
  USDC,
  axlUSDC,
  ATOM,
  STATOM,
  OSMO,
  rSWTH,
  STLUNA,
  LSI,
  OKB,
  OKT,
  SWTH,
  USC,
  WBTC,
  wstETH,
  YieldUSD,
  ZIL,
};

const ImageTokenGenerate = ({ value }) => {
  return <Avatar size="xs" src={valueMap[value] ?? ""} circle />;
};

export default ImageTokenGenerate;
