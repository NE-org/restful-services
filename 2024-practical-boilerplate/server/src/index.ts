import express, { Express, Request, Response } from 'express'
import cors from 'cors'
import helmet from 'helmet'
import 'dotenv/config'
import * as middleware from './middleware'
import { establishConnection } from './config/connect'
import logger from './common/logger'
import { restaurantRoute } from './routes/restaurant.route'
import { orderRoute } from './routes/order.route'
import { productRoute } from './routes/product.route'
import { menuRoute } from './routes/menu.route'
import { authMiddleware } from './middleware/auth.middleware'
import { roleMiddleware } from './middleware/role.middleware'
import { authRoute } from './routes/auth.route'
import swaggerUi from 'swagger-ui-express'
import MyJson from './swagger/swagger.json'
import { userRoute } from './routes/user.route'

const PORT = process.env.PORT || 808
const ENV = process.env.NODE_ENV || 'production'

const app: Express = express()
app.use(helmet())

app.use(cors())

app.use(express.json())

app.use(middleware.httpLogger)

app.get('/', (req: Request, res: Response) => {
  res.status(200).send('Welcome')
})

app.use('/api/v1/auth', authRoute)
app.use('/api/v1/auth', roleMiddleware('create', 'admin'), authRoute)
app.use('/api/v1/users', authMiddleware, roleMiddleware('create', 'admin'), userRoute)
app.use('/api/v1/restaurants', authMiddleware, roleMiddleware('create', 'admin'), restaurantRoute)
app.use('/api/v1/orders', authMiddleware, roleMiddleware('create', 'admin'), orderRoute)
app.use('/api/v1/products', authMiddleware, roleMiddleware('create', 'admin'), productRoute)
app.use('/api/v1/menus', authMiddleware, roleMiddleware('create', 'admin'), menuRoute)

app.use(middleware.errorHandler)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(MyJson))
app.use(middleware.notFoundHandler)

let server: any
establishConnection()
  .then(() => {
    server = app.listen(PORT, () => {
      logger.info(`Server running on port ${PORT} in ${ENV} environment`)
    })
  })
  .catch((error) => {
    logger.error('Unable to connect to the database:', error)
  }
  )
export { app as default, server }