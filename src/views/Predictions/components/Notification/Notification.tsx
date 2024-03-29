import styled from 'styled-components'
import { Card, CardBody, Heading, ArrowBackIcon, IconButton } from '@pancakeswap/uikit'
import { useRouter } from 'next/router'
import { useTranslation } from 'contexts/Localization'
import { PredictionSupportedSymbol } from 'state/types'
import { useConfig } from 'views/Predictions/context/ConfigProvider'

interface NotificationProps {
  title: string
}

const Wrapper = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
  height: 100%;
  justify-content: center;
`

const CardWrapper = styled.div`
  position: relative;
  width: 320px;
`

const BunnyDecoration = styled.div`
  position: absolute;
  top: -130px;
  left: 0px;
  text-align: center;
  width: 100%;
  z-index: 5;
  cursor: pointer;
`

const BackButtonStyle = styled(IconButton)`
  position: absolute;
  top: -62px;
  width: 40%;
  ${({ theme }) => theme.mediaQueries.md} {
    top: -132px;
  }
`

const BackButton = () => {
  const { t } = useTranslation()

  return (
    <BackButtonStyle variant="primary" width="100%">
      <ArrowBackIcon color="white" mr="8px" />
      {t('Back')}
    </BackButtonStyle>
  )
}

const Notification: React.FC<NotificationProps> = ({ title, children }) => {
  const router = useRouter()
  const { token } = useConfig()

  return (
    <Wrapper>
      <CardWrapper>
        <BackButton />
        <BunnyDecoration
          onClick={() => {
            if (token.symbol === PredictionSupportedSymbol.CAKE) {
              router.query.token = PredictionSupportedSymbol.CAKE
            } else if (token.symbol === PredictionSupportedSymbol.CAKE) {
              router.query.token = PredictionSupportedSymbol.CAKE
            }

            router.push(router)
          }}
        >
        </BunnyDecoration>
        <Card>
          <CardBody>
            <Heading mb="24px">{title}</Heading>
            {children}
          </CardBody>
        </Card>
      </CardWrapper>
    </Wrapper>
  )
}

export default Notification
