"use client"

import { useState } from "react"
import Footer from "../components/Footer"
import WhatsAppButton from "../components/WhatsAppButton"
import Navbar from "../components/NavBar"

export default function EnrollPage() {

const [form,setForm] = useState({
name:"",
email:"",
phone:"",
course:"",
message:""
})

const handleChange = (e)=>{
setForm({...form,[e.target.name]:e.target.value})
}

const handleSubmit = async(e)=>{
e.preventDefault()

const res = await fetch("/api/enroll",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify(form)
})

if(res.ok){
alert("Enrollment request sent successfully")
}
}

return(

<div className="bg-gray-100 min-h-screen pt-24">

<Navbar />

<section className="py-20 px-6 bg-gray-100 min-h-screen">

<div className="max-w-4xl mx-auto bg-white p-10 rounded-2xl shadow-2xl border-2 border-[#fdad1b]">

<h1 className="text-4xl font-bold text-center text-[#074166]">
Enroll Now
</h1>

<p className="text-center text-gray-800 mt-3">
Fill the form and our team will contact you soon.
</p>

<form onSubmit={handleSubmit} className="mt-10 space-y-5">

<div className="grid md:grid-cols-2 gap-4 text-gray-500">

<input
type="text"
name="name"
placeholder="Full Name"
required
onChange={handleChange}
className="p-3 border rounded-lg w-full text-gray-500"
/>

<input
type="email"
name="email"
placeholder="Email Address"
required
onChange={handleChange}
className="p-3 border rounded-lg w-full text-gray-500"
/>

</div>

<div className="grid md:grid-cols-2 gap-4 text-gray-500">

<input
type="text"
name="phone"
placeholder="Phone Number"
required
onChange={handleChange}
className="p-3 border rounded-lg w-full text-gray-500"
/>

<select
name="course"
required
onChange={handleChange}
className="p-3 border rounded-lg w-full text-blue-950"
>

<option>Select Course</option>
<option>Web Development</option>
<option>Artificial Intelligence</option>
<option>Data Science</option>
<option>Cyber Security</option>
<option>Cloud Computing</option>
<option>Digital Marketing</option>

</select>

</div>

<textarea
name="message"
placeholder="Your Message"
rows="4"
onChange={handleChange}
className="p-3 border rounded-lg w-full"
/>

<button
type="submit"
className="w-full bg-[#fdad1b] text-[#074166] font-semibold py-3 rounded-full hover:scale-105 transition"
>

Submit Enrollment

</button>

</form>

</div>

</section>

<Footer />
<WhatsAppButton />

</div>

)

}