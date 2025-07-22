import serverless from "serverless-http";
import app from "../server.js";

// This must be the default export for Vercel
export default serverless(app);
