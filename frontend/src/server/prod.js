import express from 'express'
import ssr from './ssr'
import proxy from './proxy'

const app = express()
const port = process.env.PORT | 8080

app.use(proxy)
app.use(express.static('static'))
app.use(ssr())
app.listen(port, () => {
  console.log(`Server listening in port ${port}`)
})