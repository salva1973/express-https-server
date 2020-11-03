const fs = require('fs')
const https = require('https')
const express = require('express')
const chalk = require('chalk')

// import private key and public certificate
const privateKey = fs.readFileSync('./sec.key', 'utf8')
const certificate = fs.readFileSync('./sec.crt', 'utf8')

// create an express app
const app = express()
app.get('/', (_req, res) => {
    res.send('Hello Secure World!')
})

// launch HTTPS server on port 443
const credentials = { key: privateKey, cert: certificate }
const httpsServer = https.createServer(credentials, app)
httpsServer.listen(443)
console.clear()
console.log(chalk.greenBright('HTTPS server listening on port 443'))
