const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan")
const cookieParser = require("cookie-parser")

const portfolioRouter = require("./src/routes/portfolio");
const adminRouter = require("./src/routes/admin");
const dbConnect = require("./src/utils/dbConnect")
const internalRoute = require("./src/routes/internalMarkCal")
const gpaCgpaCal = require("./src/routes/gpaCgpaCal")
const bdayRoute = require("./src/routes/bday")

const PORT = parseInt(process.env.PORT);
app.use(morgan("dev"))
app.use(express.json());
const allowedOrigins = [
  "https://ashwinn-si.github.io",
  "https://portfolio-ashwinsi.vercel.app",
  "https://portfolio.ashwinsi.in",
  "https://cgpa-gpa-calculator-two.vercel.app",
  "https://portfolio-ashwinsi.vercel.app/admin",
  "https://jimmy-bday.vercel.app",
  "https://jeevu-bday.vercel.app"
];

// Add localhost origins if in development environment
if (process.env.ENV === "DEV") {
  allowedOrigins.push("http://localhost:5173", "http://localhost:3000", "http://127.0.0.1:5501");
}

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
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
