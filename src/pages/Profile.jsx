// pages/Profile.jsx
import { useEffect, useState } from "react";
import {
  Award, BadgeCheck, CalendarDays, CircleUserRound, HandHeart,
  HeartHandshake, Medal, ShieldCheck, Sparkles, WalletCards,
} from "lucide-react";
import { getCurrentUser, updateCurrentUser } from "../utils/auth";
import { getEmergencyRequests } from "../utils/emergencyStorage";
import { calculateEmergencyTrustScore } from "../utils/trustScore";
import { calculateRank, getHopePoints, HOPE_POINTS_UPDATED } from "../utils/hopePoints";
import RewardClaimPanel from "../components/RewardClaimPanel";

const Profile = () => {
  const currentUser = getCurrentUser();
  const [formData, setFormData] = useState({ name: currentUser?.name || "", email: currentUser?.email || "", phone: currentUser?.phone || "" });
  const [message, setMessage] = useState("");
  const [, setRefreshVersion] = useState(0);

  useEffect(() => {
    const refreshProfileData = () => setRefreshVersion((version) => version + 1);
    window.addEventListener(HOPE_POINTS_UPDATED, refreshProfileData);
    window.addEventListener("emergencyRequestsUpdated", refreshProfileData);
    window.addEventListener("storage", refreshProfileData);
    return () => {
      window.removeEventListener(HOPE_POINTS_UPDATED, refreshProfileData);
      window.removeEventListener("emergencyRequestsUpdated", refreshProfileData);
      window.removeEventListener("storage", refreshProfileData);
    };
  }, [currentUser?.id]);

  if (!currentUser) return <div className="flex min-h-screen items-center justify-center bg-[#F7F6F2]"><h2 className="text-xl font-semibold">Please login to view profile.</h2></div>;

  const handleChange = (e) => { setFormData({ ...formData, [e.target.name]: e.target.value }); setMessage(""); };
  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedUser = { ...currentUser, name: formData.name, phone: formData.phone };
    updateCurrentUser(updatedUser);
    setMessage("Profile updated successfully!");
  };

  const joinedDate = currentUser.joinedDate || currentUser.createdAt;
  const emergencyRequests = getEmergencyRequests();
  const createdEmergencyRequests = emergencyRequests.filter(request => String(request.creatorId) === String(currentUser.id));
  const completedEmergencyRequests = createdEmergencyRequests.filter(request => request.status === "completed");
  const helpProvided = emergencyRequests.reduce((total, request) => total + (request.supporters || []).filter(supporter => String(supporter.userId) === String(currentUser.id)).length, 0);
  const averageTrustScore = createdEmergencyRequests.length ? Math.round(createdEmergencyRequests.reduce((total, request) => total + calculateEmergencyTrustScore(request).score, 0) / createdEmergencyRequests.length) : 0;
  const trustLevel = averageTrustScore >= 70 ? "Trusted" : averageTrustScore >= 40 ? "Building Trust" : "New Contributor";
  const hope = getHopePoints(currentUser.id);
  const currentRank = calculateRank(hope.points);
  const donations = currentUser.donations || [];

  return <main className="min-h-screen bg-[#FDF6ED] px-4 py-7 sm:px-6 sm:py-10 lg:px-8"><div className="mx-auto max-w-7xl space-y-7 lg:space-y-8">
    <section className="relative mb-6 overflow-hidden rounded-[2rem] border border-[#DCCFC0]/70 bg-gradient-to-br from-[#2E332B] via-[#3D4939] to-[#66785F] shadow-[0_20px_52px_rgba(46,51,43,0.24)]">
      <div className="relative grid lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center"><div className="p-8 sm:p-10 lg:p-11"><div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:gap-7"><div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full border-4 border-white/35 bg-[#DCCFC0] text-4xl font-bold text-[#2E332B] shadow-[0_12px_28px_rgba(17,22,16,0.32)] ring-4 ring-[#DCCFC0]/30">{currentUser.name.charAt(0).toUpperCase()}</div><div className="min-w-0"><p className="text-[11px] font-bold uppercase tracking-[.22em] text-[#DCCFC0]">HopeBridge account</p><h1 className="mt-2 truncate text-4xl font-bold leading-none tracking-tight text-[#F8F6F1] sm:text-5xl">{currentUser.name}</h1><p className="mt-3 truncate text-sm font-medium text-[#F8F6F1]/85 sm:text-base">{currentUser.email}</p><span className="mt-5 inline-flex items-center rounded-full border border-[#DCCFC0] bg-[#DCCFC0] px-4 py-2 text-xs font-bold uppercase tracking-[.1em] text-[#2E332B] shadow-sm">{currentUser.role || "Donor"}</span></div></div><div className="mt-8 border-t border-white/20 pt-5"><details><summary className="flex cursor-pointer list-none items-center gap-2 text-sm font-bold text-[#DCCFC0] transition hover:text-[#F8F6F1] marker:hidden"><CircleUserRound className="h-4 w-4" />Edit profile details</summary>{message && <div className="mt-4 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-700">{message}</div>}<form onSubmit={handleSubmit} className="mt-5 grid gap-4 md:grid-cols-3"><label className="text-sm font-semibold text-[#F8F6F1]">Full Name<input name="name" value={formData.name} onChange={handleChange} className="mt-2 w-full rounded-xl border border-white/20 bg-white/95 px-4 py-3 font-normal text-[#2E332B] shadow-sm outline-none transition focus:border-[#DCCFC0] focus:ring-2 focus:ring-[#DCCFC0]/60" /></label><label className="text-sm font-semibold text-[#F8F6F1]">Email<input value={formData.email} disabled className="mt-2 w-full rounded-xl border border-white/15 bg-white/75 px-4 py-3 font-normal text-gray-500" /></label><label className="text-sm font-semibold text-[#F8F6F1]">Phone Number<input name="phone" value={formData.phone} onChange={handleChange} className="mt-2 w-full rounded-xl border border-white/20 bg-white/95 px-4 py-3 font-normal text-[#2E332B] shadow-sm outline-none transition focus:border-[#DCCFC0] focus:ring-2 focus:ring-[#DCCFC0]/60" /></label><button className="md:col-span-3 inline-flex min-h-11 items-center justify-center rounded-full bg-[#DCCFC0] px-5 py-3 text-sm font-bold text-[#2E332B] shadow-md transition hover:-translate-y-0.5 hover:bg-white hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#66785F] active:translate-y-0">Save Changes</button></form></details></div></div>
        <div className="grid grid-cols-2 border-t border-white/15 bg-white/5 lg:w-[25.5rem] lg:border-l lg:border-t-0"><BannerMetric icon={Sparkles} label="Hope Points" value={hope.points} /><BannerMetric icon={Medal} label="Current Rank" value={currentRank} /><BannerMetric icon={WalletCards} label="Total Donations" value={donations.length} /><BannerMetric icon={CalendarDays} label="Member Since" value={joinedDate ? new Date(joinedDate).toLocaleDateString() : "N/A"} /></div>
      </div>
    </section>

    <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3 xl:items-start">
      <DashboardCard title="Emergency Activity" eyebrow="Community response" icon={HeartHandshake}><div className="mt-6 space-y-3"><ActivityMetric icon={ShieldCheck} label="Registered Requests" value={createdEmergencyRequests.length} detail={`${completedEmergencyRequests.length} completed`} /><ActivityMetric icon={HandHeart} label="Help Provided" value={helpProvided} /><ActivityMetric icon={BadgeCheck} label="Trust Level" value={trustLevel} detail={`${averageTrustScore}% trust score`} /></div></DashboardCard>
      <DashboardCard title="Community Impact" eyebrow="Your contribution" icon={Award}><div className="mt-6 grid grid-cols-2 gap-3"><ImpactMetric label="Total Donations" value={donations.length} /><ImpactMetric label="Volunteer Activity" value={currentUser.volunteerStatus === "Approved" ? "Active" : "Not active"} /><ImpactMetric label="Emergency Support" value={helpProvided} /><ImpactMetric label="Certificates Earned" value={currentUser.certificates?.length || 0} /></div></DashboardCard>
      <div className="md:col-span-2 xl:col-span-1 [&>section]:rounded-[1.75rem] [&>section]:border-[#DDD1E2] [&>section]:shadow-[0_18px_42px_rgba(102,75,114,0.16)] [&>section]:transition [&>section]:duration-300 [&>section:hover]:-translate-y-1 [&>section:hover]:shadow-[0_24px_50px_rgba(102,75,114,0.22)]"><RewardClaimPanel user={currentUser} points={hope.points} /></div>
    </section>

    <section className="grid gap-5 lg:grid-cols-2">
      <DashboardCard title="Recent Donations" eyebrow="Contribution history" icon={WalletCards}>{donations.length ? <div className="mt-6 divide-y divide-[#EEE9E1]">{donations.slice().reverse().slice(0, 5).map(donation => <article key={donation.id} className="flex items-center justify-between gap-4 py-4 first:pt-0 last:pb-0"><div className="min-w-0"><h3 className="truncate text-sm font-bold text-[#2D352A]">{donation.campaign}</h3><p className="mt-1 text-xs text-gray-500">{new Date(donation.date).toLocaleDateString()} · {donation.status}</p></div><p className="shrink-0 text-base font-bold text-[#66745D]">₹{Number(donation.amount).toLocaleString()}</p></article>)}</div> : <EmptyState icon={WalletCards} title="No donations yet" text="Your recent contributions will appear here." />}</DashboardCard>
      <DashboardCard title="Recent Emergency Requests" eyebrow="Response history" icon={HeartHandshake}>{createdEmergencyRequests.length ? <div className="mt-6 divide-y divide-[#EEE9E1]">{createdEmergencyRequests.slice().reverse().slice(0, 5).map(request => <article key={request.id} className="flex items-center justify-between gap-4 py-4 first:pt-0 last:pb-0"><div className="min-w-0"><h3 className="truncate text-sm font-bold text-[#2D352A]">{request.title}</h3><p className="mt-1 text-xs text-gray-500">{request.category} · {request.status}</p></div><p className="shrink-0 text-xs font-semibold text-[#68785F]">{request.createdAt ? new Date(request.createdAt).toLocaleDateString() : ""}</p></article>)}</div> : <EmptyState icon={HeartHandshake} title="No emergency requests" text="Requests you create will appear here." />}{currentUser.activities?.length > 0 && <div className="mt-6 border-t border-[#EEE9E1] pt-5"><p className="text-[11px] font-bold uppercase tracking-[.14em] text-[#79836F]">Recent activity</p><div className="mt-3 space-y-3">{currentUser.activities.map(activity => <div key={activity.id} className="border-l-2 border-[#B8C5AE] pl-3"><p className="text-sm font-semibold text-[#344032]">{activity.title}</p><p className="mt-1 text-xs text-gray-500">{activity.description}</p></div>)}</div></div>}</DashboardCard>
    </section>
  </div></main>;
};

const DashboardCard = ({ title, eyebrow, icon: Icon, children }) => <article className="rounded-3xl border border-[#E9E0D5] bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-[#DCCFC0] hover:shadow-lg sm:p-7"><header className="flex items-start justify-between gap-4"><div><p className="text-[11px] font-bold uppercase tracking-[.16em] text-[#66785F]">{eyebrow}</p><h2 className="mt-2 text-[1.35rem] font-bold tracking-tight text-[#2E332B]">{title}</h2></div><span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#F0E7DB] text-[#66785F] shadow-sm"><Icon className="h-5 w-5" /></span></header>{children}</article>;

const BannerMetric = ({ icon: Icon, label, value }) => <div className="min-h-29 border-b border-r border-white/15 p-4 transition hover:bg-white/5 lg:p-5"><span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#DCCFC0]/15 text-[#DCCFC0]"><Icon className="h-3.5 w-3.5" /></span><p className="mt-3 text-[10px] font-bold uppercase tracking-[.12em] text-[#DCCFC0]">{label}</p><p className="mt-1 break-words text-lg font-bold tracking-tight text-[#F8F6F1]">{value}</p></div>;

const ActivityMetric = ({ icon: Icon, label, value, detail }) => <div className="flex items-center gap-3 rounded-2xl border border-[#E9E0D5] bg-[#F8F6F1] p-4 transition hover:border-[#DCCFC0] hover:shadow-sm"><span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F0E7DB] text-[#66785F]"><Icon className="h-4 w-4" /></span><div className="min-w-0 flex-1"><p className="text-xs font-semibold text-[#52594E]">{label}</p>{detail && <p className="mt-0.5 text-[11px] font-medium text-gray-500">{detail}</p>}</div><p className="shrink-0 text-2xl font-bold tracking-tight text-[#66785F]">{value}</p></div>;

const ImpactMetric = ({ label, value }) => <div className="min-h-29 rounded-2xl border border-[#E9E0D5] bg-[#F8F6F1] p-4 transition hover:border-[#DCCFC0] hover:shadow-sm"><p className="text-[10px] font-bold uppercase tracking-[.11em] leading-4 text-[#66785F]">{label}</p><p className="mt-3 break-words text-xl font-bold tracking-tight text-[#2E332B]">{value}</p><div className="mt-3 h-1.5 overflow-hidden rounded-full bg-[#DCCFC0]"><span className="block h-full w-3/5 rounded-full bg-[#66785F] transition-all duration-500" /></div></div>;

const EmptyState = ({ icon: Icon, title, text }) => <div className="mt-6 flex flex-col items-center rounded-2xl border border-dashed border-[#D9D3C8] bg-[#FCFBF9] px-5 py-8 text-center"><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EEF2EA] text-[#748269]"><Icon className="h-5 w-5" /></span><h3 className="mt-3 text-sm font-bold text-[#364034]">{title}</h3><p className="mt-1 max-w-xs text-xs leading-5 text-gray-500">{text}</p></div>;

export default Profile;
