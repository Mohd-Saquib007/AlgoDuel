const express = require("express");

const executionRoutes = require("./routes/execution.routes");

const app = express();

app.use(express.json());

app.use("/run", executionRoutes);

const PORT = process.env.PORT || 7000;

app.listen(PORT, () => {
    console.log(`🚀 Executor running on port ${PORT}`);
});