import * as express from "express";
import * as serveStatic from "serve-static";

import { Handler } from "./handler";

const port = process.env.PORT || 3000;

const app = express();
app.get('/', Handler());
app.use('/static', serveStatic("static"))
app.listen(port, () => {
    console.log(`> Ready on port ${port}`)
});
