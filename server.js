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

const PORT = parseInt(process.env.PORT) || 5001;
app.use(morgan("dev"))
app.use(express.json());
const allowedOrigins = [
  "https://ashwinn-si.github.io",
  "https://portfolio-ashwinsi.vercel.app",
  "https://portfolio.ashwinsi.in",
  "https://ashwinsi.in",
  "https://cgpa-gpa-calculator-two.vercel.app",
  "https://portfolio-ashwinsi.vercel.app/admin",
  "https://jimmy-bday.vercel.app",
  "https://jeevu-bday.vercel.app",
  "https://internalmarkcal.ashwinsi.in"
];

// Add localhost origins if in development environment
if (process.env.ENV === "DEV") {
  allowedOrigins.push("http://localhost:5173", "http://localhost:3000", "http://127.0.0.1:5501");
}

// Allow any subdomain of ashwinsi.in plus the explicit allowedOrigins
const allowedSuffixes = ["ashwinsi.in"];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) {
        // allow requests with no origin (like curl, Postman, or same-origin)
        return callback(null, true);
      }

      try {
        const host = new URL(origin).hostname;

        const isExplicitAllowed = allowedOrigins.includes(origin);
        const matchesSuffix = allowedSuffixes.some(suffix => host === suffix || host.endsWith("." + suffix));

        if (isExplicitAllowed || matchesSuffix) {
          return callback(null, true);
        }
      } catch (err) {
        // fall through to reject on invalid origin format
      }

      callback(new Error("Not allowed by CORS"));
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
