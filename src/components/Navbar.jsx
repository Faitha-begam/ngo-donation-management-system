import { useState, useEffect, useRef } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import {
  ChevronDown,
  Menu,
  X,
  UserRound,
  LogOut,
  ShieldCheck,
  HeartHandshake,
  Award,
  PlusCircle,
  Map,
} from "lucide-react";
import { motion } from "framer-motion";

import logo from "../assets/Banner.png";
import { getCurrentUser, logoutUser } from "../utils/auth";
import NotificationBell from "./NotificationBell";


export default function Navbar() {


  const [menuOpen,setMenuOpen] = useState(false);
  const [communityOpen,setCommunityOpen] = useState(false);
  const [userOpen,setUserOpen] = useState(false);
  const [user,setUser] = useState(null);


  const navigate = useNavigate();


  const communityRef = useRef();
  const userRef = useRef();



  useEffect(()=>{

    setUser(
      getCurrentUser()
    );

  },[]);



  useEffect(()=>{


    const closeDropdown = (e)=>{


      if(
        communityRef.current &&
        !communityRef.current.contains(e.target)
      ){

        setCommunityOpen(false);

      }


      if(
        userRef.current &&
        !userRef.current.contains(e.target)
      ){

        setUserOpen(false);

      }


    };


    document.addEventListener(
      "mousedown",
      closeDropdown
    );


    return ()=>{

      document.removeEventListener(
        "mousedown",
        closeDropdown
      );

    };


  },[]);




  const handleLogout=()=>{

    logoutUser();

    setUser(null);

    setUserOpen(false);

    setMenuOpen(false);

    navigate("/");

  };



  const mainLinks=[

    {
      name:"Home",
      path:"/"
    },

    {
      name:"Campaigns",
      path:"/campaigns"
    },

    {
      name:"Donate",
      path:"/donate"
    },

    {
      name:"Volunteer",
      path:"/volunteer"
    },

    {
      name:"Contact",
      path:"/contact"
    }

  ];



  const communityLinks=[

    {
      name:"Emergency Requests",
      path:"/emergency-requests",
      icon:HeartHandshake
    },


    {
      name:"Create Request",
      path:"/create-emergency-request",
      icon:PlusCircle,
      auth:true
    },


    {
      name:"Community Heroes",
      path:"/community-heroes",
      icon:Award
    },
    {
      name:"Hope Map",
      path:"/hope-map",
      icon:Map
    }

  ];



  return (


<header
className="
sticky
top-0
z-50
bg-[#7A866E]/90
backdrop-blur-lg
shadow-lg
"
>


<nav
className="
max-w-7xl
mx-auto
flex
items-center
justify-between
px-5
lg:px-8
py-3
"
>



{/* LOGO */}


<Link
to="/"
className="
flex
items-center
shrink-0
"
>


<img

src={logo}

alt="HopeBridge"

className="
h-12
w-12
rounded-full
"

>


</img>


<h1
className="
ml-2
text-2xl
font-bold
text-[#F5F1E8]
"
>

Hope
<span className="text-[#DCCFC0]">
Bridge
</span>

</h1>


</Link>






{/* DESKTOP MENU */}


<div
className="
hidden
lg:flex
items-center
gap-2
"
>


{
mainLinks.map((item)=>(


<NavLink

key={item.name}

to={item.path}

className={({isActive})=>

`
px-3
py-2
rounded-lg
text-sm
font-medium
transition

${
isActive

?
"bg-[#DCCFC0] text-[#3A4035]"

:

"text-[#F5F1E8] hover:bg-[#DCCFC0] hover:text-[#3A4035]"

}

`

}

>

{item.name}

</NavLink>


))

}




{/* COMMUNITY DROPDOWN */}


<div
ref={communityRef}
className="relative"
>


<button

onClick={()=>setCommunityOpen(!communityOpen)}

className="
flex
items-center
gap-1
px-3
py-2
rounded-lg
text-sm
font-medium
text-[#F5F1E8]
hover:bg-[#DCCFC0]
hover:text-[#3A4035]
"

>

Community

<ChevronDown
className={`
h-4
w-4
transition
${communityOpen?"rotate-180":""}
`}
/>

</button>



{
communityOpen &&

<motion.div

initial={{
opacity:0,
y:-10
}}

animate={{
opacity:1,
y:0
}}

className="
absolute
top-12
left-0
w-60
rounded-2xl
bg-white
shadow-xl
p-2
"

>


{
communityLinks.map((item)=>{


if(item.auth && !user)
return null;


const Icon=item.icon;


return (

<Link

key={item.name}

to={item.path}

onClick={()=>setCommunityOpen(false)}

className="
flex
items-center
gap-3
px-4
py-3
rounded-xl
text-gray-700
hover:bg-[#F5F1E8]
"

>


<Icon
className="
h-5
w-5
text-[#66785F]
"
/>


{item.name}


</Link>


)


})

}


</motion.div>


}


</div>


</div>







{/* RIGHT SIDE */}


<div
className="
hidden
lg:flex
items-center
gap-4
"
>


<NotificationBell />



<Link

to="/donate"

className="
rounded-full
bg-[#DCCFC0]
px-5
py-2
text-sm
font-semibold
text-[#3A4035]
hover:bg-[#F5F1E8]
transition
"

>

Donate

</Link>




{/* USER */}


{
!user ?


<>

<Link
to="/login"
className="
text-[#F5F1E8]
text-sm
font-medium
"
>

Login

</Link>


<Link
to="/register"
className="
text-[#F5F1E8]
text-sm
font-medium
"
>

Register

</Link>

</>


:

<div
ref={userRef}
className="relative"
>


<button

onClick={()=>setUserOpen(!userOpen)}

className="
flex
items-center
gap-2
text-[#F5F1E8]
"

>


<div
className="
h-10
w-10
rounded-full
bg-[#DCCFC0]
text-[#3A4035]
flex
items-center
justify-center
font-bold
"

>

{
user.name
?.charAt(0)
.toUpperCase()
}

</div>


</button>



{
userOpen &&


<motion.div

initial={{
opacity:0,
y:-10
}}

animate={{
opacity:1,
y:0
}}

className="
absolute
right-0
mt-3
w-52
rounded-2xl
bg-white
shadow-xl
overflow-hidden
"

>


{
user.role==="admin"


?

<Link
to="/admin"
className="
flex
gap-2
items-center
px-5
py-3
hover:bg-gray-100
"
>

<ShieldCheck size={18}/>

Admin Dashboard

</Link>


:

<Link
to="/profile"
className="
flex
gap-2
items-center
px-5
py-3
hover:bg-gray-100
"
>

<UserRound size={18}/>

Profile

</Link>

}



<button

onClick={handleLogout}

className="
flex
gap-2
items-center
w-full
px-5
py-3
text-red-600
hover:bg-red-50
"

>

<LogOut size={18}/>

Logout

</button>



</motion.div>


}



</div>


}



</div>







{/* MOBILE BUTTON */}


<button

onClick={()=>setMenuOpen(!menuOpen)}

className="
lg:hidden
text-[#F5F1E8]
"

>


{
menuOpen
?

<X size={30}/>

:

<Menu size={30}/>

}


</button>



</nav>





{/* MOBILE MENU */}

{
menuOpen &&

<motion.div

initial={{
height:0
}}

animate={{
height:"auto"
}}

className="
lg:hidden
bg-[#3A4035]
px-5
py-5
"

>


{

mainLinks.map((item)=>(

<NavLink

key={item.name}

to={item.path}

onClick={()=>setMenuOpen(false)}

className="
block
px-4
py-3
rounded-lg
text-[#F5F1E8]
hover:bg-[#DCCFC0]
hover:text-[#3A4035]
"

>

{item.name}

</NavLink>


))

}




<div
className="
mt-3
border-t
border-[#DCCFC0]/30
pt-3
"

>


{
communityLinks.map((item)=>{


if(item.auth && !user)
return null;


return (

<Link

key={item.name}

to={item.path}

onClick={()=>setMenuOpen(false)}

className="
block
px-4
py-3
text-[#F5F1E8]
"

>

{item.name}

</Link>

)


})

}


</div>



<Link

to="/donate"

className="
block
mt-3
rounded-full
bg-[#DCCFC0]
py-3
text-center
font-semibold
text-[#3A4035]
"

>

Donate

</Link>



</motion.div>

}



</header>


  );
}
