import {
  Users,
  IndianRupee,
  Heart,
  UserCheck,
  Clock,
  CheckCircle,
  Target,
  TrendingUp,
} from "lucide-react";

import { motion } from "framer-motion";



const AdminStats = ({ stats }) => {



const cards = [

{
title:"Community Members",
value:stats.totalUsers || 0,
description:"Registered supporters",
icon:Users,
},

{
title:"Active Donors",
value:stats.totalDonors || 0,
description:"People creating impact",
icon:Heart,
},

{
title:"Total Contributions",
value:stats.totalDonations || 0,
description:"Donation transactions",
icon:IndianRupee,
},

{
title:"Funds Raised",
value:`₹${(stats.totalAmount || 0).toLocaleString()}`,
description:"Total impact generated",
icon:TrendingUp,
},

{
title:"Volunteers",
value:stats.totalVolunteers || 0,
description:"Community helpers",
icon:UserCheck,
},

{
title:"Awaiting Review",
value:stats.pendingVolunteers || 0,
description:"Volunteer applications",
icon:Clock,
},

{
title:"Approved Volunteers",
value:stats.approvedVolunteers || 0,
description:"Active team members",
icon:CheckCircle,
},

{
title:"Active Campaigns",
value:stats.activeCampaigns || 0,
description:"Running initiatives",
icon:Target,
},

];



return (


<div
className="
grid
sm:grid-cols-2
xl:grid-cols-4
gap-6
"
>


{
cards.map((card,index)=>{


const Icon = card.icon;



return (

<motion.div

key={card.title}


initial={{
opacity:0,
y:25
}}


animate={{
opacity:1,
y:0
}}


transition={{
duration:.45,
delay:index*.06
}}


whileHover={{
y:-8
}}


className="
group
relative
overflow-hidden
bg-white
rounded-[32px]
border
border-[#7A866E]/10
p-6
shadow-sm
hover:shadow-xl
transition-all
duration-300
"

>


{/* Decorative Glow */}

<div
className="
absolute
-right-10
-top-10
w-32
h-32
rounded-full
bg-[#7A866E]/5
blur-2xl
group-hover:bg-[#7A866E]/10
transition
"
/>



<div
className="
relative
z-10
flex
items-start
justify-between
"
>


<div>


<p
className="
text-sm
font-semibold
text-[#2E332B]/50
"
>

{
card.title
}

</p>



<h2
className="
mt-4
text-4xl
font-bold
text-[#2E332B]
tracking-tight
"
>

{
card.value
}

</h2>



<p
className="
mt-3
text-xs
text-[#2E332B]/45
"
>

{
card.description
}

</p>



</div>





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
group-hover:scale-110
transition-transform
duration-300
"
>

<Icon size={27}/>

</div>



</div>





{/* Bottom Accent */}

<div
className="
mt-6
flex
items-center
gap-2
text-xs
font-semibold
text-[#7A866E]
"
>

<div
className="
w-2
h-2
rounded-full
bg-[#7A866E]
"
/>


Live Platform Data


</div>



</motion.div>


)


})


}



</div>


);


};


export default AdminStats;