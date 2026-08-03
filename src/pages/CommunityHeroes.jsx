import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Award, Heart, Medal, Sparkles, Users } from "lucide-react";

import HopeBadge from "../components/HopeBadge";
import { getUsers } from "../utils/auth";
import { getEmergencyRequests } from "../utils/emergencyStorage";
import { calculateRank, getHopePoints, HOPE_POINTS_UPDATED } from "../utils/hopePoints";

export default function CommunityHeroes() {
  const [heroes, setHeroes] = useState([]);

  const loadHeroes = () => {
    const emergencyRequests = getEmergencyRequests();

    setHeroes(getUsers()
      .filter((user) => user.role !== "admin")
      .map((user) => {
        const hope = getHopePoints(user.id);
        const emergencyHelp = emergencyRequests.reduce(
          (total, request) => total + (request.supporters || []).filter(
            (supporter) => String(supporter.userId) === String(user.id)
          ).length,
          0
        );

        return {
          ...user,
          points: hope.points,
          rank: calculateRank(hope.points),
          emergencyHelp,
          donations: user.donations?.length || 0,
        };
      })
      .sort((first, second) => second.points - first.points));
  };

  useEffect(() => {
    loadHeroes();
    window.addEventListener(HOPE_POINTS_UPDATED, loadHeroes);
    window.addEventListener("emergencyRequestsUpdated", loadHeroes);
    window.addEventListener("storage", loadHeroes);
    return () => {
      window.removeEventListener(HOPE_POINTS_UPDATED, loadHeroes);
      window.removeEventListener("emergencyRequestsUpdated", loadHeroes);
      window.removeEventListener("storage", loadHeroes);
    };
  }, []);

  return (
    <main className="min-h-screen bg-[#FDF6ED] px-6 py-12">
      <section className="mx-auto max-w-6xl overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#2E332B] via-[#52604B] to-[#7A866E] px-6 py-14 text-center text-white shadow-xl md:px-12">
        <Sparkles className="mx-auto h-10 w-10 text-[#DCCFC0]" />
        <p className="mt-4 text-sm font-bold uppercase tracking-[0.2em] text-[#DCCFC0]">Hope Points Community</p>
        <h1 className="mt-3 text-4xl font-bold md:text-5xl">Community Heroes</h1>
        <p className="mx-auto mt-4 max-w-2xl text-white/80">Celebrating people who turn compassion into meaningful community action.</p>
      </section>

      <section className="mx-auto mt-10 max-w-6xl">
        {heroes.length === 0 ? (
          <div className="rounded-3xl bg-white p-12 text-center shadow-sm"><Users className="mx-auto h-12 w-12 text-[#66785F]" /><h2 className="mt-4 text-2xl font-bold text-[#2E332B]">Community heroes are on their way</h2><p className="mt-2 text-gray-600">Complete a positive action to begin earning Hope Points.</p></div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {heroes.map((hero, index) => (
              <motion.article key={hero.id} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25, delay: index * 0.04 }} className="rounded-3xl border border-white/80 bg-white/75 p-6 shadow-lg backdrop-blur-sm">
                <div className="flex items-start justify-between gap-4"><span className={`flex h-10 w-10 items-center justify-center rounded-full font-bold ${index < 3 ? "bg-[#DCCFC0] text-[#2E332B]" : "bg-[#F3F6EF] text-[#66785F]"}`}>{index < 3 ? <Medal className="h-5 w-5" /> : index + 1}</span><HopeBadge points={hero.points} compact /></div>
                <div className="mt-6 flex items-center gap-4"><div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-2xl bg-[#7A866E] text-xl font-bold text-white">{hero.profileImage ? <img src={hero.profileImage} alt="" className="h-full w-full object-cover" /> : hero.name?.charAt(0).toUpperCase()}</div><div><h2 className="text-xl font-bold text-[#2E332B]">{hero.name}</h2><p className="mt-1 text-sm text-gray-500">{hero.rank}</p></div></div>
                <p className="mt-6 text-3xl font-bold text-[#66785F]">{hero.points} <span className="text-base font-medium text-gray-500">Points</span></p>
                <div className="mt-5 grid grid-cols-2 gap-3 text-sm"><div className="rounded-xl bg-[#F8F6F1] p-3"><Heart className="h-4 w-4 text-[#66785F]" /><p className="mt-2 font-semibold text-[#2E332B]">{hero.emergencyHelp}</p><p className="text-xs text-gray-500">Emergency help</p></div><div className="rounded-xl bg-[#F8F6F1] p-3"><Award className="h-4 w-4 text-[#66785F]" /><p className="mt-2 font-semibold text-[#2E332B]">{hero.donations}</p><p className="text-xs text-gray-500">Donations</p></div></div>
              </motion.article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
