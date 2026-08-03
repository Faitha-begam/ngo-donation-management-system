import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import {
  AlertTriangle,
  Clock3,
  HandHelping,
  HeartHandshake,
  IndianRupee,
  MapPin,
  Package,
  UserRound,
} from "lucide-react";

import { getCurrentUser } from "../utils/auth";
import {
  addSupportToEmergencyRequest,
  getEmergencyById,
} from "../utils/emergencyStorage";

const SUPPORT_TYPES = [
  { value: "money", label: "Money Support", icon: IndianRupee },
  { value: "item", label: "Item Support", icon: Package },
  { value: "volunteer", label: "Volunteer Support", icon: HandHelping },
];

const formatDate = (date) =>
  new Date(date).toLocaleString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });

export default function EmergencyRequestDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [request, setRequest] = useState(() => getEmergencyById(id));
  const [supportType, setSupportType] = useState("money");
  const [formData, setFormData] = useState({ amount: "", itemName: "", quantity: "", message: "" });
  const [error, setError] = useState("");
  const inputClassName = "w-full rounded-xl border border-[#DCCFC0] bg-[#F8F6F1] px-4 py-3 text-sm outline-none transition focus:border-[#66785F] focus:ring-2 focus:ring-[#66785F]/20";

  if (!request) {
    return (
      <main className="min-h-screen bg-[#FDF6ED] px-6 py-16">
        <div className="mx-auto max-w-xl rounded-3xl bg-white p-10 text-center shadow-sm">
          <AlertTriangle className="mx-auto h-12 w-12 text-amber-600" />
          <h1 className="mt-4 text-2xl font-bold text-[#2E332B]">Request not found</h1>
          <Link to="/emergency-requests" className="mt-6 inline-block font-semibold text-[#66785F]">Return to emergency requests</Link>
        </div>
      </main>
    );
  }

  const supporters = request.supporters || [];
  const moneyCollected = supporters.reduce(
    (total, supporter) => total + (supporter.supportType === "money" ? Number(supporter.amount || 0) : 0),
    0
  );
  const amountRequired = Number(request.amountRequired || 0);
  const progress = amountRequired ? Math.min((moneyCollected / amountRequired) * 100, 100) : 0;
  const timeline = request.timeline || [{ action: "Emergency request created", date: request.createdAt }];

  const updateField = (field, value) => {
    setFormData((current) => ({ ...current, [field]: value }));
    setError("");
  };

  const changeSupportType = (type) => {
    setSupportType(type);
    setFormData({ amount: "", itemName: "", quantity: "", message: "" });
    setError("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const currentUser = getCurrentUser();

    if (!currentUser) {
      navigate("/login", { state: { message: "Please login to support this emergency request." } });
      return;
    }

    if (supportType === "money" && Number(formData.amount) <= 0) {
      setError("Enter a valid support amount.");
      return;
    }

    if (supportType === "item" && (!formData.itemName.trim() || Number(formData.quantity) <= 0)) {
      setError("Enter an item name and a valid quantity.");
      return;
    }

    if (supportType === "volunteer" && !formData.message.trim()) {
      setError("Please add a message about how you can help.");
      return;
    }

    const updatedRequest = addSupportToEmergencyRequest(request.id, {
      userId: currentUser.id,
      userName: currentUser.name,
      supportType,
      amount: supportType === "money" ? Number(formData.amount) : null,
      items: supportType === "item" ? { name: formData.itemName.trim(), quantity: Number(formData.quantity) } : null,
      message: formData.message.trim(),
    });

    setRequest(updatedRequest);
    setFormData({ amount: "", itemName: "", quantity: "", message: "" });
    toast.success("Your support has been recorded. Thank you!");
  };

  return (
    <main className="min-h-screen bg-[#FDF6ED] px-6 py-10 md:py-14">
      <div className="mx-auto max-w-6xl">
        <Link to="/emergency-requests" className="text-sm font-semibold text-[#66785F] hover:text-[#2E332B]">← Back to emergency requests</Link>

        <div className="mt-6 grid gap-8 lg:grid-cols-[1.4fr_0.8fr]">
          <section className="rounded-3xl border border-[#DCCFC0] bg-white p-6 md:p-10">
            <div className="flex flex-wrap items-center gap-3 text-sm font-semibold text-[#66785F]"><HeartHandshake className="h-5 w-5" />{request.category}</div>
            <h1 className="mt-4 text-3xl font-bold text-[#2E332B] md:text-4xl">{request.title}</h1>
            <div className="mt-5 flex flex-wrap gap-4 text-sm text-gray-600">
              <span className="flex items-center gap-2"><MapPin className="h-4 w-4 text-[#66785F]" />{request.location}</span>
              <span className="flex items-center gap-2"><AlertTriangle className="h-4 w-4 text-orange-600" />{request.urgency} urgency</span>
            </div>

            <p className="mt-8 whitespace-pre-wrap leading-7 text-gray-700">{request.description}</p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <InfoCard icon={HandHelping} label="Help needed" value={request.helpType} />
              <InfoCard icon={IndianRupee} label="Required amount" value={`₹${amountRequired.toLocaleString("en-IN")}`} />
              <InfoCard icon={Package} label="Required items" value={request.requiredItems} />
              <InfoCard icon={UserRound} label="Created by" value={request.creatorName} />
            </div>
            <p className="mt-6 text-sm text-gray-500">Created {formatDate(request.createdAt)}</p>
          </section>

          <aside className="space-y-6">
            <section className="rounded-3xl bg-[#2E332B] p-6 text-white shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-wider text-[#DCCFC0]">Support Progress</p>
              <p className="mt-4 text-2xl font-bold">₹{moneyCollected.toLocaleString("en-IN")} <span className="text-base font-normal text-white/70">/ ₹{amountRequired.toLocaleString("en-IN")}</span></p>
              <div className="mt-4 h-3 overflow-hidden rounded-full bg-white/20"><motion.div initial={{ width: 0 }} animate={{ width: `${progress}%` }} transition={{ duration: 0.45 }} className="h-full rounded-full bg-[#DCCFC0]" /></div>
              <p className="mt-4 flex items-center gap-2 text-sm text-white/80"><HeartHandshake className="h-4 w-4" />{supporters.length} {supporters.length === 1 ? "supporter" : "supporters"} helping</p>
            </section>

            <section className="rounded-3xl border border-[#DCCFC0] bg-white p-6">
              <h2 className="text-xl font-bold text-[#2E332B]">Offer Support</h2>
              <div className="mt-5 grid grid-cols-3 gap-2">
                {SUPPORT_TYPES.map(({ value, label, icon: Icon }) => (
                  <button key={value} type="button" onClick={() => changeSupportType(value)} className={`rounded-xl p-3 text-xs font-semibold transition ${supportType === value ? "bg-[#66785F] text-white" : "bg-[#F8F6F1] text-[#2E332B] hover:bg-[#E9E4DB]"}`}>
                    <Icon className="mx-auto mb-1 h-5 w-5" />{label.replace(" Support", "")}
                  </button>
                ))}
              </div>

              <form onSubmit={handleSubmit} className="mt-5 space-y-4">
                {supportType === "money" && <input type="number" min="1" value={formData.amount} onChange={(event) => updateField("amount", event.target.value)} className={inputClassName} placeholder="Amount (₹)" />}
                {supportType === "item" && <div className="grid grid-cols-2 gap-3"><input value={formData.itemName} onChange={(event) => updateField("itemName", event.target.value)} className={inputClassName} placeholder="Item name" /><input type="number" min="1" value={formData.quantity} onChange={(event) => updateField("quantity", event.target.value)} className={inputClassName} placeholder="Quantity" /></div>}
                <textarea rows="3" value={formData.message} onChange={(event) => updateField("message", event.target.value)} className={`${inputClassName} resize-none`} placeholder={supportType === "volunteer" ? "How can you volunteer?" : "Add an optional message"} />
                {error && <p className="text-sm text-red-600">{error}</p>}
                <button type="submit" className="w-full rounded-full bg-[#66785F] px-5 py-3 font-semibold text-white transition hover:bg-[#2E332B]">Submit Support</button>
              </form>
            </section>
          </aside>
        </div>

        <section className="mt-8 rounded-3xl border border-[#DCCFC0] bg-white p-6 md:p-8">
          <h2 className="flex items-center gap-2 text-2xl font-bold text-[#2E332B]"><Clock3 className="h-6 w-6 text-[#66785F]" />Support Timeline</h2>
          <ol className="mt-6 space-y-5 border-l-2 border-[#DCCFC0] pl-6">
            {timeline.map((entry, index) => <li key={`${entry.date}-${index}`} className="relative"><span className="absolute -left-[33px] top-1 h-3.5 w-3.5 rounded-full bg-[#66785F] ring-4 ring-[#FDF6ED]" /><p className="font-medium text-[#2E332B]">{entry.action}</p><p className="mt-1 text-sm text-gray-500">{formatDate(entry.date)}</p></li>)}
          </ol>
        </section>
      </div>
    </main>
  );
}

function InfoCard({ icon: Icon, label, value }) {
  return <div className="rounded-2xl bg-[#F8F6F1] p-4"><Icon className="h-5 w-5 text-[#66785F]" /><p className="mt-3 text-xs font-semibold uppercase tracking-wide text-gray-500">{label}</p><p className="mt-1 font-medium text-[#2E332B]">{value}</p></div>;
}
