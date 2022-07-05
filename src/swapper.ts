import { Token, Pair, Route } from "@uniswap/sdk"

export class Swapper {
  swapperSdk: any
  provider: any
  chainId: number

  constructor(swapperSdk: any, provider: any, chainId: number){
    this.swapperSdk = swapperSdk,
    this.chainId = chainId
    this.provider = provider
  }

  getToken = async (tokenAddress: string, symbol:string, name:string) => {
    const token: Token = await this.swapperSdk.Fetcher.fetchTokenData(this.chainId, tokenAddress, this.provider, symbol, name)
    return token
  }

  getPair = async (token1: Token, token2: Token) => {
    const pair: Pair = await this.swapperSdk.Fetcher.fetchPairData(token1, token2)
    return pair
  }
  
  getRoute = async (pair: Array<Pair>, fromToken: Token, toToken: Token) => {
    return new this.swapperSdk.Route(pair, fromToken, toToken)
  }

  getTrade = async (route: Route, fromToken: Token) => {
    const trade = new this.swapperSdk.Trade(
      route,
      new this.swapperSdk.TokenAmount(fromToken, `${10 ** fromToken.decimals}`),
      this.swapperSdk.TradeType.EXACT_INPUT
    )
    return trade
  }
}