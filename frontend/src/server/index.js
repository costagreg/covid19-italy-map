require('dotenv').config()
require('@babel/register')

process.env.NODE_ENV ? require('./dev') : require('./prod')
