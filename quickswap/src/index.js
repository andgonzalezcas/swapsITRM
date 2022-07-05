const quickswap = require('quickswap-sdk')
const ethers = require('ethers')
require('dotenv').config();

const main = async () => {
  // add alchemy integrate URL
  const alchemy = process.env.ALCHEMY_URL
  
  // define provider since ethers
  const provider = new ethers.providers.JsonRpcProvider(alchemy)
  
  const aaveAddress = '0xD6DF932A45C0f255f85145f286eA0b292B21C90B'
  const telAddress = '0xdF7837DE1F2Fa4631D716CF2502f8b230F1dcc32'
  const usdcAddress = '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174'
  const chainId = 137
  
  // do we declare the tokens
  const aave = await quickswap.Fetcher.fetchTokenData(chainId, aaveAddress, provider, 'AAVE', 'Aave (PoS)')
  const usdc = await quickswap.Fetcher.fetchTokenData(chainId, usdcAddress, provider, 'USDC', 'USD Coin (PoS)')
  const tel = await quickswap.Fetcher.fetchTokenData(chainId, telAddress, provider, 'TEL', 'Telcoin')

  // do we declare pair data
  const pair = await quickswap.Fetcher.fetchPairData(usdc, aave, provider)

  //route from aave to usdc
  const route = new quickswap.Route([pair], aave, usdc)
  console.log("1 aave =", route.midPrice.toSignificant(6), "usdc")
  console.log("1 usdc =", route.midPrice.invert().toSignificant(6), "aave")

  // double change example usdc to tel
  // const axuPair = await quickswap.Fetcher.fetchPairData(tel, aave, provider)
  // const route = new quickswap.Route([pair, axuPair], usdc, tel)
  // console.log("1 usdc =", route.midPrice.toSignificant(6), "tel")
  // console.log("1 tel =", route.midPrice.invert().toSignificant(6), "usdc")

  //trade 1 aave to usdc
  const trade = new quickswap.Trade(
    route,
    new quickswap.TokenAmount(aave, '1000000000000000000'),
    quickswap.TradeType.EXACT_INPUT
  )
  console.log(trade.executionPrice.toSignificant(6))
  console.log(trade.nextMidPrice.toSignificant(6))
}

main()