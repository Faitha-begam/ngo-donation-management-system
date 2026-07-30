import { useState } from "react";

import UserDetailsModal from "./UserDetailsModal";


const DonorTable = ({ users }) => {


  const [selectedUser,setSelectedUser] =
  useState(null);



  const donors =
  users.filter(
    user =>
    user.role==="donor"
  );



  const calculateAmount=(donations)=>{

    return donations?.reduce(

      (total,item)=>

      total + Number(item.amount || 0),

      0

    ) || 0;

  };



  return (

    <div>


      {
        donors.length===0

        ?

        (

          <div
          className="
          text-center
          py-10
          text-gray-500
          "
          >

            No donors found.

          </div>

        )

        :

        (

        <div
        className="
        overflow-x-auto
        "
        >

          <table
          className="
          w-full
          text-left
          "
          >

            <thead>

              <tr
              className="
              border-b
              text-gray-500
              text-sm
              "
              >

                <th className="py-4 px-3">
                  Name
                </th>


                <th className="py-4 px-3">
                  Email
                </th>


                <th className="py-4 px-3">
                  Phone
                </th>


                <th className="py-4 px-3">
                  Donations
                </th>


                <th className="py-4 px-3">
                  Amount
                </th>


                <th className="py-4 px-3">
                  Action
                </th>


              </tr>

            </thead>





            <tbody>


            {
              donors.map((user)=>(

                <tr

                key={user.id}

                className="
                border-b
                hover:bg-[#F8F6F1]
                transition
                "

                >


                  <td
                  className="
                  py-4
                  px-3
                  font-medium
                  "
                  >

                    {user.name}

                  </td>





                  <td
                  className="
                  py-4
                  px-3
                  text-gray-600
                  "
                  >

                    {user.email}

                  </td>





                  <td
                  className="
                  py-4
                  px-3
                  text-gray-600
                  "
                  >

                    {user.phone || "N/A"}

                  </td>






                  <td
                  className="
                  py-4
                  px-3
                  "
                  >

                    {
                      user.donations?.length || 0
                    }

                  </td>






                  <td
                  className="
                  py-4
                  px-3
                  font-semibold
                  text-[#7A866E]
                  "
                  >

                    ₹
                    {
                      calculateAmount(
                        user.donations
                      ).toLocaleString()
                    }

                  </td>






                  <td
                  className="
                  py-4
                  px-3
                  "
                  >

                    <button

                    onClick={()=>setSelectedUser(user)}

                    className="
                    bg-[#7A866E]
                    text-white
                    px-4
                    py-2
                    rounded-full
                    text-sm
                    hover:bg-[#667258]
                    transition
                    "

                    >

                      View

                    </button>


                  </td>




                </tr>

              ))
            }


            </tbody>


          </table>


        </div>

        )

      }







      {
        selectedUser &&

        <UserDetailsModal

          user={selectedUser}

          close={()=>setSelectedUser(null)}

        />

      }



    </div>

  );


};


export default DonorTable;