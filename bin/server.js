const app = require('../app')
const { db } = require('../db/connect')
const PORT = process.env.PORT || 3000

db.then(() => {
  app.listen(PORT, () => {
    console.log(PORT)
    console.log('Database connection successful')
  })
}).catch((error) => {
  console.error(`Server not running. Error: ${error.message}`)
})
