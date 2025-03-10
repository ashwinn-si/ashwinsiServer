const express = require("express");
const app = express();
const cors = require("cors"); 
const portfolioRouter = require("./src/routes/portfolio");


app.use(express.json());
app.use(cors({
  origin: "*"
}));


app.use("/portfolio", portfolioRouter);

app.listen(5000, () => {
    console.log("Server is running on port 5000");
});
