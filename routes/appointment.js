const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment');


// create
router.post('/', async (req, res) => {
try {
const appt = new Appointment(req.body);
await appt.save();
res.status(201).json(appt);
} catch (err) {
res.status(400).json({ error: err.message });
}
});


// read all
router.get('/', async (req, res) => {
try {
const list = await Appointment.find().sort({ datetime: 1 });
res.json(list);
} catch (err) {
res.status(500).json({ error: err.message });
}
});


// read one
router.get('/:id', async (req, res) => {
try {
const appt = await Appointment.findById(req.params.id);
if (!appt) return res.status(404).json({ error: 'Not found' });
res.json(appt);
} catch (err) {
res.status(500).json({ error: err.message });
}
});


// update
router.put('/:id', async (req, res) => {
try {
const appt = await Appointment.findByIdAndUpdate(req.params.id, req.body, { new: true });
if (!appt) return res.status(404).json({ error: 'Not found' });
res.json(appt);
} catch (err) {
res.status(400).json({ error: err.message });
}
});


// delete
router.delete('/:id', async (req, res) => {
try {
await Appointment.findByIdAndDelete(req.params.id);
res.json({ ok: true });
} catch (err) {
res.status(500).json({ error: err.message });
}
});


module.exports = router;