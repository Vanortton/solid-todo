import { auth } from '../../auth/betterAuth'
import { BetterAuthController } from '../controllers/BetterAuthController'

export default () => {
    return new BetterAuthController(auth)
}
