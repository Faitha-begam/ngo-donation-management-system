import jsPDF from "jspdf";

export const generateCertificate = (donation) => {
  try {
    if (!donation) {
      throw new Error("Donation data missing");
    }

    const doc = new jsPDF({
      orientation: "landscape",
      unit: "mm",
      format: "a4",
    });

    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    // =========================
    // Background
    // =========================

    doc.setFillColor(248, 247, 242);
    doc.rect(0, 0, pageWidth, pageHeight, "F");

    // =========================
    // Outer Border
    // =========================

    doc.setDrawColor(122, 134, 110);
    doc.setLineWidth(1.5);
    doc.rect(10, 10, pageWidth - 20, pageHeight - 20);

    // =========================
    // Inner Border
    // =========================

    doc.setDrawColor(184, 159, 90);
    doc.setLineWidth(0.5);
    doc.rect(15, 15, pageWidth - 30, pageHeight - 30);

    // =========================
    // Decorative Corner Lines
    // =========================

    doc.setLineWidth(1);

    // Top Left
    doc.line(10, 30, 10, 10);
    doc.line(10, 10, 30, 10);

    // Top Right
    doc.line(pageWidth - 30, 10, pageWidth - 10, 10);
    doc.line(pageWidth - 10, 10, pageWidth - 10, 30);

    // Bottom Left
    doc.line(10, pageHeight - 30, 10, pageHeight - 10);
    doc.line(10, pageHeight - 10, 30, pageHeight - 10);

    // Bottom Right
    doc.line(pageWidth - 30, pageHeight - 10, pageWidth - 10, pageHeight - 10);
    doc.line(pageWidth - 10, pageHeight - 30, pageWidth - 10, pageHeight - 10);

    // =========================
    // NGO Name
    // =========================

    doc.setFont("helvetica", "bold");
    doc.setTextColor(54, 64, 48);
    doc.setFontSize(28);

    doc.text("HOPE NGO", pageWidth / 2, 32, {
      align: "center",
    });

    // =========================
    // Certificate Title
    // =========================

    doc.setFontSize(20);
    doc.setTextColor(184, 159, 90);

    doc.text("CERTIFICATE OF APPRECIATION", pageWidth / 2, 45, {
      align: "center",
    });

    // =========================
    // Intro
    // =========================

    doc.setFont("helvetica", "normal");
    doc.setFontSize(13);
    doc.setTextColor(80);

    doc.text(
      "This certificate is proudly presented to",
      pageWidth / 2,
      60,
      {
        align: "center",
      }
    );

    // =========================
    // Donor Name
    // =========================

    doc.setFont("times", "bolditalic");
    doc.setFontSize(30);
    doc.setTextColor(70, 90, 60);

    doc.text(
      donation.name || "Anonymous Donor",
      pageWidth / 2,
      80,
      {
        align: "center",
      }
    );

    // =========================
    // Description
    // =========================

    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.setTextColor(90);

    const description =
      "For your generous contribution towards creating meaningful change and supporting communities in need.";

    doc.text(description, pageWidth / 2, 96, {
      align: "center",
      maxWidth: 170,
    });

    // =========================
    // Details Box
    // =========================

    doc.setDrawColor(210);
    doc.rect(35, 118, pageWidth - 70, 40);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.setTextColor(54, 64, 48);

    doc.text(`Campaign : ${donation.campaign}`, 42, 130);

    doc.text(`Donation Amount : Rs. ${donation.amount}`, 42, 140);

    doc.text(`Certificate ID : ${donation.id}`, 42, 150);

    doc.text(
      `Issued Date : ${new Date().toLocaleDateString()}`,
      pageWidth - 95,
      150
    );

    // =========================
    // Signature
    // =========================

    doc.line(pageWidth - 75, 168, pageWidth - 30, 168);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);

    doc.text(
      "Authorized Signature",
      pageWidth - 52,
      175,
      {
        align: "center",
      }
    );

    // =========================
    // Footer
    // =========================

    doc.setFontSize(10);
    doc.setTextColor(120);

    doc.text(
      "Thank you for supporting HOPE NGO and making a difference.",
      pageWidth / 2,
      190,
      {
        align: "center",
      }
    );

    const safeName = (donation.name || "Donor").replace(
      /[^a-zA-Z0-9]/g,
      "-"
    );

    doc.save(`HOPE-NGO-Certificate-${safeName}.pdf`);
  } catch (error) {
    console.error("Certificate generation failed:", error);
    alert("Certificate download failed. Please try again.");
  }
};