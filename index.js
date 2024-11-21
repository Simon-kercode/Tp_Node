const express = require('express')
const app = express()
const port = 3000
const compteRouter = require('./src/route/compteRoutes')

app.set('views', './src/view');
app.set('view engine', 'ejs');

app.use(express.static("./public"))
app.use(express.urlencoded({
    extended: true
}))

app.use("/", compteRouter)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})