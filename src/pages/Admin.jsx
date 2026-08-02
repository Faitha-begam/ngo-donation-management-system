import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import {
  LayoutDashboard,
  RefreshCw,
  ShieldCheck,
  HeartHandshake,
  Users,
  MessageCircle,
  Sparkles,
} from "lucide-react";


import {
  getDashboardStats,
  getUsers,
  getDonations,
  getVolunteers,
  getMessages,
} from "../services/adminService";


import AdminStats from "../components/admin/AdminStats";
import DonorTable from "../components/admin/DonorTable";
import VolunteerTable from "../components/admin/VolunteerTable";



const fadeUp = {
  hidden:{
    opacity:0,
    y:30,
  },

  show:{
    opacity:1,
    y:0,
    transition:{
      duration:0.5,
      ease:"easeOut",
    }
  }
};



const Admin = () => {


const [users,setUsers] = useState([]);

const [donations,setDonations] = useState([]);

const [volunteers,setVolunteers] = useState([]);

const [messages,setMessages] = useState([]);

const [stats,setStats] = useState({});


const [readMessages,setReadMessages] =
useState(new Set());



/*
========================
LOAD DATA
========================
*/


const loadAdminData = () => {


const usersData =
getUsers() || [];


const donationData =
getAllDonations() || [];


const volunteerData =
getVolunteerApplications() || [];


const messageData =
getAllMessages() || [];



setUsers(usersData);

setDonations(donationData);

setVolunteers(volunteerData);

setMessages(messageData);



setStats(
getAdminDashboardStats() || {}
);


};



useEffect(()=>{

loadAdminData();

},[]);




/*
========================
ACTIONS
========================
*/


const handleDeleteUser = (id)=>{

deleteUser(id);

loadAdminData();

};



const handleToggleUser = (id)=>{

toggleUserStatus(id);

loadAdminData();

};



const handleVolunteerStatus =
(id,status)=>{

updateVolunteerStatus(
id,
status
);

loadAdminData();

};



const handleDeleteMessage=(id)=>{

deleteMessage(id);

loadAdminData();

};



const unreadMessages =
messages.filter(
(item)=>
!readMessages.has(item.id)
).length;



const markRead=(id)=>{

setReadMessages(
prev=>new Set(prev).add(id)
);

};




return (

<div
className="
min-h-screen
bg-[#F5F1E8]
relative
overflow-hidden
px-6
py-10
"
>


{/* BACKGROUND GLOW */}


<div
className="
absolute
-top-40
-right-40
w-[500px]
h-[500px]
bg-[#7A866E]/10
blur-3xl
rounded-full
"
/>



<div
className="
absolute
bottom-20
-left-40
w-[350px]
h-[350px]
bg-[#7A866E]/10
blur-3xl
rounded-full
"
/>




<div
className="
max-w-7xl
mx-auto
relative
z-10
"
>




{/* =========================
HEADER
========================= */}



<motion.div

initial={{
opacity:0,
y:-20
}}

animate={{
opacity:1,
y:0
}}

transition={{
duration:.5
}}

className="
flex
flex-col
lg:flex-row
lg:items-center
lg:justify-between
gap-8
mb-12
"

>



<div>


<div
className="
inline-flex
items-center
gap-2
px-4
py-2
rounded-full
bg-white/70
border
border-[#7A866E]/20
text-[#7A866E]
text-xs
font-semibold
uppercase
tracking-wide
"
>

<Sparkles size={14}/>

Impact Control Center

</div>



<h1
className="
mt-5
text-5xl
font-bold
text-[#2E332B]
leading-tight
"
>

Welcome back,
<br/>

<span
className="
text-[#7A866E]
"
>
Administrator
</span>

</h1>


<p
className="
mt-4
text-[#2E332B]/60
max-w-xl
text-lg
"
>

Monitor donations, manage supporters,
and track the impact your organization
creates every day.

</p>


</div>




<div
className="
flex
items-center
gap-3
"
>


<button

onClick={loadAdminData}

className="
flex
items-center
gap-2
bg-white
border
border-[#7A866E]/20
px-5
py-3
rounded-full
font-semibold
text-sm
hover:shadow-lg
transition
"

>


<RefreshCw size={17}/>

Refresh

</button>




<div
className="
bg-white
rounded-full
px-5
py-3
flex
items-center
gap-3
shadow-sm
border
border-[#7A866E]/10
"
>


<div
className="
w-10
h-10
rounded-full
bg-[#7A866E]
text-white
flex
items-center
justify-center
"
>

<ShieldCheck size={20}/>

</div>


<div>

<p
className="
text-sm
font-bold
text-[#2E332B]
"
>
Admin
</p>


<p
className="
text-xs
text-[#2E332B]/50
"
>
Full Access
</p>


</div>


</div>


</div>



</motion.div>
// =========================
// QUICK IMPACT OVERVIEW
// =========================


<motion.div

initial="hidden"

whileInView="show"

viewport={{
once:true
}}

variants={fadeUp}

className="
grid
md:grid-cols-3
gap-6
mb-12
"

>



{/* DONATIONS IMPACT */}

<div
className="
bg-white/80
backdrop-blur-xl
border
border-[#7A866E]/10
rounded-[32px]
p-7
shadow-sm
hover:shadow-xl
transition
"
>


<div
className="
w-14
h-14
rounded-2xl
bg-[#7A866E]/10
text-[#7A866E]
flex
items-center
justify-center
mb-5
"
>

<HeartHandshake size={28}/>

</div>



<p
className="
text-sm
font-semibold
text-[#2E332B]/50
uppercase
tracking-wide
"
>

Community Impact

</p>



<h2
className="
text-3xl
font-bold
text-[#2E332B]
mt-2
"
>

₹
{(
stats.totalAmount ||
0
).toLocaleString()}

</h2>


<p
className="
mt-3
text-sm
text-[#2E332B]/50
"
>

Total contribution received
from generous supporters.

</p>


</div>






{/* USERS */}

<div
className="
bg-white/80
backdrop-blur-xl
border
border-[#7A866E]/10
rounded-[32px]
p-7
shadow-sm
hover:shadow-xl
transition
"
>


<div
className="
w-14
h-14
rounded-2xl
bg-[#7A866E]/10
text-[#7A866E]
flex
items-center
justify-center
mb-5
"
>

<Users size={28}/>

</div>


<p
className="
text-sm
font-semibold
text-[#2E332B]/50
uppercase
tracking-wide
"
>

Support Community

</p>



<h2
className="
text-3xl
font-bold
text-[#2E332B]
mt-2
"
>

{
stats.totalUsers || 0
}

</h2>


<p
className="
mt-3
text-sm
text-[#2E332B]/50
"
>

Registered members
supporting the mission.

</p>


</div>







{/* MESSAGES */}


<div
className="
bg-white/80
backdrop-blur-xl
border
border-[#7A866E]/10
rounded-[32px]
p-7
shadow-sm
hover:shadow-xl
transition
"
>


<div
className="
w-14
h-14
rounded-2xl
bg-[#7A866E]/10
text-[#7A866E]
flex
items-center
justify-center
mb-5
"
>

<MessageCircle size={28}/>

</div>



<p
className="
text-sm
font-semibold
text-[#2E332B]/50
uppercase
tracking-wide
"
>

Inbox Activity

</p>


<h2
className="
text-3xl
font-bold
text-[#2E332B]
mt-2
"
>

{
unreadMessages
}

</h2>


<p
className="
mt-3
text-sm
text-[#2E332B]/50
"
>

Unread messages waiting
for your response.

</p>


</div>



</motion.div>





// =========================
// STATISTICS
// =========================


<motion.section

initial="hidden"

whileInView="show"

viewport={{
once:true
}}

variants={fadeUp}

className="
mb-14
"

>


<div
className="
flex
items-center
justify-between
mb-6
"
>


<div>


<h2
className="
text-3xl
font-bold
text-[#2E332B]
"
>

Platform Overview

</h2>


<p
className="
text-[#2E332B]/50
mt-1
"
>

Real-time statistics from your NGO platform.

</p>


</div>



<LayoutDashboard
className="
text-[#7A866E]
"
size={28}
/>



</div>




<AdminStats
stats={stats}
/>


</motion.section>





// =========================
// DONOR MANAGEMENT
// =========================


<motion.section

initial="hidden"

whileInView="show"

viewport={{
once:true,
amount:.1
}}

variants={fadeUp}

className="
bg-white
rounded-[36px]
border
border-[#7A866E]/10
shadow-sm
p-6
md:p-10
"

>


<div
className="
flex
flex-col
md:flex-row
md:items-center
md:justify-between
gap-5
"
>


<div>


<h2
className="
text-3xl
font-bold
text-[#2E332B]
"
>

Donor Community

</h2>


<p
className="
text-[#2E332B]/50
mt-2
"
>

Manage supporters and understand
their contribution journey.

</p>


</div>



<div
className="
px-5
py-2
rounded-full
bg-[#7A866E]/10
text-[#7A866E]
text-sm
font-semibold
"
>

{
donations.length
}

 Donations

</div>



</div>



<div
className="
mt-8
"
>


<DonorTable

users={users}

donations={donations}

refresh={loadAdminData}

/>


</div>



</motion.section>



// =========================
// VOLUNTEER MANAGEMENT
// =========================


<motion.section

initial="hidden"

whileInView="show"

viewport={{
once:true,
amount:.1
}}

variants={fadeUp}

className="
mt-14
bg-white
rounded-[36px]
border
border-[#7A866E]/10
shadow-sm
p-6
md:p-10
"

>



<div
className="
flex
flex-col
md:flex-row
md:items-center
md:justify-between
gap-5
"
>


<div>

<h2
className="
text-3xl
font-bold
text-[#2E332B]
"
>

Volunteer Network

</h2>


<p
className="
text-[#2E332B]/50
mt-2
"
>

Review applications and build
your community team.

</p>


</div>




<div
className="
px-5
py-2
rounded-full
bg-[#7A866E]/10
text-[#7A866E]
text-sm
font-semibold
"
>

{
volunteers.length
}

 Applications

</div>


</div>



<div
className="
mt-8
"
>


<VolunteerTable

volunteers={volunteers}

refresh={loadAdminData}

/>


</div>



</motion.section>







// =========================
// MESSAGE CENTER
// =========================


<motion.section

initial="hidden"

whileInView="show"

viewport={{
once:true,
amount:.1
}}

variants={fadeUp}

className="
mt-14
bg-white
rounded-[36px]
border
border-[#7A866E]/10
shadow-sm
p-6
md:p-10
"

>


<div
className="
flex
items-center
justify-between
mb-8
"
>


<div>

<h2
className="
text-3xl
font-bold
text-[#2E332B]
"
>

Message Center

</h2>


<p
className="
text-[#2E332B]/50
mt-2
"
>

Stay connected with your supporters.

</p>


</div>



{
unreadMessages > 0 &&

<div
className="
px-4
py-2
rounded-full
bg-[#7A866E]
text-white
text-xs
font-semibold
"
>

{
unreadMessages
}

 New

</div>

}


</div>





<div
className="
space-y-4
"
>



{
messages.length === 0 ?


<div
className="
py-16
text-center
"
>


<div
className="
w-16
h-16
mx-auto
rounded-full
bg-[#7A866E]/10
text-[#7A866E]
flex
items-center
justify-center
"
>

<MessageCircle size={28}/>

</div>


<p
className="
mt-4
text-[#2E332B]/50
"
>

No messages available.

</p>


</div>


:


messages.map(message=>{


const unread =
!readMessages.has(message.id);



return (

<motion.div

key={message.id}

whileHover={{
y:-3
}}

onClick={()=>markRead(message.id)}

className={`
flex
items-center
justify-between
gap-5
p-5
rounded-3xl
border
cursor-pointer
transition

${
unread

?
"bg-[#F5F1E8] border-[#7A866E]/30"

:

"bg-white border-[#7A866E]/10"

}

`}

>


<div
className="
flex
items-center
gap-4
min-w-0
"
>


<div
className={`
w-12
h-12
rounded-2xl
flex
items-center
justify-center

${
unread

?
"bg-[#7A866E] text-white"

:

"bg-[#7A866E]/10 text-[#7A866E]"

}

`}
>

<MessageCircle size={20}/>

</div>




<div
className="
min-w-0
"
>

<h3
className="
font-semibold
text-[#2E332B]
"
>

{
message.name
}

</h3>


<p
className="
text-sm
text-[#2E332B]/50
truncate
max-w-xl
"
>

{
message.message
}

</p>


</div>


</div>





<button

onClick={(e)=>{

e.stopPropagation();

handleDeleteMessage(message.id);

}}

className="
px-4
py-2
rounded-full
text-xs
font-semibold
text-red-500
hover:bg-red-50
transition
"

>

Delete

</button>




</motion.div>

)


})


}



</div>


</motion.section>





</div>

</div>

);

};



export default Admin;