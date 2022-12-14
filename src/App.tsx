import React from 'react';

import { DAppProvider, ChainId } from "@usedapp/core"
import { Header } from "./features/Header"
import { Container } from "@material-ui/core"
import { Main } from "./features/Main"

function App() {
  return (
    <DAppProvider config={{
      supportedChains: [ChainId.Kovan, ChainId.Rinkeby, ChainId.BSC, ChainId.BSCTestnet],
      notifications: {
        expirationPeriod: 1000,
        checkInterval: 1000
      }


    }}>
      <Header />
      <Container maxWidth="md">
        <div>

        </div>

        <Main />

      </Container>
    </DAppProvider>
  );
}

export default App;
