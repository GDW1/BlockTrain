const app = require('./index')
const port = 3000;


app.listen(process.env.PORT, (err) => {
    if (err) throw err
    console.log(`Server running in http://127.0.0.1:${port}`)
})
