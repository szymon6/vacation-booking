const express = require('express')
const app = express()
const cors = require('cors')

//cross-origin resource sharing
app.use(cors())

app.use(express.json())

app.use('/auth', require('./routes/auth'))
app.use('/request', require('./routes/requests'))
app.use(require('./routes/other'))

app.listen(3100, () => {
  console.log(`Server is Listening on 3100`)
})
