SDG3 MediReach - Appointment & Reminders


Simple appointment booking + reminders app built with React (Vite) + Node/Express + MongoDB (Mongoose).


## Features
- Create, read, update, delete appointments
- Simple reminder worker that checks upcoming appointments and logs (or could send) reminders
- Frontend with forms and appointment list


## Setup


### Backend
1. Copy `.env.example` to `.env` and fill values (MONGO_URI, PORT).
2. `cd backend`
3. `npm install`
4. `npm run dev` (or `node server.js`)


### Frontend
1. `cd frontend`
2. `npm install`
3. `npm run dev`


Frontend expects backend at `http://localhost:4000` by default. Change `VITE_API_BASE` in `frontend/.env` or `api.js` if needed.


## Notes
- Reminder worker is a basic example — replace console.log with email/SMS integration (e.g., Twilio, SendGrid) for production.
- Add authentication and validation before production use.