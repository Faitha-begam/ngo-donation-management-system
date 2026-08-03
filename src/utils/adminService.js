/*
==================================================
ADMIN SERVICE
Centralized Business Logic
==================================================
*/

import {
  STORAGE_KEYS,
  getData,
  saveData,
} from "./storage";
import { addHopePoints } from "./hopePoints";


/*
==================================================
LOCAL HELPERS
==================================================
*/


const read = (key) => {

  return getData(key) || [];

};



const write = (
  key,
  value
) => {

  saveData(
    key,
    value
  );

};



/*
==================================================
LOAD DATA
==================================================
*/


export const getUsers = () => {

  return read(
    STORAGE_KEYS.USERS
  );

};



export const getDonations = () => {

  return read(
    STORAGE_KEYS.DONATIONS
  );

};



export const getVolunteers = () => {

  return read(
    STORAGE_KEYS.VOLUNTEERS
  );

};



export const getMessages = () => {

  return read(
    STORAGE_KEYS.CONTACTS
  );

};



export const getCampaigns = () => {

  return read(
    STORAGE_KEYS.CAMPAIGNS
  );

};




/*
==================================================
SAVE DATA
==================================================
*/


export const saveUsers = (
  users
) => {

  write(
    STORAGE_KEYS.USERS,
    users
  );

};



export const saveDonations = (
  donations
) => {

  write(
    STORAGE_KEYS.DONATIONS,
    donations
  );

};



export const saveVolunteers = (
  volunteers
) => {

  write(
    STORAGE_KEYS.VOLUNTEERS,
    volunteers
  );

};



export const saveMessages = (
  messages
) => {

  write(
    STORAGE_KEYS.CONTACTS,
    messages
  );

};



export const saveCampaigns = (
  campaigns
) => {

  write(
    STORAGE_KEYS.CAMPAIGNS,
    campaigns
  );

};




/*
==================================================
DASHBOARD STATISTICS
==================================================
*/


export const getDashboardStats = () => {


  const users =
    getUsers();



  const donations =
    getDonations();



  const volunteers =
    getVolunteers();



  const campaigns =
    getCampaigns();



  const messages =
    getMessages();





  /*
  ================================
  TOTAL DONATION AMOUNT
  ================================
  */


  const totalDonationAmount =
    donations.reduce(

      (
        total,
        donation
      ) =>

        total +
        Number(
          donation.amount || 0
        ),

      0

    );





  /*
  ================================
  UNIQUE DONORS
  ================================
  */


  const totalDonors =

    new Set(

      donations.map(

        donation =>
          donation.donorId

      )

    ).size;





  /*
  ================================
  LAST DONATION
  ================================
  */


  const lastDonation =

    [...donations]

      .sort(

        (
          a,
          b
        ) =>

          new Date(
            b.createdAt || 0
          )

          -

          new Date(
            a.createdAt || 0
          )

      )[0] || null;





  return {


    /*
    USER STATS
    */


    totalUsers:
      users.length,


    totalDonors,



    /*
    DONATION STATS
    */


    totalDonations:
      donations.length,


    totalDonationAmount,


    lastDonation,



    /*
    VOLUNTEER STATS
    */


    totalVolunteers:
      volunteers.length,



    pendingVolunteers:

      volunteers.filter(

        volunteer =>

          (
            volunteer.volunteerStatus
            ||
            "Pending"
          )

          ===

          "Pending"

      ).length,



    /*
    CAMPAIGN STATS
    */


    totalCampaigns:
      campaigns.length,



    /*
    MESSAGE STATS
    */


    totalMessages:
      messages.length,



    unreadMessages:

      messages.filter(

        message =>

          !message.read

      ).length,


  };


};





/*
==================================================
DONOR MANAGEMENT
==================================================
*/



/*
----------------------------------
GET DONORS
----------------------------------
*/


export const getDonors = (

  users = getUsers()

) => {


  const donations =
    getDonations();



  return users.filter(

    user => {


      const hasDonation =

        donations.some(

          donation =>

            donation.donorId
            ===
            user.id

        );



      return hasDonation;


    }

  );


};





/*
----------------------------------
GET DONOR BY ID
----------------------------------
*/


export const getDonorById = (

  donorId

) => {


  return getUsers().find(

    user =>

      user.id === donorId

  );


};





/*
----------------------------------
UPDATE USER
----------------------------------
*/


export const updateUser = (

  userId,
  updates

) => {


  const users =
    getUsers();



  const updatedUsers =

    users.map(

      user => {


        if(
          user.id !== userId
        ){

          return user;

        }



        return {


          ...user,


          ...updates,


          updatedAt:

            new Date()

              .toISOString(),


        };


      }

    );



  saveUsers(
    updatedUsers
  );



  return true;


};
/*
----------------------------------
BLOCK / UNBLOCK USER
----------------------------------
*/


export const toggleUserStatus = (

  userId

) => {


  const users =
    getUsers();



  const updatedUsers =

    users.map(

      user => {


        if(
          user.id !== userId
        ){

          return user;

        }



        return {


          ...user,


          accountStatus:

            user.accountStatus === "Blocked"

              ?

              "Active"

              :

              "Blocked",


        };


      }

    );



  saveUsers(
    updatedUsers
  );



  return true;


};






/*
----------------------------------
DELETE USER
----------------------------------
*/


export const deleteUser = (

  userId

) => {


  const users =
    getUsers();


  const donations =
    getDonations();


  const volunteers =
    getVolunteers();


  const messages =
    getMessages();





  saveUsers(

    users.filter(

      user =>

        user.id !== userId

    )

  );





  saveDonations(

    donations.filter(

      donation =>

        donation.donorId !== userId

    )

  );





  saveVolunteers(

    volunteers.filter(

      volunteer =>

        volunteer.userId !== userId

    )

  );





  saveMessages(

    messages.filter(

      message =>

        message.userId !== userId

    )

  );



  return true;


};







/*
----------------------------------
SEARCH USERS
----------------------------------
*/


export const searchUsers = (

  users,
  keyword

) => {


  if(
    !keyword.trim()
  ){

    return users;

  }



  const search =
    keyword.toLowerCase();




  return users.filter(

    user =>


      user.name

        ?.toLowerCase()

        .includes(search)



      ||



      user.email

        ?.toLowerCase()

        .includes(search)



      ||



      user.phone

        ?.toLowerCase()

        .includes(search)


  );


};








/*
----------------------------------
FILTER USERS
----------------------------------
*/


export const filterUsers = (

  users,
  status

) => {


  if(
    status === "All"
  ){

    return users;

  }



  return users.filter(

    user =>


      (
        user.accountStatus
        ||
        "Active"
      )

      ===

      status


  );


};








/*
----------------------------------
SORT USERS
----------------------------------
*/


export const sortUsers = (

  users,
  sortBy

) => {


  const list =
    [...users];



  switch(sortBy){



    case "name":


      return list.sort(

        (
          a,
          b
        ) =>

          a.name.localeCompare(
            b.name
          )

      );





    case "latest":


      return list.sort(

        (
          a,
          b
        ) =>

          new Date(
            b.createdAt || 0
          )

          -

          new Date(
            a.createdAt || 0
          )

      );





    default:

      return list;


  }


};








/*
==================================================
DONATION MANAGEMENT
==================================================
*/





/*
----------------------------------
GET DONATION BY ID
----------------------------------
*/


export const getDonationById = (

  donationId

) => {


  return getDonations().find(

    donation =>

      donation.id === donationId

  );


};








/*
----------------------------------
SEARCH DONATIONS
----------------------------------
*/


export const searchDonations = (

  donations,
  keyword

) => {


  if(
    !keyword.trim()
  ){

    return donations;

  }




  const search =

    keyword.toLowerCase();





  return donations.filter(

    donation =>



      donation.id

        ?.toString()

        .toLowerCase()

        .includes(search)




      ||




      donation.campaign

        ?.toLowerCase()

        .includes(search)




      ||




      donation.donorName

        ?.toLowerCase()

        .includes(search)




      ||




      donation.donorEmail

        ?.toLowerCase()

        .includes(search)


  );


};









/*
----------------------------------
FILTER DONATIONS
----------------------------------
*/


export const filterDonations = (

  donations,
  filters

) => {


  let results =
    [...donations];





  /*
  CAMPAIGN FILTER
  */


  if(

    filters.campaign

    &&

    filters.campaign !== "All"

  ){


    results =

      results.filter(

        donation =>

          donation.campaign
          ===
          filters.campaign


      );


  }





  /*
  STATUS FILTER
  */


  if(

    filters.status

    &&

    filters.status !== "All"

  ){


    results =

      results.filter(

        donation =>

          donation.status
          ===
          filters.status


      );


  }





  /*
  DATE FILTER
  */


  if(

    filters.date

    &&

    filters.date !== "All"

  ){


    const today =
      new Date();




    results =

      results.filter(

        donation => {


          const date =

            new Date(

              donation.createdAt

            );



          switch(filters.date){



            case "Today":


              return (

                date.toDateString()

                ===

                today.toDateString()

              );





            case "This Week":


              return (

                (
                  today - date
                )

                /

                (
                  1000 *
                  60 *
                  60 *
                  24
                )

              )

              <=

              7;





            case "This Month":


              return (

                date.getMonth()

                ===

                today.getMonth()

                &&

                date.getFullYear()

                ===

                today.getFullYear()


              );





            default:

              return true;


          }


        }

      );


  }





  return results;


};
/*
----------------------------------
SORT DONATIONS
----------------------------------
*/


export const sortDonations = (

  donations,
  sortBy

) => {


  const list =
    [...donations];



  switch(sortBy){



    case "highest":


      return list.sort(

        (
          a,
          b
        ) =>

          Number(
            b.amount || 0
          )

          -

          Number(
            a.amount || 0
          )

      );





    case "lowest":


      return list.sort(

        (
          a,
          b
        ) =>

          Number(
            a.amount || 0
          )

          -

          Number(
            b.amount || 0
          )

      );





    case "latest":


      return list.sort(

        (
          a,
          b
        ) =>

          new Date(
            b.createdAt || 0
          )

          -

          new Date(
            a.createdAt || 0
          )

      );





    case "oldest":


      return list.sort(

        (
          a,
          b
        ) =>

          new Date(
            a.createdAt || 0
          )

          -

          new Date(
            b.createdAt || 0
          )

      );





    default:

      return list;


  }


};








/*
----------------------------------
DELETE DONATION
----------------------------------
*/


export const deleteDonation = (

  donationId

) => {


  const donations =
    getDonations();



  saveDonations(

    donations.filter(

      donation =>

        donation.id !== donationId

    )

  );



  return true;


};








/*
----------------------------------
UPDATE DONATION STATUS
----------------------------------
*/


export const updateDonationStatus = (

  donationId,
  status

) => {


  const donations =
    getDonations();



  const updated =

    donations.map(

      donation => {


        if(

          donation.id !== donationId

        ){

          return donation;

        }




        return {


          ...donation,


          status,



          updatedAt:

            new Date()

              .toISOString(),


        };


      }

    );




  saveDonations(
    updated
  );



  return true;


};










/*
==================================================
DONATION ANALYTICS
==================================================
*/





/*
----------------------------------
TOTAL DONATION AMOUNT
----------------------------------
*/


export const getTotalDonationAmount = () => {


  return getDonations()

    .reduce(

      (
        total,
        donation
      ) =>


        total +

        Number(

          donation.amount || 0

        ),


      0


    );


};








/*
----------------------------------
AVERAGE DONATION
----------------------------------
*/


export const getAverageDonation = () => {


  const donations =
    getDonations();



  if(
    donations.length === 0
  ){

    return 0;

  }




  return Math.round(

    getTotalDonationAmount()

    /

    donations.length

  );


};








/*
----------------------------------
HIGHEST DONATION
----------------------------------
*/


export const getHighestDonation = () => {


  const donations =
    getDonations();



  if(
    donations.length === 0
  ){

    return null;

  }




  return donations.reduce(

    (
      highest,
      donation
    ) =>



      Number(
        donation.amount || 0
      )

      >

      Number(
        highest.amount || 0
      )

      ?

      donation

      :

      highest


  );


};










/*
----------------------------------
RECENT DONATIONS
----------------------------------
*/


export const getRecentDonations = (

  limit = 10

) => {



  return [

    ...getDonations()

  ]

  .sort(

    (
      a,
      b
    ) =>


      new Date(
        b.createdAt || 0
      )

      -

      new Date(
        a.createdAt || 0
      )


  )

  .slice(

    0,

    limit

  );


};









/*
----------------------------------
TOP DONORS
----------------------------------
*/


export const getTopDonors = (

  limit = 5

) => {


  const users =
    getUsers();


  const donations =
    getDonations();




  const donorMap = {};




  donations.forEach(

    donation => {


      if(

        !donorMap[
          donation.donorId
        ]

      ){


        donorMap[
          donation.donorId
        ] = {


          amount:0,


          count:0,


        };


      }




      donorMap[
        donation.donorId
      ].amount +=

        Number(
          donation.amount || 0
        );




      donorMap[
        donation.donorId
      ].count++;


    }

  );





  return users.map(

    user => {


      const data =

        donorMap[user.id];



      return {


        ...user,


        donationCount:

          data?.count || 0,



        totalDonation:

          data?.amount || 0,


      };


    }

  )

  .filter(

    donor =>

      donor.totalDonation > 0

  )

  .sort(

    (
      a,
      b
    ) =>


      b.totalDonation

      -

      a.totalDonation


  )

  .slice(

    0,

    limit

  );


};









/*
----------------------------------
TOP CAMPAIGNS
----------------------------------
*/


export const getTopCampaigns = () => {


  const donations =
    getDonations();



  const campaigns = {};




  donations.forEach(

    donation => {


      const name =

        donation.campaign
        ||

        "General";




      if(
        !campaigns[name]
      ){


        campaigns[name] = {


          campaign:name,


          amount:0,


          donations:0,


        };


      }





      campaigns[name].amount +=

        Number(
          donation.amount || 0
        );




      campaigns[name].donations++;



    }

  );





  return Object.values(

    campaigns

  )

  .sort(

    (
      a,
      b
    ) =>


      b.amount

      -

      a.amount


  );


};
/*
----------------------------------
MONTHLY DONATION REPORT
----------------------------------
*/


export const getMonthlyDonationReport = () => {


  const donations =
    getDonations();



  const months = {};




  donations.forEach(

    donation => {


      const date =

        new Date(

          donation.createdAt

        );




      const key =

        `${date.getFullYear()}-${String(

          date.getMonth() + 1

        ).padStart(2,"0")}`;





      if(
        !months[key]
      ){

        months[key] = 0;

      }




      months[key] +=

        Number(

          donation.amount || 0

        );


    }

  );





  return Object.entries(

    months

  )

  .map(

    ([month,total]) => ({


      month,


      total,


    })

  );


};








/*
================================
DELETE DONOR
================================
*/


export const deleteDonor = (

  userId

) => {


  const users =
    getUsers();



  const donations =
    getDonations();





  saveUsers(

    users.filter(

      user =>

        user.id !== userId

    )

  );





  saveDonations(

    donations.filter(

      donation =>

        donation.donorId !== userId

    )

  );





  return true;


};








/*
================================
EXPORT DONATIONS
================================
*/


export const exportDonations = () => {


  return getDonations();


};









/*
================================
RECENT ACTIVITY
================================
*/


export const getRecentActivities = () => {


  const donations =


    getDonations()

      .map(

        donation => ({


          type:
            "Donation",



          title:

            `${

              donation.donorName
              ||
              "Someone"

            } donated ₹${

              donation.amount

            }`,



          createdAt:

            donation.createdAt,


        })

      );







  const volunteers =


    getVolunteers()

      .map(

        volunteer => ({


          type:
            "Volunteer",



          title:

            `${

              volunteer.name

            } applied as volunteer`,



          createdAt:

            volunteer.createdAt,


        })

      );








  const messages =


    getMessages()

      .map(

        message => ({


          type:
            "Message",



          title:

            `${

              message.name

            } sent a message`,



          createdAt:

            message.createdAt,


        })

      );






  return [


    ...donations,


    ...volunteers,


    ...messages,


  ]

  .sort(

    (
      a,
      b
    ) =>


      new Date(

        b.createdAt || 0

      )

      -

      new Date(

        a.createdAt || 0

      )


  );


};









/*
================================
ADMIN DASHBOARD SUMMARY
================================
*/


export const getDashboardSummary = () => {


  return {


    stats:

      getDashboardStats(),



    activities:

      getRecentActivities()

        .slice(

          0,

          10

        ),




    campaigns:

      getCampaigns(),




    volunteers:

      getVolunteers(),




    donations:

      getDonations(),




    users:

      getUsers(),


  };


};

export const updateVolunteerStatus = (userId, status) => {
  const users = getUsers();
  const user = users.find((item) => String(item.id) === String(userId));

  if (!user) {
    return null;
  }

  const wasApproved = user.volunteerStatus === "Approved";
  const updatedUser = { ...user, volunteerStatus: status };
  saveUsers(users.map((item) => String(item.id) === String(userId) ? updatedUser : item));

  if (status === "Approved" && !wasApproved) {
    addHopePoints(userId, 15, "Volunteer application approved", `volunteer-approved:${userId}`);
  }

  return updatedUser;
};
