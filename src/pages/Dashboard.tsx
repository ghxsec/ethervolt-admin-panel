
import { ChartBar, Wallet, Activity, Network } from "lucide-react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import MetricCard from "@/components/dashboard/MetricCard";
import ChartCard from "@/components/dashboard/ChartCard";
import TransactionTable from "@/components/dashboard/TransactionTable";
import WalletCard from "@/components/dashboard/WalletCard";
import NetworkStatus from "@/components/dashboard/NetworkStatus";

const Dashboard = () => {
  return (
    <DashboardLayout>
      {/* Metrics Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <MetricCard 
          title="Total Value" 
          value="$12,567.89" 
          change={5.7} 
          icon={
            <div className="h-9 w-9 rounded-lg bg-web3-accent/10 flex items-center justify-center text-web3-accent">
              <Wallet size={18} />
            </div>
          }
        />
        <MetricCard 
          title="Daily Volume" 
          value="$3,246.12" 
          change={-2.3} 
          icon={
            <div className="h-9 w-9 rounded-lg bg-web3-accent/10 flex items-center justify-center text-web3-accent">
              <ChartBar size={18} />
            </div>
          }
        />
        <MetricCard 
          title="Active Users" 
          value="12,543" 
          change={12.8} 
          icon={
            <div className="h-9 w-9 rounded-lg bg-web3-accent/10 flex items-center justify-center text-web3-accent">
              <Activity size={18} />
            </div>
          }
        />
        <MetricCard 
          title="Network Health" 
          value="97.5%" 
          change={0.5} 
          icon={
            <div className="h-9 w-9 rounded-lg bg-web3-accent/10 flex items-center justify-center text-web3-accent">
              <Network size={18} />
            </div>
          }
        />
      </section>
      
      {/* Charts Section */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <ChartCard 
          title="Portfolio Value" 
          subtitle="Last 7 days" 
          type="area" 
        />
        <ChartCard 
          title="Transaction History" 
          subtitle="Last 7 days" 
          type="bar" 
        />
      </section>
      
      {/* Main Content */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <TransactionTable />
        </div>
        <div className="lg:col-span-1 space-y-6">
          <WalletCard />
          <NetworkStatus />
        </div>
      </section>
    </DashboardLayout>
  );
};

export default Dashboard;
