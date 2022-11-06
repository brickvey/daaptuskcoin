import { useEffect, useState } from "react"
import { useEthers, useContractFunction } from "@usedapp/core"
import { constants, utils } from "ethers"
import { Contract } from "@ethersproject/contracts"
import ERC20 from "../chain-info/contracts/MockERC20.json"
import BivenFarm from "../chain-info/contracts/BivenFarm.json"
import networkMapping from "../chain-info/deployments/map.json"


export const useStakeTokens = (tokenAddress: string) => {
    // approve
    const { chainId } = useEthers()
    const { abi } = BivenFarm
    const bivenFarmContractAddress = chainId ? networkMapping[String(chainId)]["BivenFarm"][0] : constants.AddressZero

    const bivenFarmInterface = new utils.Interface(abi)
    const bivenFarmContract = new Contract(bivenFarmContractAddress, bivenFarmInterface)

    const { send: stakeTokensSend, state: stakeTokensState } = useContractFunction(bivenFarmContract, "stakeTokens", { transactionName: "Stake Tokens" })




    const erc20Interface = new utils.Interface(ERC20.abi)

    const tokenContract = new Contract(tokenAddress, erc20Interface)

    const { send: approveErc20Send, state: approveErc20State } =
        useContractFunction(tokenContract, "approve", {
            transactionName: "Approve ERC20 transfer",
        })

    const [amountToStake, setAmountToStake] = useState("0")

    useEffect(() => {
        if (approveErc20State.status === "Success") {
            stakeTokensSend(amountToStake, tokenAddress)
        }
        // the dependency arry
        // the code inside the useEffect anytime
        // anything in this list changes
        // if you want something to run when the component first runs
        // you just have a blank list
    }, [approveErc20State, amountToStake, tokenAddress]) // eslint-disable-line react-hooks/exhaustive-deps

    const send = (amount: string) => {
        setAmountToStake(amount)
        return approveErc20Send(bivenFarmContractAddress, amount)
    }

    const [state, setState] = useState(approveErc20State)

    useEffect(() => {
        if (approveErc20State.status === "Success") {
            setState(stakeTokensState)
        } else {
            setState(approveErc20State)
        }
    }, [approveErc20State, stakeTokensState])

    return { send, state }
}