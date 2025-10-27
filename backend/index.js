const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

app.use("/tasks", require("./routes/tasks"));

const PORT = 3000;
app.listen(PORT, () => console.log(`✅ API escuchando en http://localhost:${PORT}`));
