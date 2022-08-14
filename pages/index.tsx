import { WalletLogin } from '~/app-view/components/modules/WalletLogin'
import { styled } from '../app-view/styles/stitches.config'
import { NextPage } from 'next'
import { Container, Footer, Header } from '~/app-view/components/layout'
import { Button } from '~/app-view/components/base'
import { useAppEngine } from '~/app-engine'

const MainContent = styled('div', {
  minHeight: '75vh',
  position: 'relative',
})

const LoginBackground = styled('div', {
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  width: '100%',
  minHeight: '100vh',
})

const Home: NextPage = () => {
  const { destroySession } = useAppEngine()
  return (
    <LoginBackground>
      <Header />
      <MainContent>
        <Container>
          <WalletLogin />

          <div>
            <Button onClick={destroySession}>log out</Button>
          </div>
        </Container>
      </MainContent>
      <Footer />
    </LoginBackground>
  )
}

export default Home
