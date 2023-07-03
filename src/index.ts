import express from "express"
import userRouter from "./routes/user"

const app = express()
app.use(express.json())

app.get("/", (_req, res) => {
  res.send("Hello world")
})

//Routers
app.use("/api/v1/users", userRouter)

const PUERTO = process.env.PORT || 3000;

app.listen(PUERTO, () => {
  console.log(`The server is listening on the port ${PUERTO}...`);
});