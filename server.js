const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const appointmentsRouter = require('./routes/appointments');
const reminderWorker = require('./utils/reminderWorker');


dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());


const PORT = process.env.PORT || 4000;
const MONGO = process.env.MONGO_URI || 'mongodb://localhost:27017/medireach';


mongoose.connect(MONGO, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error', err));


app.use('/api/appointments', appointmentsRouter);


app.get('/', (req, res) => res.json({ ok: true, msg: 'MediReach API' }));


app.listen(PORT, () => {
console.log(`Server listening on port ${PORT}`);
// start reminder worker after server is up
reminderWorker.start();
});