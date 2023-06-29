import express from "express"

const app = express()
app.use(express.json())

app.get("/", (_req, res) => {
  res.send("Hello world") 
})

const PUERTO = process.env.PORT || 3000;

app.listen(PUERTO, () => {
  console.log(`The server is listening on the port ${PUERTO}...`);
});