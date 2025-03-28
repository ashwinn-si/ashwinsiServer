const express = require("express");
const app = express();
const cors = require("cors"); 
const portfolioRouter = require("./src/routes/portfolio");
const adminRouter = require("./src/routes/admin");
const dbConnect = require("./src/utils/dbConnect")

app.use(express.json());
app.use(cors({
  origin: "*"
}));
app.set('trust proxy', 1);

app.use("/portfolio", portfolioRouter);
app.use("/admin", adminRouter)

dbConnect();
app.listen(5000, () => {
    console.log("Server is running on port 5000");
});
