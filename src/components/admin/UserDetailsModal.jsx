const UserDetailsModal = ({ user, closeModal }) => {


  if(!user)
  return null;




  return (

    <div
      className="
      fixed
      inset-0
      bg-black/50
      flex
      items-center
      justify-center
      z-50
      px-5
      "
    >



      <div
        className="
        bg-white
        w-full
        max-w-3xl
        rounded-3xl
        shadow-2xl
        p-8
        max-h-[90vh]
        overflow-y-auto
        "
      >





        {/* HEADER */}

        <div
          className="
          flex
          justify-between
          items-center
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

              User Details

            </h2>


            <p
              className="
              text-gray-500
              mt-1
              "
            >

              Complete donor information

            </p>


          </div>





          <button

            onClick={closeModal}

            className="
            text-gray-500
            hover:text-red-500
            text-2xl
            "
          >

            ✕

          </button>



        </div>








        {/* PROFILE */}

        <div
          className="
          bg-[#F8F6F1]
          rounded-2xl
          p-6
          flex
          items-center
          gap-5
          "
        >



          <div
            className="
            w-20
            h-20
            rounded-full
            bg-[#7A866E]
            text-white
            flex
            items-center
            justify-center
            text-3xl
            font-bold
            "
          >

            {
              user.name
              ?.charAt(0)
              ?.toUpperCase()
            }


          </div>





          <div>


            <h3
              className="
              text-2xl
              font-bold
              text-[#2E332B]
              "
            >

              {user.name}

            </h3>



            <p
              className="
              text-gray-600
              "
            >

              {user.email}

            </p>




            <span
              className="
              inline-block
              mt-2
              bg-[#7A866E]
              text-white
              px-4
              py-1
              rounded-full
              text-sm
              "
            >

              {user.role || "Donor"}

            </span>



          </div>



        </div>









        {/* PERSONAL DETAILS */}


        <div
          className="
          mt-8
          grid
          md:grid-cols-2
          gap-5
          "
        >



          <InfoCard
            title="Phone Number"
            value={user.phone || "Not provided"}
          />



          <InfoCard
            title="Joined Date"
            value={
              user.joinedDate
              ?
              new Date(
                user.joinedDate
              ).toLocaleDateString()
              :
              "N/A"
            }
          />



          <InfoCard
            title="Volunteer Status"
            value={
              user.volunteerStatus ||
              "Not Applied"
            }
          />



          <InfoCard
            title="Total Donations"
            value={
              user.donations?.length || 0
            }
          />



        </div>









        {/* DONATIONS */}


        <div
          className="
          mt-10
          "
        >


          <h3
            className="
            text-xl
            font-bold
            text-[#2E332B]
            mb-4
            "
          >

            Donation History

          </h3>




          {
            user.donations?.length > 0

            ?

            <div
              className="
              space-y-4
              "
            >

              {
                user.donations.map(
                  donation=>(


                    <div
                      key={donation.id}
                      className="
                      border
                      rounded-2xl
                      p-4
                      flex
                      justify-between
                      items-center
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
                          text-sm
                          text-gray-500
                          "
                        >

                          {
                            new Date(
                              donation.date
                            ).toLocaleDateString()
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
                        {
                          donation.amount
                        }

                      </p>



                    </div>


                  )
                )
              }


            </div>


            :


            <p
              className="
              text-gray-500
              "
            >

              No donations yet.

            </p>


          }


        </div>









        {/* ACTIVITIES */}


        <div
          className="
          mt-10
          "
        >


          <h3
            className="
            text-xl
            font-bold
            text-[#2E332B]
            mb-4
            "
          >

            Recent Activity

          </h3>



          {

            user.activities?.length > 0


            ?

            <div
              className="
              space-y-4
              "
            >

            {
              user.activities
              .slice(0,5)
              .map(activity=>(


                <div
                  key={activity.id}
                  className="
                  border-l-4
                  border-[#7A866E]
                  pl-4
                  "
                >


                  <p
                    className="
                    font-semibold
                    "
                  >

                    {activity.title}

                  </p>



                  <p
                    className="
                    text-sm
                    text-gray-500
                    "
                  >

                    {activity.description}

                  </p>


                </div>


              ))
            }

            </div>


            :


            <p
              className="
              text-gray-500
              "
            >

              No activity found.

            </p>


          }



        </div>





      </div>



    </div>

  );

};







const InfoCard = ({title,value})=>{


  return (

    <div
      className="
      bg-[#F8F6F1]
      rounded-2xl
      p-5
      "
    >

      <p
        className="
        text-sm
        text-gray-500
        "
      >

        {title}

      </p>


      <p
        className="
        mt-2
        font-semibold
        text-[#2E332B]
        "
      >

        {value}

      </p>


    </div>

  );

};





export default UserDetailsModal;