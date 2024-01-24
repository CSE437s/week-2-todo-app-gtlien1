const express = require("express")
const app = express()
const mysql = require('mysql');
const cors = require("cors")

app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded());
app.use(cors())

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "tasks"
})
db.on('error', function(err) {
    console.log("[mysql error]",err);
});

app.post("/addtask", function(req, res) {
    console.log("task entry");
    task = req.body;
    console.log(task);
    taskname = task.taskname;
    taskdue = task.taskdue;
    const sql = `INSERT INTO tasklist (taskname, date, complete) VALUES (?,?,0)`;
    db.query(sql, [taskname, taskdue], (err, data) => {
        console.log(err, data);
        if(err) return res.json(err);
        return res.json({ message: 'task addition successful' });
    })
})

app.post('/task', (req, res) => {
    console.log("retrieving tasts");
    const sql = 'SELECT * FROM tasklist ORDER BY Date';
    db.query(sql, (err, data) => {
        console.log(err, data);
        if (err) return res.json(err);
        return res.json(data);
    })
})


app.listen(3000, () => {
  console.log("app listening on port 3000")
})