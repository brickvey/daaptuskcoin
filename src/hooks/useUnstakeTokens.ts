import { useContractFunction, useEthers } from "@usedapp/core"
import BivenFarm from "../chain-info/contracts/BivenFarm.json"
import { utils, constants } from "ethers"
import { Contract } from "@ethersproject/contracts"
import networkMapping from "../chain-info/deployments/map.json"

/**
 * Expose { send, state } object to facilitate unstaking the user's tokens from the TokenFarm contract
 */
export const useUnstakeTokens = () => {
    const { chainId } = useEthers()

    const { abi } = BivenFarm
    const bivenFarmContractAddress = chainId ? networkMapping[String(chainId)]["BivenFarm"][0] : constants.AddressZero

    const bivenFarmInterface = new utils.Interface(abi)

    const bivenFarmContract = new Contract(
        bivenFarmContractAddress,
        bivenFarmInterface
    )

    return useContractFunction(bivenFarmContract, "unstakeTokens", {
        transactionName: "Unstake tokens",
    })
}