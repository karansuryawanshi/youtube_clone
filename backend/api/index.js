// api/index.js
import app from "../server.js";
import { createServer } from "@vercel/node";

export default createServer(app);
