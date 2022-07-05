import {
  ChainId,
  Token,
  Fetcher,
  WETH,
  Pair,
  Route,
  Trade,
  TokenAmount,
  TradeType
} from '@uniswap/sdk'

let DAI: Token
let USDC: Token

const chainId = ChainId.MAINNET

const daiTokenData = {
  chainId,
  tokenAddress: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
  symbol: 'DAI',
  name: 'Dai Stablecoin'
}

const usdcTokenData = {
  chainId,
  tokenAddress: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
  symbol: 'USDC',
  name: 'USD Coin'
}

// const daiTokenData = {
//   chainI,
//   tokenAddress: '0xc7AD46e0b8a400Bb3C915120d284AafbA8fc4735',
//   symbol: 'DAI',
//   name: 'Dai Stablecoin'
// }

const getToken = async (chainId: number, tokenAddress: string, symbol:string, name:string) => {
  const token: Token = await Fetcher.fetchTokenData(chainId, tokenAddress, undefined, symbol, name)
  return token
}

const getPair = async (token1: Token, token2: Token) => {
  const pair:Pair = await Fetcher.fetchPairData(token1, token2)
  return pair
}

const getMidPrice = async (pair: Array<Pair>, baseToken: Token) => {
  return new Route(pair, baseToken)
}

const main = async () => {
  DAI = await getToken(daiTokenData.chainId, daiTokenData.tokenAddress, daiTokenData.symbol, daiTokenData.name)
  USDC = await getToken(usdcTokenData.chainId, usdcTokenData.tokenAddress, usdcTokenData.symbol, usdcTokenData.name)

  const pairDaiWeth:Pair = await getPair(DAI, WETH[DAI.chainId])
  const route:Route = await getMidPrice([pairDaiWeth], WETH[DAI.chainId])
  const trade = new Trade(route, new TokenAmount(WETH[DAI.chainId], '1000000000000000000'), TradeType.EXACT_INPUT)

  // console.log(trade.executionPrice.toSignificant(6))
  // console.log(trade.nextMidPrice.toSignificant(6))

  console.log(new Date())
  console.log("Price promedio de 1 ETH: " + route.midPrice.toSignificant(6) + ' DAI($)')
}

main()