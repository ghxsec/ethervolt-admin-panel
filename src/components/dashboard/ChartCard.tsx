
import { useState } from "react";
import { cn } from "@/lib/utils";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, LineChart, Line } from "recharts";
import { ChevronDown } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const mockData = [
  { name: "Jan", value: 400, value2: 240 },
  { name: "Feb", value: 300, value2: 139 },
  { name: "Mar", value: 500, value2: 380 },
  { name: "Apr", value: 280, value2: 308 },
  { name: "May", value: 590, value2: 430 },
  { name: "Jun", value: 490, value2: 410 },
  { name: "Jul", value: 690, value2: 520 },
];

type ChartType = "area" | "bar" | "line";

type ChartCardProps = {
  title: string;
  subtitle?: string;
  height?: number;
  type?: ChartType;
  data?: any[];
  loading?: boolean;
  className?: string;
};

export function ChartCard({
  title,
  subtitle,
  height = 300,
  type = "area",
  data = mockData,
  loading = false,
  className,
}: ChartCardProps) {
  const [chartType, setChartType] = useState<ChartType>(type);
  const [timeRange, setTimeRange] = useState<string>("7d");
  
  const handleTypeChange = (type: ChartType) => {
    setChartType(type);
  };

  const renderChart = () => {
    switch (chartType) {
      case "area":
        return (
          <AreaChart data={data}>
            <defs>
              <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8A2BE2" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#8A2BE2" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: "#94A3B8" }} />
            <YAxis axisLine={false} tickLine={false} tick={{ fill: "#94A3B8" }} />
            <CartesianGrid vertical={false} stroke="#333" />
            <Tooltip 
              contentStyle={{
                backgroundColor: "#2C2C2C", 
                borderColor: "rgba(255,255,255,0.1)",
                borderRadius: "0.5rem",
                color: "#F8FAFC",
              }}
            />
            <Area type="monotone" dataKey="value" stroke="#8A2BE2" fill="url(#gradient)" />
          </AreaChart>
        );
      case "bar":
        return (
          <BarChart data={data}>
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: "#94A3B8" }} />
            <YAxis axisLine={false} tickLine={false} tick={{ fill: "#94A3B8" }} />
            <CartesianGrid vertical={false} stroke="#333" />
            <Tooltip 
              contentStyle={{
                backgroundColor: "#2C2C2C", 
                borderColor: "rgba(255,255,255,0.1)",
                borderRadius: "0.5rem",
                color: "#F8FAFC",
              }}
            />
            <Bar dataKey="value" fill="#8A2BE2" radius={[4, 4, 0, 0]} />
          </BarChart>
        );
      case "line":
        return (
          <LineChart data={data}>
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: "#94A3B8" }} />
            <YAxis axisLine={false} tickLine={false} tick={{ fill: "#94A3B8" }} />
            <CartesianGrid vertical={false} stroke="#333" />
            <Tooltip 
              contentStyle={{
                backgroundColor: "#2C2C2C", 
                borderColor: "rgba(255,255,255,0.1)",
                borderRadius: "0.5rem",
                color: "#F8FAFC",
              }}
            />
            <Line type="monotone" dataKey="value" stroke="#8A2BE2" strokeWidth={2} dot={{ fill: "#8A2BE2", r: 4 }} />
            <Line type="monotone" dataKey="value2" stroke="#9D4EFF" strokeWidth={2} dot={{ fill: "#9D4EFF", r: 4 }} />
          </LineChart>
        );
      default:
        return null;
    }
  };

  return (
    <div className={cn(
      "glass-card p-6 rounded-2xl relative overflow-hidden",
      className
    )}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-base font-medium">{title}</h3>
          {subtitle && <p className="text-web3-text-muted text-sm">{subtitle}</p>}
        </div>
        <div className="flex items-center gap-2">
          {/* Chart type selector */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-1 px-3 py-1.5 text-sm rounded-md bg-white/5 border border-white/10 hover:bg-white/10 transition-default">
                {chartType === "area" && "Area"}
                {chartType === "bar" && "Bar"}
                {chartType === "line" && "Line"}
                <ChevronDown size={14} />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-web3-card border-white/10">
              <DropdownMenuItem 
                onClick={() => handleTypeChange("area")} 
                className={`hover:bg-white/5 cursor-pointer ${chartType === "area" ? "bg-white/5" : ""}`}
              >
                Area
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => handleTypeChange("bar")} 
                className={`hover:bg-white/5 cursor-pointer ${chartType === "bar" ? "bg-white/5" : ""}`}
              >
                Bar
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => handleTypeChange("line")} 
                className={`hover:bg-white/5 cursor-pointer ${chartType === "line" ? "bg-white/5" : ""}`}
              >
                Line
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          {/* Time range selector */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-1 px-3 py-1.5 text-sm rounded-md bg-white/5 border border-white/10 hover:bg-white/10 transition-default">
                {timeRange} <ChevronDown size={14} />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-web3-card border-white/10">
              <DropdownMenuItem 
                onClick={() => setTimeRange("24h")} 
                className={`hover:bg-white/5 cursor-pointer ${timeRange === "24h" ? "bg-white/5" : ""}`}
              >
                24h
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => setTimeRange("7d")} 
                className={`hover:bg-white/5 cursor-pointer ${timeRange === "7d" ? "bg-white/5" : ""}`}
              >
                7d
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => setTimeRange("30d")} 
                className={`hover:bg-white/5 cursor-pointer ${timeRange === "30d" ? "bg-white/5" : ""}`}
              >
                30d
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => setTimeRange("90d")} 
                className={`hover:bg-white/5 cursor-pointer ${timeRange === "90d" ? "bg-white/5" : ""}`}
              >
                90d
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      
      {loading ? (
        <div className="flex items-center justify-center" style={{ height: `${height}px` }}>
          <div className="animate-pulse-soft">
            <div className="h-8 w-8 rounded-full border-4 border-web3-accent/30 border-t-web3-accent animate-spin"></div>
          </div>
        </div>
      ) : (
        <div className="mx-auto" style={{ height: `${height}px` }}>
          <ResponsiveContainer width="100%" height="100%">
            {renderChart()}
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}

export default ChartCard;
