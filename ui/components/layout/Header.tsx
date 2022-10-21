import { styled } from '~/ui/styles/stitches.config'
import { BlockmaticIcon, BellIcon } from '~/ui/icons/index'
import { Button } from '../base/Button'
import { Link } from '../base/Link'
import { useAppEngine } from '~/engine/store/index'
import { ProfilePopover } from '../modules/ProfilePopover'

const NavBar = styled('nav', {
  display: 'flex',
  backdropFilter: 'saturate(180%) blur(10px)',
  justifyContent: 'space-between',
  position: 'sticky',
  top: 0,
  width: '100%',
  zIndex: 100,
})

const VisuallyHidden = styled('h2', {
  position: 'absolute',
  clip: 'rect(1px, 1px, 1px, 1px)',
  overflow: 'hidden',
  height: '1px',
  width: '1px',
  wordWrap: 'normal',
})

const MenuButton = styled('button', {
  bg: 'transparent',
  border: 'none',
  cursor: 'pointer',
  p: 0,
  width: 22,
  transition: 'all 400ms',
  span: {
    background: '#000',
    borderRadius: 4,
    display: 'block',
    height: 3,
    mb: 3,
    transition: 'all .4s cubic-bezier(.05,.88,.36,.99)',
    width: 22,
  },
  '& span:last-child': {
    mb: 0,
    width: 9,
  },
  '&:hover span': {
    boxShadow: '0px 0.5px 1px rgba(0, 0, 0, 0.4)',
  },
  '&[data-state=active]': {
    transform: 'rotateY(180deg)',
    '& span': {
      '&:first-child': {
        marginTop: 5,
        transform: 'rotate(-45deg)',
      },
      '&:nth-child(2)': {
        marginTop: -6,
        transform: 'rotate(45deg)',
      },
      '&:last-child': {
        opacity: 0,
        width: 0,
      },
    },
  },
  '@small': {
    display: 'none',
  }
})

const Logo = styled(BlockmaticIcon, {
  height: '21px',
  width: 'max-content',
  '@small': {
    height: '36px',
  },
})

// ToDo: this has just needed styles since we don't have the design yet
const NavContent = styled('div', {
  alignItems: 'center',
  bg: 'white',
  borderBottom: '1px solid #eeeeee',
  borderLeft: '1px solid #eeeeee',
  display: 'none',
  flex: 1,
  justifyContent: 'space-between',
  pl: '$regular',
  pr: '$x-large',
  py: '$regular',
  '@small': {
    display: 'flex',
    justifyContent: 'flex-end',
    py: '$regular',
  },
  '&[data-active=true]': {
    alignItems: 'flex-end',
    boxShadow: '0px 8px 16px 0px #00000014, 4px 4px 4px 0px #0000000a',
    display: 'flex',
    flexDirection: 'column',
    px: '$small',
    position: 'absolute',
    rowGap: '$regular',
    top: '100%',
    width: '100%',
  }
})

const LogoLink = styled(Link, {
  height: '100%',
  my: 0,
  py: '$regular',
  '@small': {
    borderBottom: '1px solid #eeeeee',
  }
})

const BellButton = styled('button', {
  bg: 'transparent',
  border: 'none',
  cursor: 'pointer',
  p: 0,
})

const NavActions = styled('div', {
  alignItems: 'center',
  display: 'flex',
  flex: 1,
  justifyContent: 'space-between',
  px: '$small',
  '@small': {
    flex: '1 1 300px',
    maxWidth: 300,
    px: '$regular',
  }
})

export const Header = () => {
  const { setShowLoginModal, show_submenu, setShowSubmenu, setloginModalMessage } = useAppEngine()

  return (
    <NavBar role="navigation" aria-labelledby="main-nav-title">
      <NavActions>
        <div>
          <LogoLink href="/">
            <Logo />
          </LogoLink>
        </div>
        <MenuButton
          aria-label={show_submenu ? 'Open Menu' : 'Close Menu'}
          type="button"
          data-state={show_submenu && 'active'}
          onClick={() => setShowSubmenu(!show_submenu)}
        >
          <span aria-hidden="true"/><span aria-hidden="true"/><span aria-hidden="true"/>
        </MenuButton>
      </NavActions>
      <NavContent data-active={show_submenu}>
        <VisuallyHidden>Main navigation</VisuallyHidden>
        <BellButton type="button" aria-label="Notifications">
          <BellIcon />
        </BellButton>
        <Button
          onClick={() => {
            setloginModalMessage('Login')
            setShowLoginModal(true)
          }}
        >
          Login
        </Button>
        <ProfilePopover />
      </NavContent>
    </NavBar>
  )
}