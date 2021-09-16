import { getDefaultProvider, getNetwork } from "@ethersproject/providers";
import { WETH } from "entities";
import { Fetcher } from "fetcher";
import { ChainId } from ".";

Fetcher.fetchTokenData(ChainId.ETHEREUM_MAINNET, "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48")
    .then(token => {
        Fetcher.fetchPairData(WETH[ChainId.ETHEREUM_MAINNET], token, getDefaultProvider(getNetwork(ChainId.ETHEREUM_MAINNET)), "0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f")
            .then(pair => console.log(JSON.stringify(pair)))
    })