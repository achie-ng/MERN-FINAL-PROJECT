// Simple reminder checker that runs every minute and finds appointments within next X minutes
const Appointment = require('../models/Appointment');


const CHECK_INTERVAL_MS = 60 * 1000; // 1 minute
const REMIND_MINUTES = 30; // remind 30 minutes before


let intervalId = null;


async function checkAndSendReminders() {
try {
const now = new Date();
const soon = new Date(now.getTime() + REMIND_MINUTES * 60 * 1000);


// find appointments between now and `soon` that haven't had reminders
const appts = await Appointment.find({
datetime: { $gte: now, $lte: soon },
reminderSent: false
});


for (const appt of appts) {
// Replace this with real SMS/email sending
console.log(`Reminder -> ${appt.patientName} at ${appt.datetime.toISOString()} phone:${appt.phone} email:${appt.email}`);
appt.reminderSent = true;
await appt.save();
}
} catch (err) {
console.error('Reminder worker error', err);
}
}


module.exports = {
start: () => {
if (!intervalId) {
intervalId = setInterval(checkAndSendReminders, CHECK_INTERVAL_MS);
console.log('Reminder worker started');
}
},
stop: () => {
if (intervalId) {
clearInterval(intervalId);
intervalId = null;
console.log('Reminder worker stopped');
}
}
};