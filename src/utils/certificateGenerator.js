import jsPDF from "jspdf";

export const generateCertificate = (donation) => {
  const doc = new jsPDF({
    orientation: "landscape",
    unit: "mm",
    format: "a4",
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  // ===== Background =====
  doc.setFillColor(248, 247, 242);
  doc.rect(0, 0, pageWidth, pageHeight, "F");

  // ===== Border =====
  doc.setDrawColor(122, 134, 110);
  doc.setLineWidth(1.5);
  doc.rect(10, 10, pageWidth - 20, pageHeight - 20);

  doc.setDrawColor(180, 190, 170);
  doc.setLineWidth(0.5);
  doc.rect(14, 14, pageWidth - 28, pageHeight - 28);

  // ===== NGO Name =====
  doc.setFont("helvetica", "bold");
  doc.setTextColor(122, 134, 110);
  doc.setFontSize(28);
  doc.text("HOPE NGO", pageWidth / 2, 28, {
    align: "center",
  });

  // ===== Certificate Title =====
  doc.setTextColor(40, 40, 40);
  doc.setFontSize(24);
  doc.text("CERTIFICATE OF APPRECIATION", pageWidth / 2, 45, {
    align: "center",
  });

  // ===== Subtitle =====
  doc.setFont("helvetica", "normal");
  doc.setFontSize(14);

  doc.text("This certificate is proudly presented to", pageWidth / 2, 60, {
    align: "center",
  });

  // ===== Name =====
  doc.setFont("times", "bolditalic");
  doc.setFontSize(30);
  doc.setTextColor(70, 90, 60);

  doc.text(donation.name, pageWidth / 2, 80, {
    align: "center",
  });

  // ===== Appreciation =====
  doc.setFont("helvetica", "normal");
  doc.setTextColor(70);

  doc.setFontSize(14);

  const appreciation =
    "In recognition of your generous contribution towards supporting our mission and creating positive change in the lives of those who need it most.";

  doc.text(appreciation, pageWidth / 2, 96, {
    align: "center",
    maxWidth: 180,
  });

  // ===== Donation Details =====
  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);

  doc.text(`Campaign : ${donation.campaign}`, 35, 125);

  doc.text(`Donation Amount : ₹${donation.amount}`, 35, 137);

  doc.text(`Donation ID : ${donation.id}`, 35, 149);

  doc.text(
    `Date : ${new Date().toLocaleDateString()}`,
    35,
    161
  );

  // ===== Signature =====
  doc.line(pageWidth - 80, 150, pageWidth - 30, 150);

  doc.setFontSize(12);

  doc.text("Authorized Signature", pageWidth - 55, 158, {
    align: "center",
  });

  // ===== Footer =====
  doc.setFontSize(10);

  doc.setTextColor(120);

  doc.text(
    "Thank you for being a part of our mission.",
    pageWidth / 2,
    190,
    {
      align: "center",
    }
  );

  doc.save(
    `Certificate-${donation.name.replace(/\s+/g, "-")}.pdf`
  );
};