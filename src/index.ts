const quickswap = require('quickswap-sdk')
const uniswap =require('@uniswap/sdk')
const ethers = require('ethers')
require('dotenv').config();

import { Swapper } from "./swapper"

const quickswapTest = async () => {
  const alchemy = process.env.ALCHEMY_URL
  const provider = new ethers.providers.JsonRpcProvider(alchemy)
  const quickswapSdk = new Swapper(quickswap, provider, 137)

  const aave = await quickswapSdk.getToken("0xD6DF932A45C0f255f85145f286eA0b292B21C90B", "AAVE", "Aave (PoS)")
  const usdc = await quickswapSdk.getToken("0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174", "USDC", "USD Coin (PoS)")
  // const tel = await quickswap.getToken("0xdF7837DE1F2Fa4631D716CF2502f8b230F1dcc32", "TEL", "Telcoin")

  const pair = await quickswapSdk.getPair(aave, usdc)
  const route = await quickswapSdk.getRoute([pair], aave, usdc)
  const trade = await quickswapSdk.getTrade(route, aave)

  console.log("1 aave =", route.midPrice.toSignificant(6), "usdc")
  console.log("1 usdc =", route.midPrice.invert().toSignificant(6), "aave")

  console.log(trade.executionPrice.toSignificant(6))
  console.log(trade.nextMidPrice.toSignificant(6))
}

quickswapTest()

const uniswapTest = async () => {
  const uniswapSdk = new Swapper(uniswap, undefined, 1)

  const dai = await uniswapSdk.getToken("0x6B175474E89094C44Da98b954EedeAC495271d0F", "DAI", "Dai Stablecoin")
  const usdc = await uniswapSdk.getToken("0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48", "USDC", "USD Coin")

  const pair = await uniswapSdk.getPair(dai, usdc)
  const route = await uniswapSdk.getRoute([pair], dai, usdc)
  const trade = await uniswapSdk.getTrade(route, dai)

  console.log("1 dai =", route.midPrice.toSignificant(6), "usdc")
  console.log("1 usdc =", route.midPrice.invert().toSignificant(6), "dai")

  console.log(trade.executionPrice.toSignificant(6))
  console.log(trade.nextMidPrice.toSignificant(6))
}

// uniswapTest()