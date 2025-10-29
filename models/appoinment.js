const mongoose = require('mongoose');


const AppointmentSchema = new mongoose.Schema({
patientName: { type: String, required: true },
phone: { type: String },
email: { type: String },
notes: { type: String },
datetime: { type: Date, required: true },
reminderSent: { type: Boolean, default: false },
createdAt: { type: Date, default: Date.now }
});


module.exports = mongoose.model('Appointment', AppointmentSchema);