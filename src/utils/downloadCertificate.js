import html2canvas from "html2canvas";
import jsPDF from "jspdf";


export const downloadCertificate = async (donation) => {

  const certificate =
    document.getElementById("certificate");


  if (!certificate) {
    alert("Certificate not found");
    return;
  }



  try {


    await document.fonts.ready;



    const canvas = await html2canvas(
      certificate,
      {
        scale: 2,

        useCORS:true,

        backgroundColor:"#ffffff",

        logging:false,

        width:1123,

        height:794,
      }
    );




    const image =
      canvas.toDataURL(
        "image/png",
        1.0
      );





    const pdf =
      new jsPDF({

        orientation:"landscape",

        unit:"px",

        format:[
          1123,
          794
        ]

      });





    pdf.addImage(
      image,
      "PNG",
      0,
      0,
      1123,
      794
    );





    const name =
      donation.name
      ?.replace(/\s+/g,"-")
      ||
      "Donor";




    pdf.save(
      `HOPE-NGO-Certificate-${name}.pdf`
    );



  }

  catch(error){

    console.error(
      "PDF Error:",
      error
    );

    alert(
      "Certificate download failed"
    );

  }

};