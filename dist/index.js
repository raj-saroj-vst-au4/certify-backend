"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("./server");
const port = process.env.PORT || 5001;
const server = (0, server_1.createServer)();
server.listen(port, () => {
    console.log(`api running on ${port}`);
});
