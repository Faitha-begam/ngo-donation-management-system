// ==========================================
// STORAGE SERVICE
// Handles ONLY localStorage operations
// ==========================================



// ==========================================
// STORAGE KEYS
// ==========================================


export const STORAGE_KEYS = {


  USERS:
  "users",



  CURRENT_USER:
  "currentUser",



  DONATIONS:
  "donations",



  VOLUNTEERS:
  "volunteers",



  CONTACTS:
  "contactMessages",



  CAMPAIGNS:
  "campaigns",



  ADMIN_LOGS:
  "adminLogs",


};







// ==========================================
// GET DATA
// ==========================================


export const getData = (key)=>{


  try{


    const data =
      localStorage.getItem(key);



    if(!data)
      return [];



    return JSON.parse(data);



  }
  catch(error){


    console.error(
      `Storage read error: ${key}`,
      error
    );


    return [];

  }


};








// ==========================================
// SAVE DATA
// ==========================================


export const saveData = (
  key,
  data
)=>{


  try{


    localStorage.setItem(

      key,

      JSON.stringify(data)

    );


    return true;



  }
  catch(error){


    console.error(
      `Storage save error: ${key}`,
      error
    );


    return false;


  }


};








// ==========================================
// REMOVE DATA
// ==========================================


export const removeData = (
  key
)=>{


  localStorage.removeItem(key);


};








// ==========================================
// CLEAR STORAGE
// ==========================================


export const clearStorage =()=>{


  localStorage.clear();


};








// ==========================================
// USERS
// ==========================================


export const getUsers =()=>{


  return getData(
    STORAGE_KEYS.USERS
  );


};



export const saveUsers =(
  users
)=>{


  return saveData(

    STORAGE_KEYS.USERS,

    users

  );


};








// ==========================================
// CURRENT USER
// ==========================================


export const getCurrentUser =()=>{


  const user =
    localStorage.getItem(
      STORAGE_KEYS.CURRENT_USER
    );



  return user
    ? JSON.parse(user)
    : null;


};






export const saveCurrentUser =(
  user
)=>{


  return saveData(

    STORAGE_KEYS.CURRENT_USER,

    user

  );


};






export const removeCurrentUser =()=>{


  removeData(
    STORAGE_KEYS.CURRENT_USER
  );


};








// ==========================================
// DONATIONS
// ==========================================


export const getDonations =()=>{


  return getData(
    STORAGE_KEYS.DONATIONS
  );


};






export const saveDonations =(
  donations
)=>{


  return saveData(

    STORAGE_KEYS.DONATIONS,

    donations

  );


};








// ==========================================
// VOLUNTEERS
// ==========================================


export const getVolunteers =()=>{


  return getData(
    STORAGE_KEYS.VOLUNTEERS
  );


};






export const saveVolunteers =(
  volunteers
)=>{


  return saveData(

    STORAGE_KEYS.VOLUNTEERS,

    volunteers

  );


};








// ==========================================
// CONTACT MESSAGES
// ==========================================


export const getContacts =()=>{


  return getData(
    STORAGE_KEYS.CONTACTS
  );


};






export const saveContacts =(
  messages
)=>{


  return saveData(

    STORAGE_KEYS.CONTACTS,

    messages

  );


};








// ==========================================
// CAMPAIGNS
// ==========================================


export const getCampaigns =()=>{


  return getData(
    STORAGE_KEYS.CAMPAIGNS
  );


};






export const saveCampaigns =(
  campaigns
)=>{


  return saveData(

    STORAGE_KEYS.CAMPAIGNS,

    campaigns

  );


};








// ==========================================
// ADMIN LOGS
// ==========================================
// Used to track admin activity
// Example:
// Deleted user
// Approved volunteer
// Updated campaign
// ==========================================


export const getAdminLogs =()=>{


  return getData(
    STORAGE_KEYS.ADMIN_LOGS
  );


};






export const saveAdminLogs =(
  logs
)=>{


  return saveData(

    STORAGE_KEYS.ADMIN_LOGS,

    logs

  );


};