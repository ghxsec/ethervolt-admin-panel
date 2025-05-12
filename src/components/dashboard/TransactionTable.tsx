
import { useState } from "react";
import { cn } from "@/lib/utils";
import { ChevronDown, Search, Filter, ArrowUpRight, ArrowDownRight, RefreshCw } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

type Transaction = {
  id: string;
  type: "send" | "receive" | "swap";
  amount: string;
  token: string;
  address: string;
  time: string;
  status: "completed" | "pending" | "failed";
};

const mockTransactions: Transaction[] = [
  {
    id: "0x1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t",
    type: "receive",
    amount: "+0.45 ETH",
    token: "ETH",
    address: "0x1a2...5t6u",
    time: "10 minutes ago",
    status: "completed",
  },
  {
    id: "0x2a3b4c5d6e7f8g9h0i1j2k3l4m5n6o7p8q9r0s1t",
    type: "send",
    amount: "-1.20 ETH",
    token: "ETH",
    address: "0x3c4...7u8v",
    time: "2 hours ago",
    status: "completed",
  },
  {
    id: "0x3a4b5c6d7e8f9g0h1i2j3k4l5m6n7o8p9q0r1s2t",
    type: "swap",
    amount: "50 USDT → 0.025 ETH",
    token: "USDT/ETH",
    address: "Uniswap V3",
    time: "5 hours ago",
    status: "completed",
  },
  {
    id: "0x4a5b6c7d8e9f0g1h2i3j4k5l6m7n8o9p0q1r2s3t",
    type: "send",
    amount: "-0.5 BNB",
    token: "BNB",
    address: "0x7d8...2f3g",
    time: "Yesterday",
    status: "failed",
  },
  {
    id: "0x5a6b7c8d9e0f1g2h3i4j5k6l7m8n9o0p1q2r3s4t",
    type: "receive",
    amount: "+100 USDT",
    token: "USDT",
    address: "0x9f0...4g5h",
    time: "Yesterday",
    status: "completed",
  },
  {
    id: "0x6a7b8c9d0e1f2g3h4i5j6k7l8m9n0o1p2q3r4s5t",
    type: "send",
    amount: "-10 MATIC",
    token: "MATIC",
    address: "0x1g2...6j7k",
    time: "2 days ago",
    status: "pending",
  },
];

type TransactionTableProps = {
  loading?: boolean;
  className?: string;
};

export function TransactionTable({
  loading = false,
  className,
}: TransactionTableProps) {
  const [transactions, setTransactions] = useState<Transaction[]>(mockTransactions);
  const [searchValue, setSearchValue] = useState("");
  const [filterValue, setFilterValue] = useState<"all" | "send" | "receive" | "swap">("all");
  
  const filteredTransactions = transactions.filter((tx) => {
    let matchesSearch = true;
    let matchesFilter = true;
    
    if (searchValue) {
      matchesSearch =
        tx.id.toLowerCase().includes(searchValue.toLowerCase()) ||
        tx.address.toLowerCase().includes(searchValue.toLowerCase()) ||
        tx.amount.toLowerCase().includes(searchValue.toLowerCase());
    }
    
    if (filterValue !== "all") {
      matchesFilter = tx.type === filterValue;
    }
    
    return matchesSearch && matchesFilter;
  });
  
  const getStatusColor = (status: Transaction["status"]) => {
    switch (status) {
      case "completed":
        return "text-web3-success";
      case "pending":
        return "text-web3-warning";
      case "failed":
        return "text-web3-error";
      default:
        return "";
    }
  };

  return (
    <div className={cn("glass-card rounded-2xl overflow-hidden", className)}>
      {/* Header */}
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-medium">Recent Transactions</h3>
          <button className="flex items-center gap-1 px-3 py-1.5 text-sm rounded-md bg-white/5 border border-white/10 hover:bg-white/10 transition-default">
            <RefreshCw size={14} className="mr-1" />
            Refresh
          </button>
        </div>
        
        {/* Filters */}
        <div className="mt-4 flex items-center gap-4">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3">
              <Search size={16} className="text-web3-text-muted" />
            </div>
            <input
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search transactions..."
              className="w-full pl-10 pr-4 py-2 rounded-md bg-white/5 border border-white/10 focus:outline-none focus:border-web3-accent text-web3-text placeholder:text-web3-text-muted transition-default text-sm"
            />
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-1 px-3 py-2 text-sm rounded-md bg-white/5 border border-white/10 hover:bg-white/10 transition-default">
                <Filter size={14} className="mr-1" />
                {filterValue === "all" && "All Types"}
                {filterValue === "send" && "Sends"}
                {filterValue === "receive" && "Receives"}
                {filterValue === "swap" && "Swaps"}
                <ChevronDown size={14} className="ml-1" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-web3-card border-white/10">
              <DropdownMenuItem 
                onClick={() => setFilterValue("all")} 
                className={`hover:bg-white/5 cursor-pointer ${filterValue === "all" ? "bg-white/5" : ""}`}
              >
                All Types
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => setFilterValue("send")} 
                className={`hover:bg-white/5 cursor-pointer ${filterValue === "send" ? "bg-white/5" : ""}`}
              >
                Sends
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => setFilterValue("receive")} 
                className={`hover:bg-white/5 cursor-pointer ${filterValue === "receive" ? "bg-white/5" : ""}`}
              >
                Receives
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => setFilterValue("swap")} 
                className={`hover:bg-white/5 cursor-pointer ${filterValue === "swap" ? "bg-white/5" : ""}`}
              >
                Swaps
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      
      {/* Table */}
      {loading ? (
        <div className="flex items-center justify-center py-16">
          <div className="animate-pulse-soft">
            <div className="h-8 w-8 rounded-full border-4 border-web3-accent/30 border-t-web3-accent animate-spin"></div>
          </div>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-white/10">
                <TableHead className="text-web3-text-muted w-[100px]">Type</TableHead>
                <TableHead className="text-web3-text-muted">Amount</TableHead>
                <TableHead className="text-web3-text-muted">Address</TableHead>
                <TableHead className="text-web3-text-muted">Time</TableHead>
                <TableHead className="text-web3-text-muted text-right">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTransactions.length > 0 ? (
                filteredTransactions.map((tx) => (
                  <TableRow key={tx.id} className="border-white/10 hover:bg-white/5">
                    <TableCell>
                      <div className="flex items-center">
                        <div className={cn(
                          "h-8 w-8 rounded-full flex items-center justify-center",
                          tx.type === "send" ? "bg-web3-error/10" : 
                          tx.type === "receive" ? "bg-web3-success/10" :
                          "bg-web3-accent/10"
                        )}>
                          {tx.type === "send" && <ArrowUpRight size={15} className="text-web3-error" />}
                          {tx.type === "receive" && <ArrowDownRight size={15} className="text-web3-success" />}
                          {tx.type === "swap" && <RefreshCw size={15} className="text-web3-accent" />}
                        </div>
                        <span className="ml-2 capitalize">
                          {tx.type}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">
                      {tx.amount}
                    </TableCell>
                    <TableCell className="text-web3-text-muted">
                      {tx.address}
                    </TableCell>
                    <TableCell className="text-web3-text-muted">
                      {tx.time}
                    </TableCell>
                    <TableCell className={cn("text-right", getStatusColor(tx.status))}>
                      {tx.status === "completed" && "Completed"}
                      {tx.status === "pending" && "Pending"}
                      {tx.status === "failed" && "Failed"}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-10 text-web3-text-muted">
                    No transactions found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}

export default TransactionTable;
