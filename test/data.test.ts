import { getDefaultProvider, getNetwork, JsonRpcProvider } from '@ethersproject/providers'
import { ChainId, Fetcher, WETH } from '../src'
import { AVALANCHE_PANGOLIN_FACTORY_ADDRESS, AVALANCHE_PANGOLIN_INIT_CODE_HASH_CACHE, BSC_PANCAKESWAP_FACTORY_ADDRESS, BSC_PANCAKESWAP_INIT_CODE_HASH_CACHE, BSC_SAFESWAP_FACTORY_ADDRESS, BSC_SAFESWAP_INIT_CODE_HASH_CACHE, ETHEREUM_SUSHISWAP_FACTORY_ADDRESS, ETHEREUM_SUSHISWAP_INIT_CODE_HASH_CACHE, ETHEREUM_UNISWAP_FACTORY_ADDRESS, ETHEREUM_UNISWAP_INIT_CODE_HASH_CACHE } from "../src/constants"

describe('data', () => {
  test('Pair Uniswap', async () => {
    const provider = getDefaultProvider(getNetwork(ChainId.ETHEREUM_MAINNET))
    const token = await Fetcher.fetchTokenData(ChainId.ETHEREUM_MAINNET, "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48") //USDC
    const pair = await Fetcher.fetchPairData(WETH[ChainId.ETHEREUM_MAINNET], token, provider, ETHEREUM_UNISWAP_FACTORY_ADDRESS[ChainId.ETHEREUM_MAINNET], ETHEREUM_UNISWAP_INIT_CODE_HASH_CACHE)
    expect(pair.liquidityToken.address).toEqual('0xB4e16d0168e52d35CaCD2c6185b44281Ec28C9Dc')
  }, 30000)

  test('Pair Sushiswap', async () => {
    const provider = getDefaultProvider(getNetwork(ChainId.ETHEREUM_MAINNET))
    const token = await Fetcher.fetchTokenData(ChainId.ETHEREUM_MAINNET, "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48") //USDC
    const pair = await Fetcher.fetchPairData(WETH[ChainId.ETHEREUM_MAINNET], token, provider, ETHEREUM_SUSHISWAP_FACTORY_ADDRESS[ChainId.ETHEREUM_MAINNET], ETHEREUM_SUSHISWAP_INIT_CODE_HASH_CACHE)
    expect(pair.liquidityToken.address).toEqual('0x397FF1542f962076d0BFE58eA045FfA2d347ACa0')
  }, 30000)

  test('Pair Pangolin', async () => {
    const provider = new JsonRpcProvider("https://api.avax.network/ext/bc/C/rpc")
    const token = await Fetcher.fetchTokenData(ChainId.AVALANCHE_MAINNET, "0x49D5c2BdFfac6CE2BFdB6640F4F80f226bc10bAB", provider) //WETH.e
    const pair = await Fetcher.fetchPairData(WETH[ChainId.AVALANCHE_MAINNET], token, provider, AVALANCHE_PANGOLIN_FACTORY_ADDRESS[ChainId.AVALANCHE_MAINNET], AVALANCHE_PANGOLIN_INIT_CODE_HASH_CACHE)
    expect(pair.liquidityToken.address).toEqual('0x7c05d54fc5CB6e4Ad87c6f5db3b807C94bB89c52')
  }, 30000)

  test('Pair PancakeSwap', async () => {
    const provider = new JsonRpcProvider("https://bsc-dataseed.binance.org/")
    const token = await Fetcher.fetchTokenData(ChainId.BSC_MAINNET, "0xe9e7cea3dedca5984780bafc599bd69add087d56", provider) //BUSD
    const pair = await Fetcher.fetchPairData(WETH[ChainId.BSC_MAINNET], token, provider, BSC_PANCAKESWAP_FACTORY_ADDRESS[ChainId.BSC_MAINNET], BSC_PANCAKESWAP_INIT_CODE_HASH_CACHE)
    expect(pair.liquidityToken.address).toEqual('0x58F876857a02D6762E0101bb5C46A8c1ED44Dc16')
  }, 30000)

  test('Pair SafeSwap', async () => {
    const provider = new JsonRpcProvider("https://bsc-dataseed.binance.org/")
    const token = await Fetcher.fetchTokenData(ChainId.BSC_MAINNET, "0xb492cfb1b28cd49e4a18716b5d1b4d74c9039612", provider) //AZT
    const token2 = await Fetcher.fetchTokenData(ChainId.BSC_MAINNET, "0x1c94b28d00504670eff8253f62fd201fa998b758", provider) //sBNB
    const pair = await Fetcher.fetchPairData(token2, token, provider, BSC_SAFESWAP_FACTORY_ADDRESS[ChainId.BSC_MAINNET], BSC_SAFESWAP_INIT_CODE_HASH_CACHE)
    expect(pair.liquidityToken.address).toEqual('0x26F38A9D355f92cF024E00d067DfEB641AA6f5a9')
  }, 30000)
})
