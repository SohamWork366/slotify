
const express = require("express");

const app = express();
app.use(express.json());
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});
const slotsRoutes = require("./routes/slotsRoutes");
app.use("/slots", slotsRoutes);

app.get("/", (req, res) => {
    res.json({
        message: "Welcome to Slotify API"
    });
});

app.listen(3000, () => {
    console.log("Slotify server running on port 3000");
});