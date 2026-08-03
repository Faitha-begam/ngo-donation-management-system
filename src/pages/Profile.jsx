// pages/Profile.jsx

import { useEffect, useState } from "react";

import {
  getCurrentUser,
  updateCurrentUser
} from "../utils/auth";
import { getEmergencyRequests } from "../utils/emergencyStorage";
import { calculateEmergencyTrustScore } from "../utils/trustScore";
import HopeBadge from "../components/HopeBadge";
import { calculateRank, getHopePoints, HOPE_POINTS_UPDATED } from "../utils/hopePoints";



const Profile = () => {


  const currentUser = getCurrentUser();



  const [formData,setFormData] = useState({

    name:
    currentUser?.name || "",

    email:
    currentUser?.email || "",

    phone:
    currentUser?.phone || "",

  });



  const [message,setMessage] =
  useState("");

  const [, setRefreshVersion] = useState(0);

  useEffect(() => {
    const refreshProfileData = () => setRefreshVersion((version) => version + 1);
    window.addEventListener(HOPE_POINTS_UPDATED, refreshProfileData);
    window.addEventListener("emergencyRequestsUpdated", refreshProfileData);
    window.addEventListener("storage", refreshProfileData);
    return () => {
      window.removeEventListener(HOPE_POINTS_UPDATED, refreshProfileData);
      window.removeEventListener("emergencyRequestsUpdated", refreshProfileData);
      window.removeEventListener("storage", refreshProfileData);
    };
  }, [currentUser?.id]);






  if(!currentUser){

    return (

      <div
      className="
      min-h-screen
      bg-[#F5F1E8]
      flex
      items-center
      justify-center
      "
      >

        <h2 className="text-xl font-semibold">

          Please login to view profile.

        </h2>

      </div>

    );

  }









  const handleChange=(e)=>{


    setFormData({

      ...formData,

      [e.target.name]:
      e.target.value

    });


    setMessage("");

  };









  const handleSubmit=(e)=>{


    e.preventDefault();



    const updatedUser={


      ...currentUser,


      name:
      formData.name,


      phone:
      formData.phone


    };




    updateCurrentUser(
      updatedUser
    );



    setMessage(
      "Profile updated successfully!"
    );



  };









  const joinedDate =

  currentUser.joinedDate ||

  currentUser.createdAt;

  const emergencyRequests = getEmergencyRequests();
  const createdEmergencyRequests = emergencyRequests.filter(
    request => String(request.creatorId) === String(currentUser.id)
  );
  const completedEmergencyRequests = createdEmergencyRequests.filter(
    request => request.status === "completed"
  );
  const helpProvided = emergencyRequests.reduce(
    (total, request) => total + (request.supporters || []).filter(
      supporter => String(supporter.userId) === String(currentUser.id)
    ).length,
    0
  );
  const averageTrustScore = createdEmergencyRequests.length
    ? Math.round(createdEmergencyRequests.reduce(
      (total, request) => total + calculateEmergencyTrustScore(request).score,
      0
    ) / createdEmergencyRequests.length)
    : 0;
  const trustLevel = averageTrustScore >= 70
    ? "Trusted"
    : averageTrustScore >= 40
      ? "Building Trust"
      : "New Contributor";
  const hope = getHopePoints(currentUser.id);
  const currentRank = calculateRank(hope.points);









  return (



<div

className="

min-h-screen

bg-[#F5F1E8]

px-5

py-10

"

>



<div

className="

max-w-6xl

mx-auto

"

>









{/* PROFILE HEADER */}



<div

className="

bg-[#7A866E]

rounded-3xl

p-8

text-white

shadow-xl

flex

flex-col

md:flex-row

items-center

gap-6

"

>





<div

className="

w-28

h-28

rounded-full

bg-[#DCCFC0]

flex

items-center

justify-center

text-[#3A4035]

text-5xl

font-bold

shadow-lg

"

>


{

currentUser.name

.charAt(0)

.toUpperCase()

}



</div>



{/* EMERGENCY ACTIVITY */}

<div className="bg-white rounded-3xl shadow-lg p-8 mt-10">

<h2 className="text-2xl font-bold text-[#3A4035] mb-6">

Emergency Activity

</h2>

<div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">

<EmergencyActivityCard label="Requests Created" value={createdEmergencyRequests.length} />
<EmergencyActivityCard label="Requests Completed" value={completedEmergencyRequests.length} />
<EmergencyActivityCard label="Help Provided" value={helpProvided} />
<EmergencyActivityCard label="Trust Level" value={trustLevel} detail={`${averageTrustScore}% trust score`} />

</div>

</div>


{/* COMMUNITY IMPACT */}

<div className="bg-gradient-to-br from-[#2E332B] to-[#66785F] rounded-3xl shadow-xl p-8 mt-8 text-white">

<div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
  <div>
    <p className="text-[#DCCFC0] font-semibold uppercase tracking-wider text-sm">Community Impact</p>
    <h2 className="text-3xl font-bold mt-2">Your Hope Journey</h2>
  </div>
  <HopeBadge points={hope.points} />
</div>

<div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4 mt-8">
  <ImpactStatistic label="Total Donations" value={currentUser.donations?.length || 0} />
  <ImpactStatistic label="Emergency Help" value={helpProvided} />
  <ImpactStatistic label="Volunteer Activity" value={currentUser.volunteerStatus === "Approved" ? "Active" : "Not active"} />
  <ImpactStatistic label="Hope Points" value={hope.points} />
  <ImpactStatistic label="Current Rank" value={currentRank} />
</div>

</div>







<div

className="

text-center

md:text-left

"

>


<h1

className="

text-4xl

font-bold

"

>

{currentUser.name}

</h1>




<p className="mt-2 text-[#F5F1E8]">

{currentUser.email}

</p>




<span

className="

inline-block

mt-4

bg-white

text-[#7A866E]

px-5

py-2

rounded-full

font-semibold

"

>

{currentUser.role || "Donor"}

</span>



</div>




</div>













{/* STATISTICS */}



<div

className="

grid

md:grid-cols-3

gap-6

mt-8

"

>





<div className="bg-white rounded-2xl p-6 shadow-lg">


<p className="text-gray-500">

Total Donations

</p>


<h3

className="

text-3xl

font-bold

text-[#7A866E]

mt-3

"

>

{

currentUser.donations?.length || 0

}

</h3>


</div>







<div className="bg-white rounded-2xl p-6 shadow-lg">


<p className="text-gray-500">

Volunteer Status

</p>



<h3

className="

text-xl

font-bold

text-[#7A866E]

mt-4

"

>

{

currentUser.volunteerStatus ||

"Not Applied"

}

</h3>


</div>







<div className="bg-white rounded-2xl p-6 shadow-lg">


<p className="text-gray-500">

Member Since

</p>


<h3

className="

text-xl

font-bold

text-[#7A866E]

mt-4

"

>

{

joinedDate

?

new Date(joinedDate)
.toLocaleDateString()

:

"N/A"

}


</h3>


</div>




</div>














<div

className="

grid

lg:grid-cols-2

gap-8

mt-10

"

>









{/* EDIT PROFILE */}



<div

className="

bg-white

rounded-3xl

shadow-lg

p-8

"

>


<h2

className="

text-2xl

font-bold

text-[#3A4035]

mb-6

"

>

Personal Information

</h2>





{

message &&

<div

className="

bg-green-100

text-green-700

px-4

py-3

rounded-xl

mb-5

"

>

{message}

</div>

}







<form

onSubmit={handleSubmit}

className="space-y-5"

>







<div>


<label className="block mb-2 font-medium">

Full Name

</label>


<input


name="name"


value={formData.name}


onChange={handleChange}



className="

w-full

border

rounded-xl

px-4

py-3

outline-none

focus:ring-2

focus:ring-[#7A866E]

"

/>


</div>








<div>


<label className="block mb-2 font-medium">

Email

</label>


<input


value={formData.email}


disabled


className="

w-full

border

rounded-xl

px-4

py-3

bg-gray-100

"

/>


</div>








<div>


<label className="block mb-2 font-medium">

Phone Number

</label>


<input


name="phone"


value={formData.phone}


onChange={handleChange}



className="

w-full

border

rounded-xl

px-4

py-3

outline-none

focus:ring-2

focus:ring-[#7A866E]

"

/>


</div>








<button

className="

w-full

bg-[#7A866E]

hover:bg-[#67725C]

text-white

py-3

rounded-xl

font-semibold

transition

"

>

Save Changes

</button>





</form>


</div>















{/* ACTIVITY */}



<div

className="

bg-white

rounded-3xl

shadow-lg

p-8

"

>


<h2

className="

text-2xl

font-bold

text-[#3A4035]

mb-8

"

>

Recent Activity

</h2>





<div className="space-y-6">



{

currentUser.activities?.length > 0 ?


currentUser.activities.map(activity=>(


<div

key={activity.id}

className="

border-l-4

border-[#7A866E]

pl-5

"

>


<h3 className="font-semibold">

{activity.title}

</h3>



<p className="text-gray-500 text-sm mt-1">

{activity.description}

</p>




<p className="text-xs text-gray-400 mt-2">

{

new Date(activity.date)

.toLocaleDateString()

}

</p>



</div>



))


:

<div className="text-gray-500">

No recent activity found.

</div>



}



</div>



</div>






</div>








</div>



</div>



  );

};



export default Profile;

const EmergencyActivityCard = ({ label, value, detail }) => (
  <div className="rounded-2xl border border-[#DCCFC0] bg-[#F8F6F1] p-5">
    <p className="text-sm text-gray-500">{label}</p>
    <p className="mt-2 text-2xl font-bold text-[#7A866E]">{value}</p>
    {detail && <p className="mt-1 text-xs text-gray-500">{detail}</p>}
  </div>
);

const ImpactStatistic = ({ label, value }) => (
  <div className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-sm">
    <p className="text-xs text-white/65">{label}</p>
    <p className="mt-2 text-lg font-bold">{value}</p>
  </div>
);
