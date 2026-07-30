const AdminStats = ({
  users,
  donations,
  volunteers,
  pending
}) => {


  const stats = [

    {
      title:"Total Users",
      value:users.length,
      icon:"👥"
    },


    {
      title:"Total Donations",
      value:donations,
      icon:"💰"
    },


    {
      title:"Volunteers",
      value:volunteers,
      icon:"🤝"
    },


    {
      title:"Pending Requests",
      value:pending,
      icon:"⏳"
    }

  ];



  return (

    <div
    className="
    grid
    grid-cols-1
    sm:grid-cols-2
    lg:grid-cols-4
    gap-6
    "
    >


      {
        stats.map((stat)=>(

          <div

          key={stat.title}

          className="
          bg-white
          rounded-3xl
          shadow-lg
          p-6
          border
          border-[#E5DDD1]
          "

          >


            <div
            className="
            flex
            items-center
            justify-between
            "
            >

              <h3
              className="
              text-gray-500
              font-medium
              "
              >

                {stat.title}

              </h3>


              <span
              className="
              text-3xl
              "
              >

                {stat.icon}

              </span>


            </div>




            <p
            className="
            mt-5
            text-4xl
            font-bold
            text-[#7A866E]
            "
            >

              {stat.value}

            </p>



          </div>

        ))
      }


    </div>

  );

};


export default AdminStats;