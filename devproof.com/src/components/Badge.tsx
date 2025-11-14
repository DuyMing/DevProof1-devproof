import { cn } from "@/lib/utils";

interface BadgeProps {
  tier: "active" | "contributor" | "builder" | "core";
  className?: string;
}

const tierConfig = {
  active: {
    icon: "🟢",
    label: "Active",
    bgClass: "bg-green-500/10",
    textClass: "text-green-400",
    borderClass: "border-green-500/20",
  },
  contributor: {
    icon: "🔵",
    label: "Contributor",
    bgClass: "bg-blue-500/10",
    textClass: "text-blue-400",
    borderClass: "border-blue-500/20",
  },
  builder: {
    icon: "🟣",
    label: "Builder",
    bgClass: "bg-purple-500/10",
    textClass: "text-purple-400",
    borderClass: "border-purple-500/20",
  },
  core: {
    icon: "💎",
    label: "Core Team",
    bgClass: "bg-primary/10",
    textClass: "text-primary",
    borderClass: "border-primary/20",
  },
};

export const Badge = ({ tier, className }: BadgeProps) => {
  const config = tierConfig[tier];
  
  return (
    <div
      className={cn(
        "inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-medium transition-all",
        config.bgClass,
        config.textClass,
        config.borderClass,
        className
      )}
    >
      <span className="text-sm">{config.icon}</span>
      <span>{config.label}</span>
    </div>
  );
};
