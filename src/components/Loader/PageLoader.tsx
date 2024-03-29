import styled from 'styled-components'
import { Spinner } from '@pancakeswap/uikit'
import Page from '../Layout/Page'

const Wrapper = styled(Page)`
  display: flex;
  justify-content: center;
  align-items: center;
`

const PageLoader: React.FC = () => {
  return (
    <Wrapper>
      <img src="/images/LuckyCatOnly.png" alt="Lucky Cat" width="48px" height="48px" />
    </Wrapper>
  )
}

export default PageLoader
