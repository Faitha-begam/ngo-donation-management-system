import { Award, Heart } from "lucide-react";

import { calculateRank } from "../utils/hopePoints";

export default function HopeBadge({ points = 0, compact = false }) {
  const rank = calculateRank(points);

  return (
    <div className={`inline-flex items-center gap-2 rounded-full border border-[#DCCFC0] bg-white/80 text-[#2E332B] shadow-sm backdrop-blur-sm ${compact ? "px-3 py-1.5 text-xs" : "px-4 py-2 text-sm"}`}>
      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#F3F6EF] text-[#66785F]"><Award className="h-4 w-4" /></span>
      <span className="font-bold">{rank}</span>
      {!compact && <span className="flex items-center gap-1 text-[#66785F]"><Heart className="h-3.5 w-3.5 fill-current" />{points}</span>}
    </div>
  );
}
