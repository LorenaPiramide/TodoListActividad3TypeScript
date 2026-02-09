import express from 'express';

import dotenv from "dotenv";
import cors from "cors";
import * as https from "https";
import * as fs from "fs";

const app = express()

app.listen(8080, () => {
    console.log('ya tira');
})