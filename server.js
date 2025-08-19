const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser")

const portfolioRouter = require("./src/routes/portfolio");
const adminRouter = require("./src/routes/admin");
const dbConnect = require("./src/utils/dbConnect")
const internalRoute = require("./src/routes/internalMarkCal")
const gpaCgpaCal = require("./src/routes/gpaCgpaCal")
const bdayRoute = require("./src/routes/bday")

app.use(express.json());

const allowedOrigins = [
  "http://localhost:5173",
  "https://ashwinn-si.github.io",
  "https://portfolio-ashwinsi.vercel.app",
  "http://localhost:3000",
  "https://cgpa-gpa-calculator-two.vercel.app",
  "https://jimmy-bday.vercel.app",
  "https://jeevu-bday.vercel.app"
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);
app.use(cookieParser());
app.set('trust proxy', 1);

app.use("/portfolio", portfolioRouter);
app.use("/admin", adminRouter)
app.use("/internalMark", internalRoute)
app.use("/gpa-cgpa-cal", gpaCgpaCal);
app.use("/bday", bdayRoute)

dbConnect();
app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
