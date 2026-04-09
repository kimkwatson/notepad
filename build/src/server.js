"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const notes_js_1 = __importDefault(require("./routes/notes.js"));
const connect_js_1 = require("./db/connect.js");
const app = (0, express_1.default)();
app.use(express_1.default.json());
// routes
app.use(express_1.default.static("public"));
app.use("/build", express_1.default.static("build"));
app.use("/notes", notes_js_1.default);
// port variable
const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;
// initialize mongodb
const startServer = async () => {
    try {
        await (0, connect_js_1.initDb)();
        console.log('MongoDB connected');
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    }
    catch (error) {
        console.error('Failed to start server: ', error);
    }
};
startServer();
