/* eslint-disable spaced-comment */
/// <reference types="react-scripts" />

import React, { useEffect, useState } from "react"
import { useEthers } from "@usedapp/core"
import helperConfig from "../helper-config.json"
import networkMapping from "../chain-info/deployments/map.json"
import { BivenFarmContract } from "./BivenFarmContract"
import { constants, ethers } from "ethers"
import brownieConfig from "../brownie-config.json"
import BIV from "../BIV.png"
import eth from "../eth.png"
import dai from "../dai.png"
import bnb from "../bnb.png"
import doge from "../doge.png"
import { YourWallet } from "./yourWallet/YourWallet"
import { makeStyles, Snackbar, Typography } from "@material-ui/core"
import { Alert } from "@material-ui/lab"

export type Token = {
    image: string
    address: string
    name: string
}

const useStyles = makeStyles((theme) => ({
    title: {
        color: theme.palette.common.white,
        textAlign: "center",
        padding: theme.spacing(4)
    }
}))

export const Main = () => {
    // show tokens value 
    // get the addresses of different tokens
    // get the balance of the users wallet 
    // send the brownie-config to our src folder
    // send build folder 
    const classes = useStyles()

    const { chainId } = useEthers()
    const networkName = chainId ? helperConfig[chainId] : "dev"
    // console.log(chainId)
    // console.log(networkName)

    const bivenTokenAddress = chainId ? networkMapping[String(chainId)]["BivenToken"][0] : constants.AddressZero
    // const wethTokenAddress = chainId ? brownieConfig["networks"][networkName]["weth_token"] : constants.AddressZero
    // const fauTokenAddress = chainId ? brownieConfig["networks"][networkName]["fau_token"] : constants.AddressZero
    const wbnbTokenAddress = chainId ? brownieConfig["networks"][networkName]["wbnb_token"] : constants.AddressZero
    const dogeTokenAddress = chainId ? brownieConfig["networks"][networkName]["doge_token"] : constants.AddressZero

    const supportedTokens: Array<Token> = [
        {
            image: BIV,
            address: bivenTokenAddress,
            name: "TSK"
        },
        // {
        // image: eth,
        // address: wethTokenAddress,
        // name: "WETH"
        // },
        // {
        //image: dai,
        //address: fauTokenAddress,
        // name: "DAI"

        // },
        {
            image: bnb,
            address: wbnbTokenAddress,
            name: "WBNB"
        },
        {
            image: doge,
            address: dogeTokenAddress,
            name: "DOGE"
        }
    ]

    const [showNetworkError, setShowNetworkError] = useState(false)

    const handleCloseNetworkError = (
        event: React.SyntheticEvent | React.MouseEvent,
        reason?: string
    ) => {
        if (reason === "clickaway") {
            return
        }

        showNetworkError && setShowNetworkError(false)
    }

    /**
     * useEthers will return a populated 'error' field when something has gone wrong.
     * We can inspect the name of this error and conditionally show a notification
     * that the user is connected to the wrong network.
     */
    useEffect(() => {
        if (Error && Error.name === "UnsupportedChainIdError") {
            !showNetworkError && setShowNetworkError(true)
        } else {
            showNetworkError && setShowNetworkError(false)
        }
    }, [Error, showNetworkError])

    return (
        <>
            <Typography
                variant="h2"
                component="h1"
                classes={{
                    root: classes.title,
                }}
            >
                Tusk Coin Farm
            </Typography>
            <YourWallet supportedTokens={supportedTokens} />
            <BivenFarmContract supportedTokens={supportedTokens} />
            <Snackbar
                open={showNetworkError}
                autoHideDuration={5000}
                onClose={handleCloseNetworkError}
            >
                <Alert onClose={handleCloseNetworkError} severity="warning">
                    You gotta connect to the Bsc-test or Bsc-main network!
                </Alert>
            </Snackbar>
        </>
    )


}