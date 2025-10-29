import React, { useEffect, useState } from 'react'
import { getAppointments, createAppointment, updateAppointment, deleteAppointment } from './api'
import AppointmentForm from './components/AppointmentForm'
import AppointmentList from './components/AppointmentList'


export default function App() {
const [appointments, setAppointments] = useState([])
const [loading, setLoading] = useState(true)


async function load() {
setLoading(true)
try {
const data = await getAppointments()
setAppointments(data)
} catch (err) {
console.error(err)
} finally {
setLoading(false)
}
}


useEffect(() => { load() }, [])


async function handleCreate(payload) {
const created = await createAppointment(payload)
setAppointments(prev => [...prev, created].sort((a,b)=> new Date(a.datetime) - new Date(b.datetime)))
}


async function handleDelete(id) {
await deleteAppointment(id)
setAppointments(prev => prev.filter(p=>p._id !== id))
}


async function handleUpdate(id, payload) {
const updated = await updateAppointment(id, payload)
setAppointments(prev => prev.map(p => p._id===id? updated : p))
}


return (
<div className="container">
<h1>SDG3 MediReach — Appointments</h1>
<div className="card">
<AppointmentForm onCreate={handleCreate} />
</div>


<div className="card">
<h2 className="small">Upcoming</h2>
{loading ? <div>Loading...</div> : (
<AppointmentList items={appointments} onDelete={handleDelete} onUpdate={handleUpdate} />
)}
</div>
</div>
)
}