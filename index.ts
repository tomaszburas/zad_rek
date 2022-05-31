import express, { json } from 'express';
import 'express-async-errors';
import cors from 'cors';
import { PORT } from './config';
import { handleError } from './utils/handleErrors';

const app = express();

app.use(cors());
app.use(json());

app.use(handleError);
app.listen(PORT, () => `Server listening on port ${PORT}`);
