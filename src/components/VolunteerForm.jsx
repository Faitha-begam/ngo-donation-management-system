import { useState } from "react";

import {
  getCurrentUser,
  saveVolunteerApplication
} from "../utils/auth";



const VolunteerForm = () => {


  const currentUser = getCurrentUser();



  const initialForm = {

    name:
    currentUser?.name || "",

    email:
    currentUser?.email || "",

    phone:
    currentUser?.phone || "",

    skills:"",

    role:"",

    availability:"",

    message:""

  };



  const [formData,setFormData] =
  useState(initialForm);



  const [submitted,setSubmitted] =
  useState(false);





  const handleChange=(e)=>{

    setFormData({

      ...formData,

      [e.target.name]:
      e.target.value

    });

  };





  const handleSubmit=(e)=>{

    e.preventDefault();



    const result =
    saveVolunteerApplication(formData);



    if(result?.success){


      const applications =
      JSON.parse(
        localStorage.getItem(
          "volunteerApplications"
        )
      ) || [];



      const newApplication={

        id:Date.now(),

        userId:
        currentUser?.id,

        ...formData,

        status:"Pending",

        submittedAt:
        new Date().toISOString()

      };



      localStorage.setItem(

        "volunteerApplications",

        JSON.stringify([

          ...applications,

          newApplication

        ])

      );



      setSubmitted(true);



      setFormData(initialForm);



      setTimeout(()=>{

        setSubmitted(false);

      },3000);


    }


  };





  const inputClass = `
    w-full
    px-4
    py-3
    rounded-xl
    border
    border-gray-200
    outline-none
    text-gray-700
    transition
    duration-300
    focus:border-[#7A866E]
    focus:ring-4
    focus:ring-[#7A866E]/10
  `;



  const labelClass = `
    block
    mb-2
    text-sm
    font-medium
    text-[#2F3A2D]
  `;



  return (
    <section className="w-full py-20 px-6 bg-[#F8F6F1]">

<div className="max-w-5xl mx-auto">


<div className="text-center mb-12">

<h2 className="text-3xl md:text-4xl font-bold text-[#2F3A2D]">
Join Our Volunteer Community
</h2>


<p className="mt-4 text-gray-600">
Share your skills and become a part of our mission.
</p>

</div>





{
submitted &&

<div
className="
mb-8
p-4
rounded-xl
bg-green-100
text-green-700
text-center
"
>

Thank you for applying! Your volunteer application is pending approval.

</div>

}





<form

onSubmit={handleSubmit}

className="
bg-white
rounded-3xl
shadow-xl
p-6
md:p-10
"

>


<div className="grid grid-cols-1 md:grid-cols-2 gap-6">





<div>

<label className={labelClass}>
Full Name
</label>


<input

type="text"

name="name"

value={formData.name}

onChange={handleChange}

required

className={inputClass}

/>

</div>






<div>

<label className={labelClass}>
Email Address
</label>


<input

type="email"

name="email"

value={formData.email}

onChange={handleChange}

required

className={inputClass}

/>

</div>







<div>

<label className={labelClass}>
Phone Number
</label>


<input

type="tel"

name="phone"

value={formData.phone}

onChange={handleChange}

required

className={inputClass}

/>

</div>







<div>

<label className={labelClass}>
Skills
</label>


<input

type="text"

name="skills"

value={formData.skills}

onChange={handleChange}

placeholder="Teaching, Design, Management..."

className={inputClass}

/>

</div>







<div>

<label className={labelClass}>
Preferred Role
</label>


<select

name="role"

value={formData.role}

onChange={handleChange}

required

className={inputClass}

>


<option value="">
Select role
</option>


<option value="Education Support">
Education Support
</option>


<option value="Community Outreach">
Community Outreach
</option>


<option value="Event Assistance">
Event Assistance
</option>


<option value="Fundraising Support">
Fundraising Support
</option>


</select>


</div>







<div>

<label className={labelClass}>
Availability
</label>


<select

name="availability"

value={formData.availability}

onChange={handleChange}

className={inputClass}

>


<option value="">
Select availability
</option>


<option value="Weekdays">
Weekdays
</option>


<option value="Weekends">
Weekends
</option>


<option value="Flexible">
Flexible
</option>


</select>


</div>
<div className="md:col-span-2">

<label className={labelClass}>
Message
</label>


<textarea

name="message"

rows="5"

value={formData.message}

onChange={handleChange}

placeholder="Tell us why you want to volunteer..."

className={`${inputClass} resize-none`}

/>


</div>



</div>







<button

type="submit"

className="
mt-8
w-full
py-3
rounded-full
bg-[#7A866E]
text-white
font-medium
hover:bg-[#667258]
transition
duration-300
"

>

Submit Application

</button>






</form>



</div>


</section>


  );


};


export default VolunteerForm;