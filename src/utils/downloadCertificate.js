import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export const downloadCertificate = async (donation) => {

  try {

    const certificate = document.getElementById("certificate");

    if (!certificate) {
      throw new Error("Certificate element not found.");
    }

    // Wait until fonts are loaded
    if (document.fonts) {
      await document.fonts.ready;
    }

    const canvas = await html2canvas(certificate, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: "#ffffff",
      logging: false,
      removeContainer: true,
      scrollX: 0,
      scrollY: 0,
      windowWidth: certificate.scrollWidth,
      windowHeight: certificate.scrollHeight,
    });

    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF({
      orientation: "landscape",
      unit: "px",
      format: [canvas.width, canvas.height],
    });

    pdf.addImage(
      imgData,
      "PNG",
      0,
      0,
      canvas.width,
      canvas.height
    );

    const safeName =
      (donation?.name || "Donor").replace(/[^a-zA-Z0-9]/g, "-");

    pdf.save(`HOPE-NGO-Certificate-${safeName}.pdf`);

  } catch (error) {

    console.error("Certificate Download Error:", error);

    alert(`Download failed:\n${error.message}`);
  }
};