import VolunteerIntro from "../components/VolunteerIntro";
import VolunteerBenefits from "../components/VolunteerBenefits";
import VolunteerRoles from "../components/VolunteerRoles";
import VolunteerProcess from "../components/VolunteerProcess";
import VolunteerForm from "../components/VolunteerForm";
import VolunteerTestimonials from "../components/VolunteerTestimonials";

const Volunteer = () => {
  return (
    <div className="w-full bg-[#F8F6F1]">

      {/* Intro Section */}
      <VolunteerIntro />

      {/* Why Volunteer */}
      <VolunteerBenefits />

      {/* Volunteer Opportunities */}
      <VolunteerRoles />

      {/* Joining Process */}
      <VolunteerProcess />

      {/* Registration Form */}
      <VolunteerForm />

      {/* Stories */}
      <VolunteerTestimonials />

    </div>
  );
};

export default Volunteer;