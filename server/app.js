require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
 const port = process.env.SERVER_PORT;
const userRouter = require("./api/users/user.router");
const questionRouter = require("./api/questions/question.router");
const answerRouter = require("./api/answers/answer.router");
const  { pool } = require('./db/database');

app.use(cors({
  //origin: 'http://localhost:5173',
  origin: 'https://nitsu-evangadi-forum.netlify.app',
  credentials: true
}));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/test',(req,res)=>{
  res.send('<h1>hey hey </h1>');
})


app.use("/api/users", userRouter);
app.use("/api/questions", questionRouter);
app.use("/api/answers", answerRouter);

app.listen(port, () => console.log(`Listening at http://localhost:${port}`));