const { mkdir } = require('fs/promises')

const app = require('../app')
const { db } = require('../db/connect')

const PORT = process.env.PORT || 3000

db.then(() => {
  app.listen(PORT, async () => {
    await mkdir(process.env.UPLOAD_DIR, { recursive: true })
    console.log('Database connection successful')
  })
}).catch((error) => {
  console.error(`Server not running. Error: ${error.message}`)
})
