const app = require("./server/app");
const debug = require("debug");
let _argv = process.argv.splice(2);
app.listen(_argv[0])