
import express from 'express';
import {getTicks} from './analysisTool/ticks/getTicks.js'
import { CircularBuffer } from "./analysisTool/ticks/circularBuffer.js";

const app = express();

let tickData = new CircularBuffer(100);

getTicks(tickData, 'R_50', 100);


app.listen(3000, () => {
    console.log("Server started at port 3000");
})