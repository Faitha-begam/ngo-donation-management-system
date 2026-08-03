import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { AlertTriangle, BadgeCheck, CheckCircle, ShieldCheck, XCircle } from "lucide-react";
import toast from "react-hot-toast";

import { getUsers } from "../../utils/auth";
import {
  completeEmergencyRequest,
  getEmergencyRequests,
  rejectEmergencyRequest,
  verifyEmergencyRequest,
} from "../../utils/emergencyStorage";
import { createNotification } from "../../utils/notificationStorage";
import { addHopePoints } from "../../utils/hopePoints";

const statusStyles = {
  pending: "bg-amber-100 text-amber-800",
  verified: "bg-emerald-100 text-emerald-800",
  completed: "bg-sky-100 text-sky-800",
  rejected: "bg-red-100 text-red-800",
};

const priorityByUrgency = {
  Critical: "critical",
  High: "high",
  Medium: "medium",
  Low: "medium",
};

const formatDate = (date) => new Date(date).toLocaleDateString("en-IN", {
  day: "numeric",
  month: "short",
  year: "numeric",
});

export default function EmergencyManagement() {
  const [requests, setRequests] = useState([]);

  const loadRequests = () => setRequests(getEmergencyRequests());

  useEffect(() => {
    loadRequests();
  }, []);

  const notifyVerification = (request) => {
    getUsers()
      .filter((user) => String(user.id) !== String(request.creatorId))
      .forEach((user) => {
        createNotification({
          userId: user.id,
          requestId: request.id,
          title: "Emergency Request Verified",
          message: `Emergency request verified: ${request.title}`,
          type: "emergency",
          priority: priorityByUrgency[request.urgency] || "medium",
        });
      });
  };

  const notifyCompletion = (request) => {
    const supporterIds = [...new Set((request.supporters || []).map((supporter) => supporter.userId))];

    supporterIds.forEach((userId) => {
      createNotification({
        userId,
        requestId: request.id,
        title: "Emergency Request Completed",
        message: `Emergency request completed. Thank you for helping with ${request.title}.`,
        type: "emergency",
        priority: "medium",
      });
      addHopePoints(
        userId,
        30,
        "Emergency support completed",
        `emergency-completion:${request.id}:${userId}`
      );
    });
  };

  const handleAction = (request, action) => {
    const actions = {
      verify: verifyEmergencyRequest,
      reject: rejectEmergencyRequest,
      complete: completeEmergencyRequest,
    };
    const updatedRequest = actions[action](request.id);

    if (!updatedRequest) {
      toast.error("Unable to update this emergency request.");
      return;
    }

    if (action === "verify") notifyVerification(updatedRequest);
    if (action === "complete") notifyCompletion(updatedRequest);

    loadRequests();
    toast.success(`Emergency request ${action === "verify" ? "verified" : action === "complete" ? "completed" : "rejected"}.`);
  };

  return (
    <section className="mt-8 rounded-3xl border border-white/70 bg-white/80 p-6 shadow-lg backdrop-blur-sm">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="flex items-center gap-2 text-2xl font-bold text-[#2E332B]"><ShieldCheck className="h-6 w-6 text-[#66785F]" />Emergency Management</h2>
          <p className="mt-1 text-gray-500">Review, verify, and close community emergency requests.</p>
        </div>
        <span className="rounded-full bg-[#F8F6F1] px-4 py-2 text-sm font-semibold text-[#2E332B]">{requests.length} total</span>
      </div>

      {requests.length === 0 ? (
        <div className="py-12 text-center text-gray-500"><AlertTriangle className="mx-auto mb-3 h-9 w-9 text-[#66785F]" />No emergency requests yet.</div>
      ) : (
        <div className="mt-6 overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="border-b border-[#DCCFC0] text-xs uppercase tracking-wide text-gray-500">
              <tr><th className="px-3 py-3">Request</th><th className="px-3 py-3">Creator</th><th className="px-3 py-3">Location</th><th className="px-3 py-3">Urgency</th><th className="px-3 py-3">Status</th><th className="px-3 py-3">Created</th><th className="px-3 py-3">Actions</th></tr>
            </thead>
            <tbody>
              {requests.map((request, index) => (
                <motion.tr key={request.id} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.18, delay: index * 0.03 }} className="border-b border-[#F0E7DB] last:border-0">
                  <td className="px-3 py-4"><p className="font-semibold text-[#2E332B]">{request.title}</p><p className="mt-1 text-xs text-gray-500">{request.category}</p></td>
                  <td className="px-3 py-4 text-gray-700">{request.creatorName}</td>
                  <td className="px-3 py-4 text-gray-700">{request.location}</td>
                  <td className="px-3 py-4"><span className="font-semibold text-orange-700">{request.urgency}</span></td>
                  <td className="px-3 py-4"><span className={`rounded-full px-3 py-1 text-xs font-bold capitalize ${statusStyles[request.status] || statusStyles.pending}`}>{request.status}</span></td>
                  <td className="px-3 py-4 text-gray-600">{formatDate(request.createdAt)}</td>
                  <td className="px-3 py-4"><div className="flex min-w-max gap-2">
                    <Link to={`/hope-map?request=${request.id}`} className="rounded-lg border border-[#66785F] px-3 py-2 text-xs font-semibold text-[#66785F] hover:bg-[#F8F6F1]">Map</Link>
                    {request.status === "pending" && <><button type="button" onClick={() => handleAction(request, "verify")} className="rounded-lg bg-emerald-600 px-3 py-2 text-xs font-semibold text-white hover:bg-emerald-700"><BadgeCheck className="mr-1 inline h-4 w-4" />Approve</button><button type="button" onClick={() => handleAction(request, "reject")} className="rounded-lg bg-red-600 px-3 py-2 text-xs font-semibold text-white hover:bg-red-700"><XCircle className="mr-1 inline h-4 w-4" />Reject</button></>}
                    {request.status === "verified" && <button type="button" onClick={() => handleAction(request, "complete")} className="rounded-lg bg-sky-600 px-3 py-2 text-xs font-semibold text-white hover:bg-sky-700"><CheckCircle className="mr-1 inline h-4 w-4" />Mark Completed</button>}
                    {["completed", "rejected"].includes(request.status) && <span className="px-2 py-2 text-xs text-gray-500">No further actions</span>}
                  </div></td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
