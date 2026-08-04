import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { CircleMarker, MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { AlertTriangle, BadgeCheck, Clock3, HandHelping, HeartHandshake, IndianRupee, MapPin, Package, ShieldCheck, UserRound } from "lucide-react";

import { getCurrentUser } from "../utils/auth";
import { activateEmergencyRequest, addEmergencyComment, addEmergencyUpdate, addSupportToEmergencyRequest, addVerificationNote, completeEmergencyRequest, getEmergencyById, getEmergencyRequests, moderateEmergencyComment, rejectEmergencyRequest, requestEmergencyInformation, toggleEmergencyUpdatePin, verifyEmergencyRequest } from "../utils/emergencyStorage";
import { addHopePoints } from "../utils/hopePoints";
import { calculateEmergencyTrustScore } from "../utils/trustScore";

const supportTypes = [
  { value: "money", label: "Money", icon: IndianRupee },
  { value: "item", label: "Items", icon: Package },
  { value: "volunteer", label: "Volunteer", icon: HandHelping },
];

const formatDate = (date) => new Date(date).toLocaleString("en-IN", { day: "numeric", month: "short", year: "numeric", hour: "numeric", minute: "2-digit" });

export default function EmergencyRequestDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [request, setRequest] = useState(() => getEmergencyById(id));
  const [supportType, setSupportType] = useState("money");
  const [formData, setFormData] = useState({ amount: "", itemName: "", quantity: "", message: "" });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [updateText, setUpdateText] = useState("");
  const [updateImage, setUpdateImage] = useState("");
  const [commentText, setCommentText] = useState("");
  const [replyTo, setReplyTo] = useState(null);
  const supportSubmissionId = useRef(`support-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`);
  const inputClass = "w-full rounded-xl border border-[#DCCFC0] bg-[#F8F6F1] px-4 py-3 text-sm outline-none transition focus:border-[#66785F] focus:ring-2 focus:ring-[#66785F]/20";

  useEffect(() => {
    const refreshRequest = () => setRequest(getEmergencyById(id));
    window.addEventListener("emergencyRequestsUpdated", refreshRequest);
    window.addEventListener("storage", refreshRequest);
    return () => {
      window.removeEventListener("emergencyRequestsUpdated", refreshRequest);
      window.removeEventListener("storage", refreshRequest);
    };
  }, [id]);

  if (!request) return <main className="min-h-screen bg-[#FDF6ED] px-6 py-16"><div className="mx-auto max-w-xl rounded-3xl bg-white p-10 text-center shadow-sm"><AlertTriangle className="mx-auto h-12 w-12 text-amber-600" /><h1 className="mt-4 text-2xl font-bold text-[#2E332B]">Request not found</h1><Link to="/emergency-requests" className="mt-6 inline-block font-semibold text-[#66785F]">Return to emergency requests</Link></div></main>;

  const supporters = request.supporters || [];
  const moneyCollected = supporters.reduce((total, support) => total + (support.supportType === "money" ? Number(support.amount || 0) : 0), 0);
  const amountRequired = Number(request.amountRequired || 0);
  const progress = amountRequired ? Math.min((moneyCollected / amountRequired) * 100, 100) : 0;
  const trust = calculateEmergencyTrustScore(request);
  const acceptsSupport = request.status === "active" || request.status === "verified";
  const currentUser = getCurrentUser();
  const isCreator = currentUser && String(currentUser.id) === String(request.creatorId);
  const isAdmin = currentUser?.role === "admin";

  const updateField = (field, value) => {
    setFormData((current) => ({ ...current, [field]: value }));
    setError("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isSubmitting) return;
    const currentUser = getCurrentUser();
    if (!currentUser) {
      navigate("/login", { state: { message: "Please login to support this emergency request." } });
      return;
    }
    if (String(currentUser.id) === String(request.creatorId)) {
      setError("You cannot support your own emergency request.");
      return;
    }
    if (!acceptsSupport) {
      setError("This emergency request is not currently accepting support.");
      return;
    }
    if (supportType === "money" && Number(formData.amount) <= 0) return setError("Enter a valid support amount.");
    if (supportType === "item" && (!formData.itemName.trim() || Number(formData.quantity) <= 0)) return setError("Enter an item name and valid quantity.");
    if (supportType === "volunteer" && !formData.message.trim()) return setError("Please explain how you can help.");

    const supportId = supportSubmissionId.current;
    setIsSubmitting(true);
    const updatedRequest = addSupportToEmergencyRequest(request.id, {
      id: supportId,
      userId: currentUser.id,
      userName: currentUser.name,
      supportType,
      amount: supportType === "money" ? Number(formData.amount) : null,
      items: supportType === "item" ? { name: formData.itemName.trim(), quantity: Number(formData.quantity) } : null,
      message: formData.message.trim(),
    });
    if (!updatedRequest) {
      setIsSubmitting(false);
      return setError("Unable to save support. Please try again.");
    }

    addHopePoints(currentUser.id, { money: 20, item: 15, volunteer: 25 }[supportType], `Supported ${request.category.toLowerCase()}`, `emergency-support:${request.id}:${supportId}`);
    setRequest(updatedRequest);
    setFormData({ amount: "", itemName: "", quantity: "", message: "" });
    supportSubmissionId.current = `support-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
    setIsSubmitting(false);
    toast.success("Your support has been recorded.");
  };

  const submitUpdate = (event) => {
    event.preventDefault();
    if (!updateText.trim()) return;
    const updated = addEmergencyUpdate(request.id, { creatorId: currentUser.id, creator: currentUser.name, message: updateText, image: updateImage });
    setRequest(updated); setUpdateText(""); setUpdateImage(""); toast.success("Emergency update posted.");
  };
  const readUpdateImage = (file) => { if (!file) return setUpdateImage(""); const reader = new FileReader(); reader.onload = () => setUpdateImage(reader.result); reader.readAsDataURL(file); };
  const submitComment = (event) => { event.preventDefault(); if (!currentUser) return navigate("/login"); const updated = addEmergencyComment(request.id, { userId: currentUser.id, userName: currentUser.name, badge: currentUser.role === "admin" ? "Admin" : "Hope Supporter", message: commentText }, replyTo); setRequest(updated); setCommentText(""); setReplyTo(null); };

  return <main className="min-h-screen bg-[#FDF6ED] px-6 py-10 md:py-14"><div className="mx-auto max-w-6xl">
    <Link to="/emergency-requests" className="text-sm font-semibold text-[#66785F] hover:text-[#2E332B]">← Back to emergency requests</Link>
    <div className="mt-6 grid gap-8 lg:grid-cols-[1.4fr_0.8fr]">
      <section className="rounded-3xl border border-[#DCCFC0] bg-white p-6 md:p-10">
        <div className="flex flex-wrap items-center gap-3 text-sm font-semibold text-[#66785F]"><HeartHandshake className="h-5 w-5" />{request.category}<span className="rounded-full bg-emerald-100 px-3 py-1 text-xs text-emerald-800">{request.status === "active" ? "Active" : request.status}</span></div>
        <h1 className="mt-4 text-3xl font-bold text-[#2E332B] md:text-4xl">{request.title}</h1>
        <div className="mt-5 flex flex-wrap gap-4 text-sm text-gray-600"><span className="flex items-center gap-2"><MapPin className="h-4 w-4 text-[#66785F]" />{request.location}</span><span className="flex items-center gap-2"><AlertTriangle className="h-4 w-4 text-orange-600" />{request.urgency} urgency</span></div>
        <p className="mt-8 whitespace-pre-wrap leading-7 text-gray-700">{request.description}</p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2"><InfoCard icon={HandHelping} label="Help needed" value={request.helpType} /><InfoCard icon={IndianRupee} label="Required amount" value={`₹${amountRequired.toLocaleString("en-IN")}`} /><InfoCard icon={Package} label="Required items" value={request.requiredItems} /><InfoCard icon={UserRound} label="Created by" value={request.creatorName} /></div>
        <p className="mt-6 text-sm text-gray-500">Created {formatDate(request.createdAt)}</p>
        <section className="mt-8 rounded-2xl border border-emerald-100 bg-emerald-50/70 p-5"><div className="flex items-center justify-between gap-4"><h2 className="flex items-center gap-2 text-lg font-bold text-[#2E332B]"><ShieldCheck className="h-6 w-6 text-emerald-700" />Emergency Trust Score</h2><span className="text-2xl font-bold text-emerald-700">{trust.score}%</span></div>{trust.factors.length ? <ul className="mt-4 space-y-2 text-sm text-gray-700">{trust.factors.map((factor) => <li key={factor} className="flex items-center gap-2"><BadgeCheck className="h-4 w-4 text-emerald-700" />{factor}</li>)}</ul> : <p className="mt-3 text-sm text-gray-600">Trust details will be added as this request is reviewed.</p>}</section>
      </section>
      <aside className="space-y-6"><section className="rounded-3xl bg-[#2E332B] p-6 text-white shadow-sm"><p className="text-sm font-semibold uppercase tracking-wider text-[#DCCFC0]">Support Progress</p><p className="mt-4 text-2xl font-bold">₹{moneyCollected.toLocaleString("en-IN")} <span className="text-base font-normal text-white/70">/ ₹{amountRequired.toLocaleString("en-IN")}</span></p><div className="mt-4 h-3 overflow-hidden rounded-full bg-white/20"><motion.div initial={{ width: 0 }} animate={{ width: `${progress}%` }} transition={{ duration: 0.45 }} className="h-full rounded-full bg-[#DCCFC0]" /></div><p className="mt-4 flex items-center gap-2 text-sm text-white/80"><HeartHandshake className="h-4 w-4" />{supporters.length} {supporters.length === 1 ? "supporter" : "supporters"} helping</p></section>
        <section className="rounded-3xl border border-[#DCCFC0] bg-white p-6"><h2 className="text-xl font-bold text-[#2E332B]">Offer Support</h2><div className="mt-5 grid grid-cols-3 gap-2">{supportTypes.map(({ value, label, icon: Icon }) => <button key={value} type="button" onClick={() => { setSupportType(value); setError(""); }} className={`rounded-xl p-3 text-xs font-semibold transition ${supportType === value ? "bg-[#66785F] text-white" : "bg-[#F8F6F1] text-[#2E332B]"}`}><Icon className="mx-auto mb-1 h-5 w-5" />{label}</button>)}</div><form onSubmit={handleSubmit} className="mt-5 space-y-4">{supportType === "money" && <input type="number" min="1" value={formData.amount} onChange={(event) => updateField("amount", event.target.value)} className={inputClass} placeholder="Amount (₹)" />}{supportType === "item" && <div className="grid grid-cols-2 gap-3"><input value={formData.itemName} onChange={(event) => updateField("itemName", event.target.value)} className={inputClass} placeholder="Item name" /><input type="number" min="1" value={formData.quantity} onChange={(event) => updateField("quantity", event.target.value)} className={inputClass} placeholder="Quantity" /></div>}<textarea rows="3" value={formData.message} onChange={(event) => updateField("message", event.target.value)} className={`${inputClass} resize-none`} placeholder={supportType === "volunteer" ? "How can you volunteer?" : "Optional message"} />{error && <p className="text-sm text-red-600">{error}</p>}<button type="submit" disabled={!acceptsSupport || isSubmitting} className="w-full rounded-full bg-[#66785F] px-5 py-3 font-semibold text-white transition hover:bg-[#2E332B] disabled:cursor-not-allowed disabled:opacity-50">{isSubmitting ? "Saving support..." : acceptsSupport ? "Submit Support" : "Support unavailable"}</button></form></section>
      </aside>
    </div>
    <section className="mt-8 rounded-3xl border border-[#DCCFC0] bg-white p-6 md:p-8"><h2 className="flex items-center gap-2 text-2xl font-bold text-[#2E332B]"><Clock3 className="h-6 w-6 text-[#66785F]" />Support Timeline</h2><ol className="mt-6 space-y-5 border-l-2 border-[#DCCFC0] pl-6">{(request.timeline || []).map((entry, index) => <li key={`${entry.date}-${index}`} className="relative"><span className="absolute -left-[33px] top-1 h-3.5 w-3.5 rounded-full bg-[#66785F] ring-4 ring-[#FDF6ED]" /><p className="font-medium text-[#2E332B]">{entry.action}</p><p className="mt-1 text-sm text-gray-500">{formatDate(entry.date)}</p></li>)}</ol></section>
    <section className="mt-8 grid gap-8 lg:grid-cols-2">
      <div className="rounded-3xl border border-[#DCCFC0] bg-white p-6"><h2 className="text-2xl font-bold text-[#2E332B]">Emergency updates</h2>{isCreator && ["verified", "active"].includes(request.status) && <form onSubmit={submitUpdate} className="mt-4 space-y-3"><textarea value={updateText} onChange={(event) => setUpdateText(event.target.value)} className={inputClass} rows="3" placeholder="Share progress: food delivered, supplies needed, shelter completed…" /><input type="file" accept="image/*" onChange={(event) => readUpdateImage(event.target.files?.[0])} className="text-sm" /><button className="rounded-full bg-[#66785F] px-5 py-2 text-sm font-bold text-white">Post update</button></form>}<div className="mt-5 space-y-4">{[...(request.updates || [])].sort((a, b) => Number(b.pinned) - Number(a.pinned) || new Date(b.createdAt) - new Date(a.createdAt)).map((update) => <article key={update.id} className="rounded-2xl bg-[#F8F6F1] p-4"><div className="flex justify-between gap-3"><p className="font-bold text-[#2E332B]">{update.creator}{update.pinned && <span className="ml-2 rounded-full bg-amber-100 px-2 py-1 text-xs text-amber-800">Pinned</span>}</p>{isAdmin && <button onClick={() => setRequest(toggleEmergencyUpdatePin(request.id, update.id))} className="text-xs font-bold text-[#66785F]">{update.pinned ? "Unpin" : "Pin"}</button>}</div><p className="mt-2 text-sm text-gray-700">{update.message}</p>{update.image && <img src={update.image} alt="Emergency update" className="mt-3 max-h-52 rounded-xl object-cover" />}<p className="mt-2 text-xs text-gray-500">{formatDate(update.createdAt)}</p></article>)}{!request.updates?.length && <p className="text-sm text-gray-500">No updates have been posted yet.</p>}</div></div>
      <div className="rounded-3xl border border-[#DCCFC0] bg-white p-6"><h2 className="text-2xl font-bold text-[#2E332B]">Encouragement</h2><form onSubmit={submitComment} className="mt-4"><textarea value={commentText} onChange={(event) => setCommentText(event.target.value)} className={inputClass} rows="3" placeholder={replyTo ? "Write a reply…" : "Leave an encouraging comment…"} />{replyTo && <button type="button" onClick={() => setReplyTo(null)} className="mt-2 text-xs font-bold text-[#66785F]">Cancel reply</button>}<button className="mt-3 rounded-full bg-[#66785F] px-5 py-2 text-sm font-bold text-white">{replyTo ? "Reply" : "Post comment"}</button></form><div className="mt-5 space-y-4">{(request.comments || []).filter((comment) => !comment.parentId && (!comment.hidden || isAdmin)).map((comment) => <CommentThread key={comment.id} comment={comment} comments={request.comments} isAdmin={isAdmin} onReply={setReplyTo} onModerate={(mode, commentId) => setRequest(moderateEmergencyComment(request.id, commentId, mode))} />)}</div></div>
    </section>
    {isAdmin && <AdminCaseFile request={request} onRefresh={setRequest} />}
  </div></main>;
}

function InfoCard({ icon: Icon, label, value }) { return <div className="rounded-2xl bg-[#F8F6F1] p-4"><Icon className="h-5 w-5 text-[#66785F]" /><p className="mt-3 text-xs font-semibold uppercase tracking-wide text-gray-500">{label}</p><p className="mt-1 font-medium text-[#2E332B]">{value}</p></div>; }

function CommentThread({ comment, comments, isAdmin, onReply, onModerate }) { const replies = comments.filter((item) => item.parentId === comment.id); return <article className={`rounded-2xl p-4 ${comment.hidden ? "bg-gray-100 opacity-70" : "bg-[#F8F6F1]"}`}><p className="font-bold text-[#2E332B]">{comment.userName} {comment.badge && <span className="ml-1 text-xs text-[#66785F]">{comment.badge}</span>}</p><p className="mt-1 text-sm text-gray-700">{comment.hidden ? "Comment hidden by moderation." : comment.message}</p><div className="mt-2 flex gap-3 text-xs font-bold text-[#66785F]"><button onClick={() => onReply(comment.id)}>Reply</button>{isAdmin && <><button onClick={() => onModerate("hide", comment.id)}>{comment.hidden ? "Show" : "Hide"}</button><button onClick={() => onModerate("delete", comment.id)} className="text-red-600">Delete</button></>}</div>{replies.map((reply) => <div key={reply.id} className="mt-3 ml-4 border-l-2 border-[#DCCFC0] pl-3"><p className="text-sm font-bold text-[#2E332B]">{reply.userName}</p><p className="text-sm text-gray-700">{reply.hidden ? "Reply hidden by moderation." : reply.message}</p>{isAdmin && <button onClick={() => onModerate("delete", reply.id)} className="mt-1 text-xs font-bold text-red-600">Delete reply</button>}</div>)}</article>; }

function AdminCaseFile({ request, onRefresh }) { const [note, setNote] = useState(""); const [reason, setReason] = useState(""); const action = (fn, value) => { const next = fn(request.id, value); if (next) onRefresh(next); }; const previous = getEmergencyRequests().filter((item) => item.id !== request.id && String(item.creatorId) === String(request.creatorId)); const hasLocation = Number.isFinite(Number(request.latitude)) && Number.isFinite(Number(request.longitude)); return <section className="mt-8 rounded-3xl border border-[#DCCFC0] bg-white p-6"><h2 className="text-2xl font-bold text-[#2E332B]">Admin case file</h2><div className="mt-5 grid gap-4 md:grid-cols-2"><InfoCard icon={MapPin} label="Coordinates" value={`${request.latitude ?? "Not provided"}, ${request.longitude ?? "Not provided"}`} /><InfoCard icon={UserRound} label="Emergency contact" value={`${request.emergencyContact?.name || "Not provided"} · ${request.emergencyContact?.phone || ""}`} /><InfoCard icon={MapPin} label="Landmark" value={request.landmark || "Not provided"} /><InfoCard icon={Clock3} label="Need by" value={request.needBy ? formatDate(request.needBy) : "Not provided"} /></div>{hasLocation && <MapContainer center={[Number(request.latitude), Number(request.longitude)]} zoom={13} className="mt-5 h-60 w-full overflow-hidden rounded-2xl" scrollWheelZoom><TileLayer attribution="&copy; OpenStreetMap contributors" url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" /><CircleMarker center={[Number(request.latitude), Number(request.longitude)]} radius={10} pathOptions={{ color: "#dc2626", fillColor: "#dc2626", fillOpacity: 0.8 }} /></MapContainer>}<p className="mt-5 whitespace-pre-wrap text-sm text-gray-700">{request.supportingDescription}</p>{request.evidencePhotos?.length > 0 && <div className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-5">{request.evidencePhotos.map((photo) => <img key={photo} src={photo} alt="Evidence" className="h-28 w-full rounded-xl object-cover" />)}</div>}{request.videoLink && <a className="mt-4 inline-block text-sm font-bold text-[#66785F]" href={request.videoLink} target="_blank" rel="noreferrer">Open supporting video</a>}<div className="mt-6 grid gap-3 md:grid-cols-2"><textarea value={note} onChange={(event) => setNote(event.target.value)} className="rounded-xl border border-[#DCCFC0] p-3 text-sm" placeholder="Internal verification note or information request" /><div className="flex flex-wrap content-start gap-2"><button onClick={() => { action(addVerificationNote, note); setNote(""); }} className="rounded-lg bg-[#66785F] px-3 py-2 text-sm font-bold text-white">Save note</button><button onClick={() => { action(requestEmergencyInformation, note); setNote(""); }} className="rounded-lg border border-[#66785F] px-3 py-2 text-sm font-bold text-[#66785F]">Request info</button></div></div><div className="mt-5 flex flex-wrap gap-2"><button onClick={() => action(verifyEmergencyRequest)} className="rounded-lg bg-emerald-600 px-3 py-2 text-sm font-bold text-white">Approve</button><button onClick={() => action(activateEmergencyRequest)} className="rounded-lg bg-sky-600 px-3 py-2 text-sm font-bold text-white">Mark active</button><button onClick={() => action(completeEmergencyRequest)} className="rounded-lg bg-[#2E332B] px-3 py-2 text-sm font-bold text-white">Complete</button><input value={reason} onChange={(event) => setReason(event.target.value)} className="rounded-lg border border-[#DCCFC0] px-3 text-sm" placeholder="Rejection reason" /><button onClick={() => action(rejectEmergencyRequest, reason)} className="rounded-lg bg-red-600 px-3 py-2 text-sm font-bold text-white">Reject</button></div><div className="mt-5 space-y-2">{request.verificationNotes.map((item) => <p key={item.id} className="rounded-lg bg-[#F8F6F1] p-3 text-sm"><b>{item.author}:</b> {item.message}</p>)}</div><div className="mt-6"><h3 className="font-bold text-[#2E332B]">Previous requests by this creator</h3>{previous.length ? previous.map((item) => <Link key={item.id} to={`/emergency-request/${item.id}`} className="mt-2 block rounded-lg bg-[#F8F6F1] p-3 text-sm"><b>{item.title}</b> · {item.status}</Link>) : <p className="mt-2 text-sm text-gray-500">No previous emergency requests.</p>}</div></section>; }
