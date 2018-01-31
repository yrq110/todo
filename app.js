import Koa from 'koa'
import path from 'path'
import bodyParser from 'koa-bodyparser'
import logger from 'koa-logger'
import cors from 'koa-cors'
import serve from 'koa-static'
import Routers from './server/router'

const app = new Koa()
const port = 8888

app.use(serve(path.join(__dirname, '/client')))
app.use(bodyParser())
app.use(logger())
app.use(cors())

Routers.forEach(router => {
  app
    .use(router.routes())
    .use(router.allowedMethods())
})

app.listen(port, () => {
  console.log(`server is listen at ${port}`)
})