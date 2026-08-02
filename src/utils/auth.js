// utils/auth.js


const USERS_KEY = "users";
const CURRENT_USER_KEY = "currentUser";

/*
--------------------------------
GET ALL USERS
(Admin + System Use)
--------------------------------
*/

export const getUsers = () => {

  return JSON.parse(
    localStorage.getItem(USERS_KEY)
  ) || [];

};







/*
--------------------------------
SAVE USERS
--------------------------------
*/

export const saveUsers = (users)=>{

  localStorage.setItem(
    USERS_KEY,
    JSON.stringify(users)
  );

};







/*
--------------------------------
REGISTER USER
--------------------------------
*/


export const registerUser = (userData)=>{


  const users = getUsers();




  const exists = users.find(
    user =>
      user.email.toLowerCase()
      ===
      userData.email.toLowerCase()
  );




  if(exists){

    return {

      success:false,

      message:"Email already registered."

    };

  }







  const now = new Date().toISOString();






  const newUser = {


    id:Date.now(),


    name:userData.name.trim(),


    email:userData.email.trim(),


    phone:userData.phone.trim(),


    password:userData.password,



    /*
    --------------------
    USER ROLE
    --------------------
    */

    role:"donor",





    /*
    --------------------
    DONATION DATA
    --------------------
    */

    donations:[],





    /*
    --------------------
    VOLUNTEER DATA
    --------------------
    */

    volunteerStatus:"Not Applied",

    volunteerApplication:null,







    /*
    --------------------
    ACTIVITY TRACKING
    --------------------
    */


    activities:[

      {

        id:Date.now(),

        title:"Account Created",

        description:
        "Welcome to HopeBridge",

        date:now

      },


      {

        id:Date.now()+1,

        title:"Joined NGO Community",

        description:
        "Started making an impact",

        date:now

      }


    ],








    /*
    --------------------
    ADMIN TRACKING
    --------------------
    */


    accountStatus:"Active",


    createdAt:now,


    joinedDate:now


  };







  users.push(newUser);



  saveUsers(users);






  return {


    success:true,


    message:
    "Registration successful!"


  };


};
/*
--------------------------------
LOGIN USER
--------------------------------
*/

export const loginUser=(email,password)=>{

  const users=getUsers();

  const user=users.find(
    u=>
    u.email.toLowerCase()===email.toLowerCase()
    &&
    u.password===password
  );


  if(!user){

    return {
      success:false,
      message:"Invalid email or password."
    };

  }


  localStorage.setItem(
    CURRENT_USER_KEY,
    JSON.stringify(user)
  );


  return {
    success:true,
    user
  };

};





/*
--------------------------------
LOGOUT USER
--------------------------------
*/

export const logoutUser=()=>{

  localStorage.removeItem(
    CURRENT_USER_KEY
  );

};





/*
--------------------------------
GET CURRENT USER
--------------------------------
*/

export const getCurrentUser=()=>{

  return JSON.parse(
    localStorage.getItem(
      CURRENT_USER_KEY
    )
  );

};





/*
--------------------------------
UPDATE USER
--------------------------------
*/

export const updateCurrentUser=(updatedUser)=>{

  const users=getUsers();


  const updatedUsers=users.map(user=>

    user.id===updatedUser.id

    ?

    {
      ...user,
      ...updatedUser
    }

    :

    user

  );


  saveUsers(updatedUsers);


  localStorage.setItem(
    CURRENT_USER_KEY,
    JSON.stringify(updatedUser)
  );

};





/*
--------------------------------
ADD USER ACTIVITY
--------------------------------
*/

export const addActivity=(activity)=>{

  const user=getCurrentUser();


  if(!user)
  return;


  const newActivity={

    id:Date.now(),

    date:new Date().toISOString(),

    ...activity

  };


  const updatedUser={

    ...user,

    activities:[

      newActivity,

      ...(user.activities || [])

    ]

  };


  updateCurrentUser(updatedUser);

};
 /*
--------------------------------
UPDATE VOLUNTEER STATUS
(Admin Use)
--------------------------------
*/

export const updateVolunteerStatus=(status)=>{

  const user=getCurrentUser();

  if(!user)
  return;


  const updatedUser={

    ...user,

    volunteerStatus:status

  };


  addActivity({

    title:"Volunteer Status Updated",

    description:
    `Volunteer application ${status}`

  });


  updateCurrentUser(updatedUser);

};






/*
--------------------------------
SAVE VOLUNTEER APPLICATION
--------------------------------
*/

export const saveVolunteerApplication=(application)=>{

  const user=getCurrentUser();


  if(!user)
  return {
    success:false,
    message:"User not logged in."
  };



  const updatedUser={

    ...user,

    volunteerStatus:"Pending",

    volunteerApplication:{

      id:Date.now(),

      ...application,

      appliedAt:
      new Date().toISOString()

    }

  };




  updatedUser.activities=[

    {

      id:Date.now(),

      title:"Volunteer Application Submitted",

      description:
      "Waiting for admin approval",

      date:
      new Date().toISOString()

    },

    ...(updatedUser.activities || [])

  ];



  updateCurrentUser(updatedUser);



  return {

    success:true

  };

};







/*
--------------------------------
GET VOLUNTEER APPLICATIONS
(Admin)
--------------------------------
*/

export const getVolunteerApplications=()=>{

  const users=getUsers();


  return users.filter(
    user =>
    user.volunteerApplication
  );

};







/*
--------------------------------
UPDATE USER BY ADMIN
--------------------------------
*/

export const adminUpdateUser=(updatedUser)=>{

  const users=getUsers();


  const updatedUsers=users.map(user=>

    user.id===updatedUser.id

    ?

    {
      ...user,
      ...updatedUser
    }

    :

    user

  );


  saveUsers(updatedUsers);


};







/*
--------------------------------
GET USER BY ID
(Admin)
--------------------------------
*/

export const getUserById=(id)=>{

  const users=getUsers();


  return users.find(
    user=>user.id===id
  );

};







/*
--------------------------------
GET TOTAL DONATIONS
(Admin Dashboard)
--------------------------------
*/

export const getTotalDonations=()=>{

  const users=getUsers();


  return users.reduce(

    (total,user)=>

    total+(user.donations?.length || 0),

    0

  );

};







/*
--------------------------------
LOGIN CHECK
--------------------------------
*/

export const isLoggedIn=()=>{

  return !!localStorage.getItem(
    CURRENT_USER_KEY
  );

};