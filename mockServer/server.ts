import express from "express";
import account from "./routes/account";

const app = express();
const port = process.env.PORT || 5300;

const router = express.Router();

app.get('/', function (req, res) {
    res.send('hello world');
});

router.use("/test", account);


app.use("/api", router)

// tslint:disable-next-line:no-console
app.listen(port, () => console.log(`Listening on port ${port}`));
