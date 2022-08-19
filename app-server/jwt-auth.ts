import { app_args } from '~/app-config/app-arguments'
import { app_logger } from '~/app-engine/library/logger'
import { fetchJson } from '../app-engine/library/fetch'
import { CreateSessionProps } from '../app-engine/store/session-slice'
import { AuthMethod } from '../app-engine/types/app-engine'

export type AuthResponse = {
  token: string | null
  error: unknown // TODO: fix type
}

const getLoginPath = (auth_method: AuthMethod) => {
  switch (auth_method) {
    case 'web3_solana': {
      return '/provider/phantom'
    }
    case 'web3_metamask':
    case 'web3_auth':
    default:
      return '/provider/evm'
  }
}

const login = async (login_payload: CreateSessionProps): Promise<AuthResponse> => {
  try {
    const login_auth_api_url = app_args.services.auth_api + getLoginPath(login_payload.auth_method)
    const login_response = await fetchJson(login_auth_api_url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(login_payload),
    })
    return login_response as AuthResponse
  } catch (error) {
    app_logger.log('error', error)
    throw new Error((error as Error).message)
  }
}

export const auth_service = {
  login,
}