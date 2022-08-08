import { styled } from '../../styles/stitches.config'
import _ from 'lodash'
import { ethers } from 'ethers'
import { ethereum, isPhantom, solana } from '../../app-engine/library/index'
import {
  AnchorIcon,
  MetamaskIcon,
  PhantonIcon,
  // GitlabIcon,
  // GhLoginIcon,
  // BitbucketIcon,
} from '~/components/icons/index'
import { useEffect, useState } from 'react'
import { Button } from '~/components/base/index'
import { Card } from './Card'
import { useAppEngine } from '~/app-engine/index'

const message = 'Login to PowerStack App'

type LoginOptions = {
  strategy: 'metamask' | 'phantom' | 'twitter'
  signed_message?: {
    signature: string
    address: string
    message: string
  }
}

const useLoginSubmit = () => {
  const submit = ({ strategy, signed_message }: LoginOptions) => {
    //   fetcher.submit(signed_message || {}, {
    //     method: 'post',
    //     action: `/actions/login/${strategy}?redirect_to=${
    //       location.pathname || '/'
    //     }`,
    //   })
  }
  return submit
}

const Title = styled('h1', {
  fontSize: '$h-2',
  fontWeight: '$semi-bold',
  mb: '$large',
  mt: 0,
  px: '$small',
  textAlign: 'center',
  '@tabletUp': {
    fontSize: '$h-1',
    mb: '$x-small',
  },
})

const LoginButton = styled(Button, {
  '& svg': {
    flexShrink: 0,
    mr: '$regular',
  },
})

const Separator = styled('div', {
  display: 'grid',
  gridTemplateColumns: '1fr max-content 1fr',
  gridColumnGap: '$regular',
  alignItems: 'center',
  my: '$regular',
  '&:before, &:after': {
    content: '""',
    display: 'block',
    height: '1px',
    backgroundColor: '#E5E7EB',
  },
})

const IconsFlex = styled('div', {
  display: 'flex',
  px: '$small',
  columnGap: '$small',
  button: {
    flex: '1',
  },
})

export const WalletLogin = () => {
  const { user, loginWithAnchor } = useAppEngine()
  const submit = useLoginSubmit()

  const loginWithMetamask = async () => {
    if (!ethereum) return alert('Metamask not found')
    const provider = new ethers.providers.Web3Provider(ethereum)
    const signer = provider.getSigner()
    // submit({
    //   strategy: 'metamask',
    //   signed_message: {
    //     signature: await signer.signMessage(message),
    //     address: await signer.getAddress(),
    //     message,
    //   },
    // })
  }
  const loginAnchor = async () => await loginWithAnchor()

  const loginWithPhantom = async () => {
    if (!isPhantom) return alert('Phantom not found')
    try {
      const resp = await solana.connect()
      console.log(resp.publicKey.toString(), solana.isConnected) // 26qv4GCcx98RihuK3c4T6ozB3J7L6VwCuFVc7Ta2A3Uo
      // submit({
      //   strategy: 'phantom',
      //   signed_message: {
      //     signature: await solana.signMessage(
      //       new TextEncoder().encode(message),
      //       'utf8',
      //     ),
      //     address: resp.publicKey.toString(),
      //     message,
      //   },
      // })
    } catch (err) {
      alert((err as Error).message)
    }
  }

  const [path, setPath] = useState('')

  return (
    <Card>
      <Title>Welcome {user ? 'Back' : null} to PowerStack Remix</Title>
      <LoginButton onClick={() => loginAnchor()} variant="panthom">
        <PhantonIcon />
        Login with Phantom
      </LoginButton>
      <LoginButton
        css={{ mb: '$small' }}
        onClick={() => console.log("I'm dummy, gimme power!")}
        variant="anchor"
      >
        <AnchorIcon />
        Login with Anchor
      </LoginButton>
      <LoginButton css={{ mb: '$small' }} onClick={() => {}} variant="metamask">
        <MetamaskIcon />
        Login with Metamask
      </LoginButton>
      <p>Address: {user?.address ? user.address : 'wallet not connected'}</p>
      <Separator>Or sign in with</Separator>

      <LoginButton
        as="a"
        css={{ mb: '$small' }}
        onClick={() => {}}
        variant="oauth"
        href={`https://powerstack-auth-atgjsg75cq-uc.a.run.app/provider/twitter?redirect_uri=${path}`}
        role="button"
      >
        Sign in with Twitter
      </LoginButton>
      {/* <Button 
          css={{ svg: { mr: 0 } }}
          onClick={() => loginWithTwitter()}
          variant="oAuth"
          aria-label="Login with Twitter"
        >
          <GhLoginIcon />
        </Button> */}
      {/* <Button
          css={{ svg: { mr: 0 } }}
          onClick={() => console.log("I'm dummy, gimme power!")}
          variant="oAuth"
          aria-label="Login with Github"
        >
          <GhLoginIcon />
        </Button>
        <Button
          css={{ svg: { mr: 0 } }}
          onClick={() => console.log("I'm dummy, gimme power!")}
          variant="oAuth"
          aria-label="Login with Gitlab"
        >
          <GitlabIcon />
        </Button>
        <Button
          css={{ svg: { mr: 0 } }}
          onClick={() => console.log("I'm dummy, gimme power!")}
          variant="oAuth"
          aria-label="Login with BitBucket"
        >
          <BitbucketIcon />
        </Button> */}
    </Card>
  )
}
