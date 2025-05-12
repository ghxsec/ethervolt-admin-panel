
import React from "react";
import { cn } from "@/lib/utils";
import { Activity, TrendingUp, TrendingDown } from "lucide-react";

type MetricCardProps = {
  title: string;
  value: string | number;
  change?: number;
  icon?: React.ReactNode;
  loading?: boolean;
  className?: string;
};

export function MetricCard({
  title,
  value,
  change,
  icon,
  loading = false,
  className,
}: MetricCardProps) {
  const isPositive = change && change > 0;
  const isNegative = change && change < 0;

  return (
    <div className={cn(
      "glass-card p-6 rounded-2xl relative overflow-hidden transition-default",
      className
    )}>
      {/* Gradient decoration */}
      <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-web3-accent/20 blur-2xl"></div>
      
      {loading ? (
        <div className="space-y-3">
          <div className="h-5 w-20 bg-white/10 rounded animate-pulse"></div>
          <div className="h-8 w-28 bg-white/10 rounded animate-pulse"></div>
          <div className="h-5 w-24 bg-white/10 rounded animate-pulse"></div>
        </div>
      ) : (
        <>
          <div className="flex items-center justify-between">
            <div className="text-web3-text-muted text-sm font-medium">{title}</div>
            {icon || (
              <div className="h-9 w-9 rounded-lg bg-web3-accent/10 flex items-center justify-center text-web3-accent">
                <Activity size={18} />
              </div>
            )}
          </div>
          
          <div className="mt-4 text-2xl font-bold">{value}</div>
          
          {change !== undefined && (
            <div className="mt-2 flex items-center">
              {isPositive && (
                <>
                  <TrendingUp size={16} className="text-web3-success mr-1" />
                  <span className="text-web3-success text-sm">
                    +{change}%
                  </span>
                </>
              )}
              {isNegative && (
                <>
                  <TrendingDown size={16} className="text-web3-error mr-1" />
                  <span className="text-web3-error text-sm">
                    {change}%
                  </span>
                </>
              )}
              {!isPositive && !isNegative && (
                <span className="text-web3-text-muted text-sm">
                  {change}%
                </span>
              )}
              <span className="text-web3-text-muted text-sm ml-1">vs last period</span>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default MetricCard;
