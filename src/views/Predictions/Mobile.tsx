import { memo } from 'react'
import { ethers } from 'ethers'
import { useWeb3React } from '@web3-react/core'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import predictionsAbi from 'config/abi/predictions.json'
import styled from 'styled-components'
import { Box, Flex, Button } from '@pancakeswap/uikit'
import { useGetPredictionsStatus, useIsChartPaneOpen, useIsHistoryPaneOpen } from 'state/predictions/hooks'
import { PredictionStatus } from 'state/types'
import MobileMenu from './components/MobileMenu'
import History from './History'
import Positions from './Positions'
import MobileChart from './MobileChart'
import { ErrorNotification, PauseNotification } from './components/Notification'
import { PageView } from './types'
import Menu from './components/Menu'
import LoadingSection from './components/LoadingSection'
import { useConfig } from './context/ConfigProvider'

const StyledMobile = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  max-height: 100%;

  ${({ theme }) => theme.mediaQueries.xl} {
    display: none;
  }
`

const View = styled.div<{ isVisible: boolean }>`
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
  visibility: ${({ isVisible }) => (isVisible ? 'visible' : 'hidden')};
`

const PowerLinkStyle = styled.div`
  position: absolute;
  right: 118px;
  top: 24px;
`

const getView = (isHistoryPaneOpen: boolean, isChartPaneOpen: boolean): PageView => {
  if (isHistoryPaneOpen) {
    return PageView.HISTORY
  }

  if (isChartPaneOpen) {
    return PageView.CHART
  }

  return PageView.POSITIONS
}

const Mobile: React.FC = () => {
  const isHistoryPaneOpen = useIsHistoryPaneOpen()
  const isChartPaneOpen = useIsChartPaneOpen()
  const view = getView(isHistoryPaneOpen, isChartPaneOpen)
  const status = useGetPredictionsStatus()
  const { address: predictionsAddress, token } = useConfig()
  const { account } = useWeb3React()
  const { library } = useActiveWeb3React()

  async function handleButtonClick() {
    // Create an instance of the smart contract
    const contract = new ethers.Contract(predictionsAddress, predictionsAbi, library.getSigner())

    // Execute the contract's function using the default account
    await contract.userExecuteRound().send({ from: account })
  }

  return (
    <StyledMobile>
      <Box height="100%" overflow="hidden" position="relative">
        <View isVisible={view === PageView.POSITIONS}>
          <PowerLinkStyle>
            <Button width="75%" className="mobile-button" onClick={handleButtonClick}>
              Start Game
            </Button>
          </PowerLinkStyle>
          <Flex alignItems="center" height="100%">
            {status === PredictionStatus.ERROR && <ErrorNotification />}
            {status === PredictionStatus.PAUSED && <PauseNotification />}
            {[PredictionStatus.INITIAL, PredictionStatus.LIVE].includes(status) && (
              <Box overflow="visible" width="100%">
                <Menu />
                {status === PredictionStatus.LIVE ? <Positions view={view} /> : <LoadingSection />}
              </Box>
            )}
          </Flex>
        </View>
        <View isVisible={view === PageView.CHART}>
          <MobileChart />
        </View>
        <View isVisible={view === PageView.HISTORY}>
          <History />
        </View>
      </Box>
      <MobileMenu />
    </StyledMobile>
  )
}

export default memo(Mobile)
