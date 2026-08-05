import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Search,
  Eye,
  X,
  Mail,
  Phone,
  Calendar,
  Wallet,
  Users,
  ArrowUpDown,
  Filter,
  Sparkles,
  Copy,
} from "lucide-react";

import {
  getDonors,
  searchUsers,
  toggleUserStatus,
  deleteUser,
  updateUser,
} from "../../utils/adminService";


const DonorTable = ({
  users = [],
  donations = [],
  refresh,
}) => {


  const [search, setSearch] = useState("");

  const [statusFilter,setStatusFilter] =
    useState("All");

  const [sortBy,setSortBy] =
    useState("latest");


  const [selectedDonor,setSelectedDonor] =
    useState(null);


  const [editingDonor,setEditingDonor] =
    useState(null);


  const [formData,setFormData] =
    useState({
      name:"",
      email:"",
      phone:"",
    });



  /*
  =====================================
  DONOR DATA PROCESSING
  =====================================
  */

  const donors = useMemo(()=>{


    let list = getDonors(users);


    list = searchUsers(
      list,
      search
    );


    if(statusFilter !== "All"){

      list =
        list.filter(
          user =>
          (user.accountStatus || "Active")
          === statusFilter
        );

    }



    if(sortBy === "latest"){

      list.sort(
        (a,b)=>
        new Date(b.createdAt || 0)
        -
        new Date(a.createdAt || 0)
      );

    }



    if(sortBy === "highest"){

      list.sort(
        (a,b)=>{


          const donationRecordsA = donations.filter(
            d => String(d.donorId) === String(a.id)
          );
          const totalA = (donationRecordsA.length ? donationRecordsA : (a.donations || []))
            .filter((donation) => donation.status === "Approved")
            .reduce((sum, d) => sum + Number(d.amount || 0), 0);


          const donationRecordsB = donations.filter(
            d => String(d.donorId) === String(b.id)
          );
          const totalB = (donationRecordsB.length ? donationRecordsB : (b.donations || []))
            .filter((donation) => donation.status === "Approved")
            .reduce((sum, d) => sum + Number(d.amount || 0), 0);


          return totalB-totalA;

        }
      );

    }


    return list;


  },[
    users,
    donations,
    search,
    statusFilter,
    sortBy
  ]);





  const getDonationStats = (donorId)=>{


    const donorDonationRecords = donations.filter(
      d => String(d.donorId) === String(donorId)
    );
    const donor = users.find(user => String(user.id) === String(donorId));
    const donorDonations = (donorDonationRecords.length
      ? donorDonationRecords
      : (donor?.donations || []))
      .filter((donation) => donation.status === "Approved");
    const mostRecentDonation = donorDonations
      .slice()
      .sort((a, b) => new Date(b.createdAt || b.date || 0) - new Date(a.createdAt || a.date || 0))[0];


    return {

      count:
      donorDonations.length,


      amount:
      donorDonations.reduce(
        (sum,d)=>
        sum + Number(d.amount || 0),
        0
      ),


      last: mostRecentDonation
        ? new Date(mostRecentDonation.createdAt || mostRecentDonation.date).toLocaleDateString()
        : "No donations yet"

    };


  };





  /*
  =====================================
  ACTIONS
  =====================================
  */


  const _openEdit=(donor)=>{


    setEditingDonor(donor);


    setFormData({

      name:donor.name || "",

      email:donor.email || "",

      phone:donor.phone || ""

    });


  };




  const saveEdit=()=>{


    updateUser(
      editingDonor.id,
      formData
    );


    setEditingDonor(null);


    refresh();


  };





  const _handleStatus=(id)=>{

    toggleUserStatus(id);

    refresh();

  };





  const _handleDelete=(id)=>{


    if(
      !window.confirm(
        "Delete this donor?"
      )
    )
    return;



    deleteUser(id);


    refresh();


  };

  const copyContact = (value) => {
    if (value) navigator.clipboard?.writeText(value);
  };

  const selectedDonorStats = selectedDonor
    ? getDonationStats(selectedDonor.id)
    : null;
  const selectedDonorHistory = selectedDonor
    ? (() => {
        const records = donations.filter(d => String(d.donorId) === String(selectedDonor.id));
        return records.length ? records : (selectedDonor.donations || []);
      })()
    : [];






  return (

<div
className="
bg-[#F5F1E8]
rounded-2xl
px-4
py-3
text-center
"
>


{/* =====================================
      HEADER TOOLBAR
===================================== */}


<div
className="
bg-white
rounded-3xl
border
border-[#7A866E]/10
shadow-sm
p-6
mb-6
"
>


<div
className="
flex
flex-col
xl:flex-row
xl:items-center
xl:justify-between
gap-5
"
>


<div>


<div
className="
flex
items-center
gap-2
text-[#7A866E]
text-xs
font-bold
uppercase
tracking-wider
"
>

<Sparkles size={14}/>

Donor Intelligence

</div>


<h3
className="
text-2xl
font-bold
text-[#2E332B]
mt-2
"
>

Manage Donors

</h3>


<p
className="
text-sm
text-[#2E332B]/50
mt-1
"
>

Track supporters, contributions and engagement.

</p>


</div>



<div
className="
flex
items-center
gap-3
"
>


<div
className="
bg-[#7A866E]/10
text-[#7A866E]
px-4
py-3
rounded-2xl
flex
items-center
gap-2
text-sm
font-semibold
"
>

<Users size={16}/>

{donors.length}

Donors

</div>


</div>


</div>





<div
className="
grid
lg:grid-cols-3
gap-3
mt-6
"
>


<div
className="
flex
items-center
gap-3
bg-[#F5F1E8]
rounded-2xl
px-4
py-3
border
border-[#7A866E]/10
"
>

<Search
size={18}
className="text-[#7A866E]"
/>


<input

value={search}

onChange={
e=>setSearch(e.target.value)
}

placeholder="Search donor..."

className="
bg-transparent
outline-none
w-full
text-sm
text-[#2E332B]
"
/>


</div>





<div
className="
flex
items-center
gap-2
"
>


<Filter
size={16}
className="text-[#7A866E]"
/>


<select

value={statusFilter}

onChange={
e=>setStatusFilter(e.target.value)
}

className="
flex-1
px-4
py-3
rounded-2xl
bg-white
border
border-[#7A866E]/15
text-sm
outline-none
"
>

<option>All</option>

<option>Active</option>

<option>Blocked</option>

</select>


</div>






<div
className="
flex
items-center
gap-2
"
>


<ArrowUpDown
size={16}
className="text-[#7A866E]"
/>


<select

value={sortBy}

onChange={
e=>setSortBy(e.target.value)
}

className="
flex-1
px-4
py-3
rounded-2xl
bg-white
border
border-[#7A866E]/15
text-sm
outline-none
"
>


<option value="latest">
Latest Joined
</option>


<option value="highest">
Highest Donation
</option>


</select>


</div>


</div>


</div>
{/* =====================================
      EMPTY STATE
===================================== */}

{
donors.length === 0 && (

<div
className="
rounded-3xl
border
border-[#7A866E]/10
bg-white
py-20
text-center
"
>

<div
className="
w-16
h-16
mx-auto
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


<h3
className="
text-lg
font-bold
text-[#2E332B]
"
>

No donors found

</h3>


<p
className="
text-sm
text-[#2E332B]/50
mt-2
"
>

Try changing your search or filters.

</p>


</div>

)

}




{/* =====================================
      DESKTOP TABLE
===================================== */}


{
donors.length > 0 && (

<div
className="
hidden
lg:block
overflow-hidden
rounded-3xl
border
border-[#7A866E]/10
bg-white
shadow-sm
"
>


<table
className="
w-full
"
>


<thead
className="
bg-[#F8F6F1]
"
>

<tr>


<th
className="
px-6
py-4
text-left
text-xs
font-bold
uppercase
tracking-wider
text-[#66785F]
"
>
Donor
</th>


<th
className="
px-6
py-4
text-left
text-xs
font-bold
uppercase
tracking-wider
text-[#66785F]
"
>
Impact
</th>



<th
className="
px-6
py-4
text-left
text-xs
font-bold
uppercase
tracking-wider
text-[#66785F]
"
>
Last Donation
</th>



<th
className="
px-6
py-4
text-left
text-xs
font-bold
uppercase
tracking-wider
text-[#66785F]
"
>
Status
</th>



<th
className="
px-6
py-4
text-center
text-xs
font-bold
uppercase
tracking-wider
text-[#66785F]
"
>
Actions
</th>


</tr>

</thead>





<tbody>


{
donors.map((donor)=>{


const stats =
getDonationStats(
donor.id
);



const blocked =
(donor.accountStatus || "Active")
==="Blocked";

const donorEngagement =
stats.count >= 3
? "Regular Donor"
: stats.count > 0
? "Active Donor"
: "New Donor";




return (

<tr

key={donor.id}

className="
border-t
border-[#E9E0D5]
hover:bg-[#F8F6F1]
transition-all
duration-300
group
"

>


{/* DONOR PROFILE */}


<td
className="
px-6
py-6
"
>


<div
className="
flex
items-center
gap-4
"
>


<div
className="
w-13
h-13
rounded-full
bg-[#F0E7DB]
text-[#7A866E]
flex
items-center
justify-center
font-bold
text-lg
shadow-sm
"
>

{
donor.name
?.charAt(0)
.toUpperCase()
}

</div>



<div
className="
min-w-0
"
>


<p
className="
text-base
text-sm
font-bold
text-[#66785F]
truncate
"
>

{donor.name}

</p>


<p
className="
text-sm
text-gray-500
truncate
"
>

{donor.email}

</p>


</div>


</div>


</td>






{/* IMPACT */}


<td
className="
px-6
py-6
"
>


<div
className="
flex
items-center
gap-3
"
>


<div
className="
bg-[#7A866E]/10
rounded-2xl
px-4
py-3
text-center
"
>

<p
className="
text-sm
font-bold
text-[#66785F]
"
>

{stats.count}

</p>

<p
className="
text-[10px]
uppercase
font-bold
tracking-wide
text-gray-500
"
>

Donations

</p>


</div>





<div
className="
bg-[#F5F1E8]
rounded-2xl
px-4
py-3
text-center
"
>

<p
className="
text-sm
font-bold
text-[#66785F]
"
>

₹
{stats.amount.toLocaleString()}

</p>


<p
className="
text-[10px]
uppercase
font-bold
tracking-wide
text-gray-500
"
>

Total Impact

</p>


</div>


</div>


</td>






{/* LAST DONATION */}


<td
className="
px-6
py-5
"
>


<div
className="
flex
items-center
gap-2
text-sm
text-[#2E332B]/60
"
>

<Calendar size={15}/>

{stats.last}

</div>


</td>






{/* STATUS */}


<td
className="
px-6
py-5
"
>


{
blocked

?

<span
className="
inline-flex
items-center
px-4
py-1.5
rounded-full
bg-red-100
text-red-700
text-xs
font-bold
"
>

Blocked

</span>


:


<span
className="
inline-flex
items-center
px-4
py-1.5
rounded-full
bg-[#7A866E]/10
text-[#7A866E]
text-xs
font-bold
"
>

{donorEngagement}

</span>

}


</td>






{/* ACTIONS */}


<td
className="
px-6
py-5
"
>


<div
className="
flex
justify-center
gap-2
"
>


<button

onClick={()=>
setSelectedDonor(donor)
}

title="View donor details"
aria-label="View donor details"

className="
w-10
h-10
rounded-xl
bg-[#F5F1E8]
text-[#2E332B]/60
hover:bg-[#7A866E]
hover:text-white
transition-all
"

>

<Eye size={17}/>

</button>

<button
onClick={()=>setSelectedDonor(donor)}
title="View donation history"
aria-label="View donation history"
className="w-10 h-10 rounded-xl bg-[#F0E7DB] text-[#66785F] transition-all hover:-translate-y-0.5 hover:bg-[#66785F] hover:text-white"
>
<Wallet size={17}/>
</button>







</div>


</td>



</tr>


)


})

}


</tbody>


</table>


</div>

)

}
{/* =====================================
      MOBILE DONOR CARDS
===================================== */}


{
donors.length > 0 && (

<div
className="
lg:hidden
space-y-5
"
>


{
donors.map((donor)=>{


const stats =
getDonationStats(
donor.id
);


const blocked =
(donor.accountStatus || "Active")
==="Blocked";



return (

<motion.div

key={donor.id}

whileHover={{
y:-3
}}

className="
bg-white
rounded-3xl
border
border-[#7A866E]/10
shadow-sm
p-5
"

>


{/* PROFILE HEADER */}


<div
className="
flex
items-center
justify-between
gap-3
"
>


<div
className="
flex
items-center
gap-3
min-w-0
"
>


<div
className="
w-12
h-12
rounded-2xl
bg-[#7A866E]/10
text-[#7A866E]
flex
items-center
justify-center
font-bold
text-lg
shrink-0
"
>

{
donor.name
?.charAt(0)
.toUpperCase()
}

</div>




<div
className="
min-w-0
"
>


<h3
className="
font-bold
text-[#2E332B]
truncate
"
>

{donor.name}

</h3>


<p
className="
text-xs
text-[#2E332B]/45
truncate
"
>

{donor.email}

</p>


</div>


</div>





<span

className={`
px-3
py-1.5
rounded-full
text-xs
font-bold
shrink-0
${
blocked
?
"bg-red-100 text-red-700"
:
"bg-[#7A866E]/10 text-[#7A866E]"
}
`}

>

{
blocked
?
"Blocked"
:
"Active"
}

</span>


</div>







{/* IMPACT BOXES */}



<div
className="
grid
grid-cols-3
gap-3
mt-5
"
>


<div
className="
bg-[#F5F1E8]
rounded-2xl
p-3
text-center
"
>

<p
className="
font-bold
text-[#2E332B]
"
>

{stats.count}

</p>


<p
className="
text-[10px]
uppercase
text-[#2E332B]/40
mt-1
"
>

Donations

</p>


</div>




<div
className="
bg-[#F5F1E8]
rounded-2xl
p-3
text-center
"
>


<p
className="
font-bold
text-[#2E332B]
text-sm
"
>

₹
{stats.amount.toLocaleString()}

</p>


<p
className="
text-[10px]
uppercase
text-[#2E332B]/40
mt-1
"
>

Raised

</p>


</div>





<div
className="
bg-[#F5F1E8]
rounded-2xl
p-3
text-center
"
>


<p
className="
font-bold
text-[#2E332B]
text-xs
"
>

{stats.last}

</p>


<p
className="
text-[10px]
uppercase
text-[#2E332B]/40
mt-1
"
>

Latest

</p>


</div>



</div>








{/* ACTIONS */}


<div
className="
grid
grid-cols-2
gap-2
mt-5
"
>



<button

onClick={()=>
setSelectedDonor(donor)
}

className="
h-10
rounded-xl
bg-[#F5F1E8]
text-[#2E332B]/70
flex
items-center
justify-center
hover:bg-[#7A866E]
hover:text-white
transition
"

>

<Eye size={16}/>

</button>






<button

onClick={()=>
setSelectedDonor(donor)
}

className="
h-10
rounded-xl
bg-[#F0E7DB]
text-[#66785F]
flex
items-center
justify-center
hover:bg-[#7A866E]
hover:text-white
transition
"

>

<Wallet size={16}/>

</button>










</div>



</motion.div>


)


})

}



</div>

)

}{/* =====================================
      DONOR PROFILE MODAL
===================================== */}

<AnimatePresence>

{
selectedDonor && (

<motion.div

initial={{
opacity:0
}}

animate={{
opacity:1
}}

exit={{
opacity:0
}}

className="
fixed
inset-0
z-50
bg-[#2E332B]/60
backdrop-blur-sm
flex
items-center
justify-center
p-5
"

onClick={()=>
setSelectedDonor(null)
}

>


<motion.div

initial={{
opacity:0,
scale:.95,
y:20
}}

animate={{
opacity:1,
scale:1,
y:0
}}

exit={{
opacity:0,
scale:.95,
y:20
}}

onClick={
e=>e.stopPropagation()
}

className="
bg-white
rounded-[32px]
w-full
max-w-3xl
max-h-[90vh]
overflow-y-auto
p-7
shadow-2xl
"

>


<div
className="
flex
items-start
justify-between
"
>


<div
className="
flex
items-center
gap-4
"
>


<div
className="
w-16
h-16
rounded-3xl
bg-[#7A866E]/10
text-[#7A866E]
flex
items-center
justify-center
text-2xl
font-bold
"
>

{
selectedDonor.name
?.charAt(0)
.toUpperCase()
}

</div>


<div>

<h2
className="
text-2xl
font-bold
text-[#2E332B]
"
>

{selectedDonor.name}

</h2>


<p
className="
text-sm
text-[#2E332B]/45
"
>

Donor Profile

</p>


</div>


</div>




<button

onClick={()=>
setSelectedDonor(null)
}

className="
w-10
h-10
rounded-full
bg-[#F5F1E8]
flex
items-center
justify-center
"

>

<X size={18}/>

</button>


</div>






{/* INFO CARDS */}


<div
className="
grid
sm:grid-cols-2
gap-4
mt-8
"
>


<div
className="
bg-[#F5F1E8]
rounded-2xl
p-4
"
>

<Mail
size={18}
className="text-[#7A866E] mb-2"
/>

<p
className="
text-xs
text-[#2E332B]/45
"
>
Email
</p>

<p
className="
font-semibold
text-sm
truncate
"
>
{selectedDonor.email}
</p>

<button onClick={() => copyContact(selectedDonor.email)} className="mt-3 inline-flex items-center gap-1 rounded-lg bg-white px-2.5 py-1.5 text-xs font-bold text-[#66785F] shadow-sm transition hover:bg-[#66785F] hover:text-white"><Copy size={12} />Copy email</button>

</div>





<div
className="
bg-[#F5F1E8]
rounded-2xl
p-4
"
>

<Phone
size={18}
className="text-[#7A866E] mb-2"
/>

<p
className="
text-xs
text-[#2E332B]/45
"
>
Phone
</p>

<p
className="
font-semibold
text-sm
"
>
{selectedDonor.phone || "N/A"}
</p>

{selectedDonor.phone && <button onClick={() => copyContact(selectedDonor.phone)} className="mt-3 inline-flex items-center gap-1 rounded-lg bg-white px-2.5 py-1.5 text-xs font-bold text-[#66785F] shadow-sm transition hover:bg-[#66785F] hover:text-white"><Copy size={12} />Copy phone</button>}

</div>





</div>







<div className="mt-5 grid grid-cols-3 gap-3">
<div className="rounded-2xl bg-[#F5F1E8] p-4"><p className="text-[10px] font-bold uppercase tracking-wide text-gray-500">Donations</p><p className="mt-1 text-xl font-bold text-[#66785F]">{selectedDonorStats?.count || 0}</p></div>
<div className="rounded-2xl bg-[#F5F1E8] p-4"><p className="text-[10px] font-bold uppercase tracking-wide text-gray-500">Total Impact</p><p className="mt-1 text-xl font-bold text-[#66785F]">₹{selectedDonorStats?.amount?.toLocaleString() || 0}</p></div>
<div className="rounded-2xl bg-[#F5F1E8] p-4"><p className="text-[10px] font-bold uppercase tracking-wide text-gray-500">Latest Donation</p><p className="mt-1 text-xs font-bold leading-5 text-[#2E332B]">{selectedDonorStats?.last || "No donations yet"}</p></div>
</div>

{/* DONATION HISTORY */}


<div
className="
mt-8
"
>


<h3
className="
font-bold
text-lg
text-[#2E332B]
mb-4
"
>

Donation Journey

</h3>



{

selectedDonorHistory.length===0

?


<p
className="
text-sm
text-[#2E332B]/50
"
>

No donations yet.

</p>


:


<div
className="
space-y-3
"
>


{

selectedDonorHistory.map(donation=>(


<div

key={donation.id}

className="
flex
items-center
justify-between
bg-[#F5F1E8]
rounded-2xl
p-4
"

>


<div>

<p
className="
font-semibold
text-[#2E332B]
"
>

{donation.campaign}

</p>


<p
className="
text-xs
text-[#2E332B]/45
"
>

{
new Date(
donation.createdAt
)
.toLocaleDateString()
}

</p>


</div>



<p
className="
font-bold
text-[#7A866E]
"
>

₹
{donation.amount}

</p>


</div>


))


}


</div>

}


</div>





</motion.div>


</motion.div>

)

}

</AnimatePresence>







{/* =====================================
      EDIT DONOR MODAL
===================================== */}



<AnimatePresence>

{

editingDonor && (

<motion.div

initial={{
opacity:0
}}

animate={{
opacity:1
}}

exit={{
opacity:0
}}

className="
fixed
inset-0
z-50
bg-[#2E332B]/60
backdrop-blur-sm
flex
items-center
justify-center
p-5
"

onClick={()=>
setEditingDonor(null)
}

>


<motion.div

initial={{
scale:.95,
opacity:0
}}

animate={{
scale:1,
opacity:1
}}

exit={{
scale:.95,
opacity:0
}}

onClick={
e=>e.stopPropagation()
}

className="
bg-white
rounded-[32px]
p-7
w-full
max-w-lg
shadow-2xl
"

>


<div
className="
flex
justify-between
items-center
mb-6
"
>


<h2
className="
text-xl
font-bold
text-[#2E332B]
"
>

Edit Donor

</h2>



<button

onClick={()=>
setEditingDonor(null)
}

>

<X size={20}/>

</button>


</div>





<div
className="
space-y-4
"
>


{

[
["name","Name"],
["email","Email"],
["phone","Phone"]

].map(
([key,label])=>(


<div key={key}>


<label
className="
text-xs
font-bold
text-[#2E332B]/50
uppercase
"
>

{label}

</label>


<input

value={
formData[key]
}

onChange={
e=>
setFormData({
...formData,
[key]:e.target.value
})
}

className="
mt-2
w-full
bg-[#F5F1E8]
rounded-xl
p-3
outline-none
border
border-[#7A866E]/10
"

/>


</div>


))

}


</div>





<div
className="
flex
justify-end
gap-3
mt-8
"
>


<button

onClick={()=>
setEditingDonor(null)
}

className="
px-5
py-3
rounded-full
border
text-sm
font-semibold
"

>

Cancel

</button>



<button

onClick={saveEdit}

className="
px-6
py-3
rounded-full
bg-[#7A866E]
text-white
font-semibold
text-sm
"

>

Save Changes

</button>


</div>




</motion.div>


</motion.div>


)

}

</AnimatePresence>



</div>

);

};


export default DonorTable;
