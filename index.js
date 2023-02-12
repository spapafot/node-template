const express = require("express");
const session = require("express-session");
const cors = require("cors")
const { createClient } = require("redis");
let RedisStore = require("connect-redis")(session);
const mongoose = require("mongoose");

const {
  MONGO_USER,
  MONGO_PASSWORD,
  MONGO_PORT,
  MONGO_IP,
  REDIS_URL,
  REDIS_PORT,
  SESSION_SECRET,
} = require("./config/config");

let redisClient = createClient({
  host: REDIS_URL,
  port: REDIS_PORT,
  legacyMode: true,
});

const postRouter = require("./routes/postRoutes");
const userRouter = require("./routes/userRoutes");
const app = express();

mongoose.set("strictQuery", true);
mongoose
  .connect(
    `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`
  )
  .then(() => console.log("Connected to MONGO!"));

app.enable("trust proxy");
app.use(
  session({
    store: new RedisStore({ client: redisClient }),
    secret: SESSION_SECRET,
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 30000000,
      secure: false,
      httpOnly: true,
    },
  })
);
app.use(express.json());
app.get("/api", (req, res) => {
  return res.send("<p>mon GOOOOSE BITCH</p>");
});
app.use(cors({}))
app.use("/api/v1/posts", postRouter);
app.use("/api/v1/users", userRouter);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening on port ${port}`));

