
import { cn } from "@/lib/utils";
import { Network, Activity } from "lucide-react";

type NetworkStatusProps = {
  className?: string;
};

type NetworkInfo = {
  name: string;
  status: "operational" | "degraded" | "outage";
  latency: string;
  blockHeight: number;
  gasPrice: string;
  lastUpdated: string;
};

const networks: NetworkInfo[] = [
  {
    name: "Ethereum",
    status: "operational",
    latency: "120ms",
    blockHeight: 17345872,
    gasPrice: "25 gwei",
    lastUpdated: "10s ago",
  },
  {
    name: "Polygon",
    status: "operational",
    latency: "85ms",
    blockHeight: 43789201,
    gasPrice: "32 gwei",
    lastUpdated: "15s ago",
  },
  {
    name: "Arbitrum",
    status: "degraded",
    latency: "210ms",
    blockHeight: 9876543,
    gasPrice: "0.1 gwei",
    lastUpdated: "30s ago",
  },
  {
    name: "Optimism",
    status: "operational",
    latency: "140ms",
    blockHeight: 12345678,
    gasPrice: "0.001 gwei",
    lastUpdated: "25s ago",
  },
];

export function NetworkStatus({ className }: NetworkStatusProps) {
  const getStatusColor = (status: NetworkInfo["status"]) => {
    switch (status) {
      case "operational":
        return "bg-web3-success";
      case "degraded":
        return "bg-web3-warning";
      case "outage":
        return "bg-web3-error";
      default:
        return "";
    }
  };

  const getStatusText = (status: NetworkInfo["status"]) => {
    switch (status) {
      case "operational":
        return "Operational";
      case "degraded":
        return "Degraded";
      case "outage":
        return "Outage";
      default:
        return "";
    }
  };

  return (
    <div className={cn(
      "glass-card rounded-2xl",
      className
    )}>
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Network size={18} className="text-web3-accent" />
            <h3 className="text-base font-medium">Network Status</h3>
          </div>
          <span className="text-xs text-web3-text-muted">Last updated: Just now</span>
        </div>
      </div>
      
      <div className="p-4">
        <div className="space-y-2">
          {networks.map((network) => (
            <div key={network.name} className="flex items-center justify-between p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-default">
              <div className="flex items-center gap-3">
                <div className={cn(
                  "h-2.5 w-2.5 rounded-full",
                  getStatusColor(network.status)
                )}></div>
                <span className="font-medium">{network.name}</span>
              </div>
              
              <div className="flex items-center gap-6">
                <div className="hidden sm:block">
                  <div className="text-xs text-web3-text-muted">Status</div>
                  <div className="text-sm">{getStatusText(network.status)}</div>
                </div>
                <div className="hidden md:block">
                  <div className="text-xs text-web3-text-muted">Latency</div>
                  <div className="text-sm">{network.latency}</div>
                </div>
                <div className="hidden lg:block">
                  <div className="text-xs text-web3-text-muted">Block</div>
                  <div className="text-sm">#{network.blockHeight}</div>
                </div>
                <div>
                  <div className="text-xs text-web3-text-muted">Gas</div>
                  <div className="text-sm">{network.gasPrice}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-4">
          <div className="flex items-center justify-between p-4 rounded-lg glass-card">
            <div className="flex items-center gap-2">
              <Activity size={18} className="text-web3-success" />
              <span className="text-sm">All systems operational</span>
            </div>
            <button className="text-xs text-web3-accent hover:text-web3-accent-hover transition-colors">
              View Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NetworkStatus;
