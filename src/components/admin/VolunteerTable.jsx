import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Eye,
  Check,
  X,
  Mail,
  Phone,
  HeartHandshake,
  Search,
  Users,
  Clock,
  CheckCircle,
  XCircle,
} from "lucide-react";

import { updateVolunteerStatus } from "../../utils/adminService";

const statusStyles = {
  Approved: "bg-[#7A866E]/10 text-[#7A866E]",
  Rejected: "bg-red-100 text-red-700",
  Pending: "bg-yellow-100 text-yellow-700",
};

const StatCard = ({ title, value, icon }) => (
  <div className="bg-white rounded-3xl border border-[#7A866E]/10 p-5 flex items-center justify-between">
    <div>
      <p className="text-xs uppercase tracking-wider font-bold text-[#2E332B]/45">
        {title}
      </p>
      <p className="text-2xl font-bold text-[#2E332B] mt-1">{value}</p>
    </div>
    <div className="w-11 h-11 rounded-2xl bg-[#7A866E]/10 text-[#7A866E] flex items-center justify-center">
      {icon}
    </div>
  </div>
);

const VolunteerTable = ({ volunteers = [], refresh }) => {
  /*
  =====================================
  STATE
  =====================================
  */
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedVolunteer, setSelectedVolunteer] = useState(null);

  /*
  =====================================
  FILTER DATA
  =====================================
  */
  const filteredVolunteers = useMemo(() => {
    let data = [...volunteers];

    if (search.trim()) {
      data = data.filter((volunteer) => {
        const value = `
          ${volunteer.name}
          ${volunteer.email}
          ${volunteer.phone}
          ${volunteer.volunteerApplication?.skills}
        `.toLowerCase();

        return value.includes(search.toLowerCase());
      });
    }

    if (statusFilter !== "All") {
      data = data.filter((volunteer) => {
        const status = volunteer.volunteerStatus || "Pending";
        return status === statusFilter;
      });
    }

    return data;
  }, [volunteers, search, statusFilter]);

  /*
  =====================================
  UPDATE STATUS
  =====================================
  */
  const handleStatusUpdate = (id, status) => {
    updateVolunteerStatus(id, status);
    refresh();
  };

  /*
  =====================================
  STATISTICS
  =====================================
  */
  const total = volunteers.length;

  const approved = volunteers.filter(
    (item) => item.volunteerStatus === "Approved"
  ).length;

  const pending = volunteers.filter(
    (item) => (item.volunteerStatus || "Pending") === "Pending"
  ).length;

  const rejected = volunteers.filter(
    (item) => item.volunteerStatus === "Rejected"
  ).length;

  return (
    <div className="space-y-8">
      {/* =====================================
          A. HEADER
      ===================================== */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
        <div>
          <h2 className="text-3xl font-bold text-[#2E332B]">
            Volunteer Applications
          </h2>
          <p className="text-sm text-[#2E332B]/50 mt-2">
            Review and manage volunteer requests
          </p>
        </div>

        <div className="flex items-center gap-3 bg-white rounded-2xl px-5 py-3 border border-[#7A866E]/10">
          <Users size={18} className="text-[#7A866E]" />
          <span className="font-bold text-[#2E332B]">{total}</span>
          <span className="text-sm text-[#2E332B]/50">Applicants</span>
        </div>
      </div>

      {/* =====================================
          B. STATS CARDS
      ===================================== */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard title="Total" value={total} icon={<Users size={20} />} />
        <StatCard
          title="Approved"
          value={approved}
          icon={<CheckCircle size={20} />}
        />
        <StatCard title="Pending" value={pending} icon={<Clock size={20} />} />
        <StatCard
          title="Rejected"
          value={rejected}
          icon={<XCircle size={20} />}
        />
      </div>

      {/* =====================================
          C. SEARCH + FILTER
      ===================================== */}
      <div className="bg-white rounded-3xl border border-[#7A866E]/10 p-5 flex flex-col lg:flex-row gap-4">
        <div className="flex-1 relative">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-[#7A866E]"
          />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search volunteer..."
            className="w-full pl-11 pr-4 py-3 rounded-xl bg-[#F5F1E8] outline-none text-sm"
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-5 py-3 rounded-xl bg-[#F5F1E8] outline-none text-sm"
        >
          <option>All</option>
          <option>Pending</option>
          <option>Approved</option>
          <option>Rejected</option>
        </select>
      </div>

      {/* =====================================
          D. EMPTY STATE
      ===================================== */}
      {filteredVolunteers.length === 0 && (
        <div className="bg-white rounded-3xl border border-[#7A866E]/10 py-20 text-center">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-[#7A866E]/10 text-[#7A866E] flex items-center justify-center mb-5">
            <HeartHandshake size={28} />
          </div>
          <h3 className="font-bold text-lg text-[#2E332B]">
            No volunteer applications
          </h3>
          <p className="text-sm text-[#2E332B]/50 mt-2">
            Applications matching your filters will appear here.
          </p>
        </div>
      )}

      {/* =====================================
          E. DESKTOP TABLE
      ===================================== */}
      {filteredVolunteers.length > 0 && (
        <div className="hidden lg:block bg-white rounded-[30px] border border-[#7A866E]/10 overflow-hidden shadow-sm">
          <table className="w-full">
            <thead>
              <tr className="bg-[#F5F1E8]">
                <th className="px-6 py-5 text-left text-xs uppercase tracking-wider font-bold text-[#2E332B]/50">
                  Volunteer
                </th>
                <th className="px-6 py-5 text-left text-xs uppercase tracking-wider font-bold text-[#2E332B]/50">
                  Contact
                </th>
                <th className="px-6 py-5 text-left text-xs uppercase tracking-wider font-bold text-[#2E332B]/50">
                  Skills
                </th>
                <th className="px-6 py-5 text-left text-xs uppercase tracking-wider font-bold text-[#2E332B]/50">
                  Status
                </th>
                <th className="px-6 py-5 text-center text-xs uppercase tracking-wider font-bold text-[#2E332B]/50">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredVolunteers.map((volunteer, index) => {
                const status = volunteer.volunteerStatus || "Pending";

                return (
                  <motion.tr
                    key={volunteer.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.04 }}
                    className="border-t border-[#7A866E]/10 hover:bg-[#F5F1E8]/50 transition"
                  >
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-[#7A866E]/10 text-[#7A866E] flex items-center justify-center font-bold text-lg">
                          {volunteer.name?.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-bold text-[#2E332B]">
                            {volunteer.name}
                          </p>
                          <p className="text-xs text-[#2E332B]/45 mt-1">
                            Volunteer Applicant
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-5">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm text-[#2E332B]/70">
                          <Mail size={15} className="text-[#7A866E]" />
                          {volunteer.email}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-[#2E332B]/70">
                          <Phone size={15} className="text-[#7A866E]" />
                          {volunteer.phone || "N/A"}
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-5">
                      <div className="max-w-xs bg-[#F5F1E8] rounded-xl px-3 py-2 text-sm text-[#2E332B]/70">
                        {volunteer.volunteerApplication?.skills ||
                          "No skills added"}
                      </div>
                    </td>

                    <td className="px-6 py-5">
                      <span
                        className={`px-4 py-2 rounded-full text-xs font-bold ${statusStyles[status]}`}
                      >
                        {status}
                      </span>
                    </td>

                    <td className="px-6 py-5">
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() => setSelectedVolunteer(volunteer)}
                          className="w-10 h-10 rounded-xl bg-[#F5F1E8] text-[#7A866E] flex items-center justify-center hover:bg-[#7A866E] hover:text-white transition"
                        >
                          <Eye size={17} />
                        </button>

                        <button
                          onClick={() =>
                            handleStatusUpdate(volunteer.id, "Approved")
                          }
                          className="w-10 h-10 rounded-xl bg-green-50 text-green-600 flex items-center justify-center hover:bg-green-600 hover:text-white transition"
                        >
                          <Check size={17} />
                        </button>

                        <button
                          onClick={() =>
                            handleStatusUpdate(volunteer.id, "Rejected")
                          }
                          className="w-10 h-10 rounded-xl bg-red-50 text-red-500 flex items-center justify-center hover:bg-red-500 hover:text-white transition"
                        >
                          <X size={17} />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* =====================================
          F. MOBILE CARDS
      ===================================== */}
      {filteredVolunteers.length > 0 && (
        <div className="lg:hidden space-y-4">
          {filteredVolunteers.map((volunteer, index) => {
            const status = volunteer.volunteerStatus || "Pending";

            return (
              <motion.div
                key={volunteer.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.04 }}
                className="bg-white rounded-3xl border border-[#7A866E]/10 p-5 shadow-sm"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-12 h-12 shrink-0 rounded-2xl bg-[#7A866E]/10 text-[#7A866E] flex items-center justify-center font-bold text-lg">
                      {volunteer.name?.charAt(0).toUpperCase()}
                    </div>
                    <div className="min-w-0">
                      <p className="font-bold text-[#2E332B] truncate">
                        {volunteer.name}
                      </p>
                      <p className="text-xs text-[#2E332B]/45">
                        Volunteer Applicant
                      </p>
                    </div>
                  </div>

                  <span
                    className={`px-3 py-1.5 rounded-full text-xs font-bold shrink-0 ${statusStyles[status]}`}
                  >
                    {status}
                  </span>
                </div>

                <div className="mt-4 space-y-2">
                  <div className="flex items-center gap-2 text-sm text-[#2E332B]/70">
                    <Mail size={14} className="text-[#7A866E] shrink-0" />
                    <span className="truncate">{volunteer.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-[#2E332B]/70">
                    <Phone size={14} className="text-[#7A866E] shrink-0" />
                    {volunteer.phone || "N/A"}
                  </div>
                </div>

                <div className="mt-3 bg-[#F5F1E8] rounded-xl px-3 py-2 text-sm text-[#2E332B]/70">
                  {volunteer.volunteerApplication?.skills || "No skills added"}
                </div>

                <div className="flex gap-2 mt-4">
                  <button
                    onClick={() => setSelectedVolunteer(volunteer)}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-[#F5F1E8] text-[#7A866E] text-xs font-bold hover:bg-[#7A866E] hover:text-white transition"
                  >
                    <Eye size={14} /> View
                  </button>
                  <button
                    onClick={() =>
                      handleStatusUpdate(volunteer.id, "Approved")
                    }
                    className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-green-50 text-green-600 text-xs font-bold hover:bg-green-600 hover:text-white transition"
                  >
                    <Check size={14} /> Approve
                  </button>
                  <button
                    onClick={() =>
                      handleStatusUpdate(volunteer.id, "Rejected")
                    }
                    className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-red-50 text-red-500 text-xs font-bold hover:bg-red-500 hover:text-white transition"
                  >
                    <X size={14} /> Reject
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* =====================================
          G. VOLUNTEER DETAILS MODAL
      ===================================== */}
      <AnimatePresence>
        {selectedVolunteer && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[#2E332B]/60 backdrop-blur-sm flex items-center justify-center z-50 p-6"
            onClick={() => setSelectedVolunteer(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 16 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-[30px] p-8 max-w-lg w-full shadow-2xl"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-[#2E332B]">
                  Volunteer Application
                </h2>
                <button
                  onClick={() => setSelectedVolunteer(null)}
                  className="w-9 h-9 rounded-full flex items-center justify-center text-[#2E332B]/50 hover:bg-[#F5F1E8] transition"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="flex items-center gap-4 mt-6">
                <div className="w-14 h-14 rounded-2xl bg-[#7A866E]/10 text-[#7A866E] flex items-center justify-center font-bold text-xl">
                  {selectedVolunteer.name?.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="font-bold text-[#2E332B]">
                    {selectedVolunteer.name}
                  </p>
                  <span
                    className={`inline-block mt-1 px-3 py-1 rounded-full text-xs font-bold ${
                      statusStyles[
                        selectedVolunteer.volunteerStatus || "Pending"
                      ]
                    }`}
                  >
                    {selectedVolunteer.volunteerStatus || "Pending"}
                  </span>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <div className="flex items-center gap-3 bg-[#F5F1E8] rounded-xl px-4 py-3">
                  <Mail size={16} className="text-[#7A866E] shrink-0" />
                  <span className="text-sm text-[#2E332B]">
                    {selectedVolunteer.email}
                  </span>
                </div>

                <div className="flex items-center gap-3 bg-[#F5F1E8] rounded-xl px-4 py-3">
                  <Phone size={16} className="text-[#7A866E] shrink-0" />
                  <span className="text-sm text-[#2E332B]">
                    {selectedVolunteer.phone || "N/A"}
                  </span>
                </div>

                <div className="bg-[#F5F1E8] rounded-xl px-4 py-3">
                  <p className="text-xs text-[#2E332B]/45 mb-1">Skills</p>
                  <p className="text-sm text-[#2E332B] font-medium">
                    {selectedVolunteer.volunteerApplication?.skills || "N/A"}
                  </p>
                </div>

                <div className="bg-[#F5F1E8] rounded-xl px-4 py-3">
                  <p className="text-xs text-[#2E332B]/45 mb-1">Message</p>
                  <p className="text-sm text-[#2E332B] font-medium leading-relaxed">
                    {selectedVolunteer.volunteerApplication?.message || "N/A"}
                  </p>
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-8">
                <button
                  onClick={() =>
                    handleStatusUpdate(selectedVolunteer.id, "Rejected")
                  }
                  className="px-6 py-3 rounded-full border border-red-200 text-red-500 text-sm font-semibold hover:bg-red-50 transition"
                >
                  Reject
                </button>
                <button
                  onClick={() =>
                    handleStatusUpdate(selectedVolunteer.id, "Approved")
                  }
                  className="px-6 py-3 rounded-full bg-[#7A866E] text-white text-sm font-semibold hover:bg-[#2E332B] transition"
                >
                  Approve
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default VolunteerTable;