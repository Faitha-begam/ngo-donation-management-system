import { getCurrentUser } from "../utils/auth";


const DonationHistory = () => {


  const currentUser = getCurrentUser();



  const donations =
    currentUser?.donations || [];




  const totalAmount =
    donations.reduce(
      (total, donation)=>
        total + Number(donation.amount),
      0
    );





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







        {/* HEADER */}


        <div

          className="
          bg-[#7A866E]
          rounded-3xl
          p-8
          text-white
          shadow-xl
          "

        >



          <h1

            className="
            text-4xl
            font-bold
            "

          >

            Donation History

          </h1>




          <p

            className="
            mt-3
            text-[#F5F1E8]
            "

          >

            Track your contributions and
            the impact you create.

          </p>




        </div>












        {/* SUMMARY CARDS */}



        <div

          className="
          grid
          md:grid-cols-2
          gap-6
          mt-8
          "

        >




          <div

            className="
            bg-white
            rounded-3xl
            shadow-lg
            p-6
            "

          >


            <p

              className="
              text-gray-500
              "

            >

              Total Donations

            </p>



            <h2

              className="
              text-4xl
              font-bold
              text-[#7A866E]
              mt-3
              "

            >

              {donations.length}

            </h2>


          </div>







          <div

            className="
            bg-white
            rounded-3xl
            shadow-lg
            p-6
            "

          >


            <p

              className="
              text-gray-500
              "

            >

              Total Amount Donated

            </p>



            <h2

              className="
              text-4xl
              font-bold
              text-[#7A866E]
              mt-3
              "

            >

              ₹
              {
                totalAmount.toLocaleString()
              }


            </h2>


          </div>






        </div>













        {/* DONATION LIST */}



        <div

          className="
          mt-10
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

            Your Contributions

          </h2>








          {

            donations.length === 0 ?



            (


              <div

                className="
                bg-white
                rounded-3xl
                shadow-lg
                p-10
                text-center
                "

              >


                <h3

                  className="
                  text-xl
                  font-semibold
                  text-[#3A4035]
                  "

                >

                  No Donations Yet

                </h3>




                <p

                  className="
                  text-gray-500
                  mt-3
                  "

                >

                  Your donation history will appear here
                  after supporting a campaign.

                </p>


              </div>


            )



            :



            (



              <div

                className="
                space-y-6
                "

              >




                {
                  donations
                  .slice()
                  .reverse()
                  .map((donation)=>(



                    <div


                      key={donation.id}



                      className="
                      bg-white
                      rounded-3xl
                      shadow-lg
                      p-6
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


                          <h3

                            className="
                            text-xl
                            font-bold
                            text-[#3A4035]
                            "

                          >

                            {
                              donation.campaign
                            }

                          </h3>





                          <p

                            className="
                            text-gray-500
                            mt-2
                            "

                          >

                            Donation ID:

                            {" "}

                            {
                              donation.id
                            }


                          </p>




                        </div>









                        <div

                          className="
                          text-left
                          md:text-right
                          "

                        >


                          <h3

                            className="
                            text-3xl
                            font-bold
                            text-[#7A866E]
                            "

                          >

                            ₹
                            {
                              Number(
                                donation.amount
                              )
                              .toLocaleString()
                            }


                          </h3>






                          <span

                            className="
                            inline-block
                            mt-2
                            bg-green-100
                            text-green-700
                            px-4
                            py-1
                            rounded-full
                            text-sm
                            font-semibold
                            "

                          >

                            {
                              donation.status
                            }

                          </span>



                        </div>




                      </div>









                      <div

                        className="
                        grid
                        md:grid-cols-3
                        gap-4
                        mt-6
                        pt-5
                        border-t
                        "

                      >



                        <div>


                          <p
                            className="
                            text-gray-500
                            text-sm
                            "
                          >

                            Frequency

                          </p>


                          <p
                            className="
                            font-semibold
                            mt-1
                            "
                          >

                            {
                              donation.frequency
                            }

                          </p>


                        </div>







                        <div>


                          <p
                            className="
                            text-gray-500
                            text-sm
                            "
                          >

                            Payment

                          </p>


                          <p
                            className="
                            font-semibold
                            mt-1
                            capitalize
                            "
                          >

                            {
                              donation.paymentMethod
                            }

                          </p>


                        </div>







                        <div>


                          <p
                            className="
                            text-gray-500
                            text-sm
                            "
                          >

                            Date

                          </p>


                          <p
                            className="
                            font-semibold
                            mt-1
                            "
                          >


                            {
                              new Date(
                                donation.date
                              )
                              .toLocaleDateString()
                            }


                          </p>


                        </div>





                      </div>





                    </div>



                  ))

                }





              </div>



            )



          }



        </div>







      </div>




    </div>


  );


};



export default DonationHistory;