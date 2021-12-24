const mongoose = require('mongoose')
const { connect, connection } = mongoose

const uri = process.env.URI_DB

const db = connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

process.on('SIGINT', async () => {
  connection.close()
  console.log('Connection DB closed')
  process.exit(1)
})

module.exports = {
  db,
}
