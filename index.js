const express = require('express')
const app = express()
const port = 3000
const route = require('./src/routeur/route')
const MysqlService = require('./src/service/MySqlService')
const CompteController = require('./src/controller/controller')

app.set('views', './src/view');
app.set('view engine', 'ejs');

// CompteController.setService(new MysqlService(
//     "127.0.0.1",
//     3306,
//     "root",
//     "",
//     "Tp_Node",
//     "_user",
//     [
//         "nom",
//         "prenom",
//         "mail",
//         "pwd",
//         "isAdmin"
//     ]
// ))

// app.use(express.static("./public"))
app.use(express.urlencoded({
    extended: true
}))

app.use("/", route)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})