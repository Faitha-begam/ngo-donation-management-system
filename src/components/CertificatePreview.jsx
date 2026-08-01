import { X, Heart, Award } from "lucide-react";

const CertificatePreview = ({
  open,
  onClose,
  donation,
  onDownload,
}) => {

  if (!open) return null;


  return (

    <div
      className="
      fixed
      inset-0
      z-50
      bg-black/60
      backdrop-blur-sm
      flex
      items-center
      justify-center
      p-4
      "
    >


      <div
        className="
        bg-white
        rounded-[32px]
        shadow-2xl
        w-full
        max-w-6xl
        h-[90vh]
        flex
        flex-col
        overflow-hidden
        "
      >


        {/* HEADER */}

        <div
          className="
          flex
          items-center
          justify-between
          px-8
          py-5
          border-b
          shrink-0
          "
        >

          <div>

            <h2 className="
            text-2xl
            font-bold
            text-[#364030]
            ">
              Certificate Preview
            </h2>


            <p className="
            text-sm
            text-gray-500
            ">
              Your appreciation certificate is ready
            </p>

          </div>



          <button

            onClick={onClose}

            className="
            w-10
            h-10
            rounded-full
            hover:bg-gray-100
            flex
            items-center
            justify-center
            "

          >

            <X size={22}/>

          </button>


        </div>






        {/* CERTIFICATE AREA */}


        <div
          className="
          flex-1
          overflow-auto
          bg-[#F8F7F2]
          p-6
          flex
          justify-center
          items-center
          "
        >


          <div
            className="
            scale-[0.75]
            sm:scale-[0.85]
            lg:scale-100
            origin-center
            "
          >



            <div
              id="certificate"

              className="
              relative
              bg-white
              border-[14px]
              border-[#EFE4C8]
              shadow-inner
              overflow-hidden
              flex-shrink-0
              "

              style={{
                width:"1000px",
                height:"707px",
              }}

            >



              {/* INNER BORDER */}

              <div
                className="
                absolute
                inset-5
                border
                border-[#B89F5A]
                "
              />





              {/* CORNERS */}


              <div
                className="
                absolute
                top-0
                left-0
                w-24
                h-24
                border-t-[7px]
                border-l-[7px]
                border-[#B89F5A]
                "
              />


              <div
                className="
                absolute
                bottom-0
                right-0
                w-24
                h-24
                border-b-[7px]
                border-r-[7px]
                border-[#B89F5A]
                "
              />







              {/* WATERMARK */}


              <Heart

                size={260}

                className="
                absolute
                top-1/2
                left-1/2
                -translate-x-1/2
                -translate-y-1/2
                text-[#7A866E]
                opacity-[0.04]
                "

              />









              {/* CONTENT */}


              <div
                className="
                relative
                z-10
                h-full
                text-center
                px-20
                "
              >




                {/* LOGO */}


                <div
                  className="
                  pt-12
                  flex
                  justify-center
                  "
                >

                  <div
                    className="
                    w-16
                    h-16
                    rounded-full
                    bg-[#7A866E]
                    flex
                    items-center
                    justify-center
                    "
                  >

                    <Heart

                      size={32}

                      fill="white"

                      className="text-white"

                    />

                  </div>


                </div>








                <h1

                  className="
                  mt-3
                  text-4xl
                  font-bold
                  text-[#364030]
                  "

                  style={{
                    fontFamily:"Cinzel,serif"
                  }}

                >

                  HOPE NGO

                </h1>






                <p

                  className="
                  mt-2
                  text-xs
                  tracking-[7px]
                  text-[#B89F5A]
                  uppercase
                  "

                >

                  Certificate Of Appreciation

                </p>









                {/* RECIPIENT */}


                <div className="mt-12">


                  <p className="text-gray-500">

                    Proudly Presented To

                  </p>



                  <h2

                    className="
                    mt-3
                    text-6xl
                    text-[#364030]
                    "

                    style={{
                      fontFamily:"Great Vibes,cursive"
                    }}

                  >

                    {donation?.name}

                  </h2>




                  <p

                    className="
                    mt-5
                    text-gray-600
                    text-sm
                    leading-6
                    "

                  >

                    In recognition of your generous contribution
                    towards creating meaningful change and supporting
                    communities in need.

                  </p>


                </div>









                {/* DETAILS */}


                <div

                  className="
                  absolute
                  left-20
                  right-20
                  bottom-32
                  grid
                  grid-cols-2
                  gap-y-5
                  text-left
                  "

                >


                  <Info

                    title="Campaign"

                    value={donation?.campaign}

                  />



                  <Info

                    title="Donation Amount"

                    value={`₹${donation?.amount}`}

                  />



                  <Info

                    title="Certificate ID"

                    value={donation?.id}

                  />



                  <Info

                    title="Issued Date"

                    value={new Date().toLocaleDateString()}

                  />


                </div>









                {/* FOOTER */}


                <div

                  className="
                  absolute
                  bottom-5
                  left-20
                  right-20
                  flex
                  justify-between
                  items-center
                  "

                >


                  <Signature title="NGO Director"/>




                  <div
                    className="
                    w-20
                    h-20
                    rounded-full
                    bg-[#C9A94A]
                    border-4
                    border-[#F1DE9F]
                    flex
                    flex-col
                    items-center
                    justify-center
                    text-white
                    "
                  >

                    <Award size={25}/>


                    <span className="text-[10px]">
                      VERIFIED
                    </span>


                  </div>





                  <Signature title="Authorized Signature"/>



                </div>




              </div>



            </div>



          </div>



        </div>







        {/* BUTTONS */}


        <div
          className="
          border-t
          px-8
          py-5
          flex
          justify-end
          gap-4
          shrink-0
          "
        >


          <button

            onClick={onClose}

            className="
            px-7
            py-3
            rounded-full
            border
            hover:bg-gray-100
            "

          >

            Close

          </button>





          <button

            onClick={onDownload}

            className="
            px-8
            py-3
            rounded-full
            bg-[#7A866E]
            text-white
            font-semibold
            hover:bg-[#68745E]
            "

          >

            Download PDF

          </button>



        </div>




      </div>


    </div>

  );

};








const Info = ({
  title,
  value
}) => (

<div>

<p
className="
text-[11px]
uppercase
tracking-wider
text-gray-400
"
>

{title}

</p>


<p
className="
mt-1
font-semibold
text-base
text-[#364030]
truncate
max-w-[350px]
"
>

{value}

</p>


</div>

);







const Signature = ({
 title
}) => (

<div className="text-center">


<div
className="
w-32
h-[2px]
bg-[#364030]
"
/>


<p
className="
mt-2
text-xs
text-gray-600
"
>

{title}

</p>


</div>

);


export default CertificatePreview;