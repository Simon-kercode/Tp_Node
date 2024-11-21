const express = require('express')
const app = express()
const port = 3000
const Router = require('./src/route/route')

app.set('views', './src/view');
app.set('view engine', 'ejs');

app.use(express.static("./public"))
app.use(express.urlencoded({
    extended: true
}))

app.use("/", Router)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})