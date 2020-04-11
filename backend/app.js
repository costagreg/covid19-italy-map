import mongoose from 'mongoose'
import createError from 'http-errors'
import express from 'express'
import cookieParser from 'cookie-parser'
import logger from 'morgan'
import graphqlHTTP from 'express-graphql'
import schema from './graphql/schema'
import cors from 'cors'

const port = process.env.PORT
const app = express()

mongoose
  .connect(process.env.MONGODB_URI, { useNewUrlParser: true })
  .then(() => console.log('connection successful'))
  .catch((err) => console.error(err))

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

app.use('*', cors());
app.use('/graphql', cors(), graphqlHTTP({
  schema: schema,
  rootValue: global,
  graphiql: true,
}));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development

  err.message
  // render the error page
  res.status(err.status || 500)
  res.send(err.message)
})

app.listen(port, () => console.log(`Listening on ${port}`))
