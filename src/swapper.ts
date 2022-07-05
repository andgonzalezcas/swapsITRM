export class Swapper {
  swapperSdk: any
  chainId: number
  provider: any

  constructor(swapperSdk: any, provider: any, chainId: number){
    this.swapperSdk = swapperSdk,
    this.chainId = chainId
    this.provider = provider
  }

  getToken = async (tokenAddress: string, symbol:string, name:string) => {
    const token: any = await this.swapperSdk.Fetcher.fetchTokenData(this.chainId, tokenAddress, this.provider, symbol, name)
    return token
  }

  getPair = async (token1: any, token2: any) => {
    const pair: any = await this.swapperSdk.Fetcher.fetchPairData(token1, token2)
    return pair
  }
  
  getRoute = async (pair: Array<any>, fromToken: any, toToken: any) => {
    return new this.swapperSdk.Route(pair, fromToken, toToken)
  }

  getTrade = async (route: any, fromToken: any) => {
    const trade = new this.swapperSdk.Trade(
      route,
      new this.swapperSdk.TokenAmount(fromToken, '1000000000000000000'),
      this.swapperSdk.TradeType.EXACT_INPUT
    )
    return trade
  }
}