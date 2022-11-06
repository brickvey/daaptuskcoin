import { useContractCall, useEthers } from "@usedapp/core"
import BivenFarm from "../chain-info/contracts/BivenFarm.json"
import { utils, BigNumber, constants } from "ethers"
import networkMapping from "../chain-info/deployments/map.json"

/**
 * Get the staking balance of a certain token by the user in our TokenFarm contract
 * @param address - The contract address of the token
 */
export const useStakingBalance = (address: string): BigNumber | undefined => {
    const { account, chainId } = useEthers()

    const { abi } = BivenFarm
    const bivenFarmContractAddress = chainId ? networkMapping[String(chainId)]["BivenFarm"][0] : constants.AddressZero

    const bivenFarmInterface = new utils.Interface(abi)

    const [stakingBalance] =
        useContractCall({
            abi: bivenFarmInterface,
            address: bivenFarmContractAddress,
            method: "stakingBalance",
            args: [address, account],
        }) ?? []

    return stakingBalance
}