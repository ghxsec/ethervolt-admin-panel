
import { cn } from "@/lib/utils";
import { Wallet, Copy, ExternalLink, RefreshCw } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

type WalletCardProps = {
  className?: string;
};

export function WalletCard({ className }: WalletCardProps) {
  const { toast } = useToast();
  const [connected, setConnected] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  const walletAddress = "0xF45c8f4a1aB844d0701469F9b9B183B55849512B";
  const shortenedAddress = `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`;
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(walletAddress);
    toast({
      title: "Address copied",
      description: "Wallet address copied to clipboard",
      duration: 2000,
    });
  };
  
  const connectWallet = () => {
    // Mock implementation
    setConnected(true);
    toast({
      title: "Wallet connected",
      description: "Your wallet has been connected successfully",
      duration: 2000,
    });
  };
  
  const disconnectWallet = () => {
    // Mock implementation
    setConnected(false);
    toast({
      title: "Wallet disconnected",
      description: "Your wallet has been disconnected",
      duration: 2000,
    });
  };
  
  const refreshBalance = () => {
    setIsRefreshing(true);
    
    // Mock delay to simulate refreshing
    setTimeout(() => {
      setIsRefreshing(false);
      toast({
        title: "Balance updated",
        description: "Your wallet balance has been updated",
        duration: 2000,
      });
    }, 1500);
  };

  return (
    <div className={cn(
      "glass-card rounded-2xl overflow-hidden",
      className
    )}>
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-base font-medium">Wallet</h3>
          {connected && (
            <button 
              onClick={refreshBalance}
              className="flex items-center gap-1 p-1.5 rounded-md bg-white/5 hover:bg-white/10 transition-default"
              disabled={isRefreshing}
            >
              <RefreshCw size={16} className={cn(
                "text-web3-text-muted",
                isRefreshing && "animate-spin"
              )} />
            </button>
          )}
        </div>
      </div>
      
      <div className="p-6">
        {connected ? (
          <>
            <div className="flex flex-col items-center justify-center py-3">
              <div className="h-16 w-16 rounded-full glass-card flex items-center justify-center mb-3">
                <Wallet size={32} className="text-web3-accent" />
              </div>
              <div className="text-2xl font-bold mb-2">3.45 ETH</div>
              <div className="text-web3-text-muted text-sm">≈ $6,450.78 USD</div>
            </div>
            
            <div className="mt-6 mb-4">
              <div className="flex items-center justify-between py-2 px-4 bg-white/5 rounded-lg">
                <span className="text-web3-text-muted">{shortenedAddress}</span>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={copyToClipboard}
                    className="p-1.5 rounded-md bg-white/5 hover:bg-white/10 transition-default"
                  >
                    <Copy size={16} className="text-web3-text-muted" />
                  </button>
                  <a 
                    href={`https://etherscan.io/address/${walletAddress}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 rounded-md bg-white/5 hover:bg-white/10 transition-default"
                  >
                    <ExternalLink size={16} className="text-web3-text-muted" />
                  </a>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-3 mt-6">
              <Button 
                variant="outline" 
                className="flex-1 bg-white/5 border-white/10 hover:bg-white/10 text-web3-text"
                onClick={disconnectWallet}
              >
                Disconnect
              </Button>
              <Button 
                variant="default"
                className="flex-1 bg-web3-accent hover:bg-web3-accent-hover"
                onClick={() => {
                  // Mock send function
                  toast({
                    title: "Send initiated",
                    description: "Opening send dialog",
                    duration: 2000,
                  });
                }}
              >
                Send
              </Button>
            </div>
            
            {/* Token list */}
            <div className="mt-6 space-y-2">
              <h4 className="text-sm font-medium mb-3">Assets</h4>
              <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-default cursor-pointer">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                    <span className="font-bold text-blue-400">Ξ</span>
                  </div>
                  <div>
                    <div className="text-sm font-medium">Ethereum</div>
                    <div className="text-xs text-web3-text-muted">ETH</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium">3.45 ETH</div>
                  <div className="text-xs text-web3-text-muted">$6,450.78</div>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-default cursor-pointer">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-green-500/20 flex items-center justify-center">
                    <span className="font-bold text-green-400">$</span>
                  </div>
                  <div>
                    <div className="text-sm font-medium">USD Tether</div>
                    <div className="text-xs text-web3-text-muted">USDT</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium">245.00 USDT</div>
                  <div className="text-xs text-web3-text-muted">$245.00</div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-8">
            <div className="h-20 w-20 rounded-full glass-card flex items-center justify-center mb-6">
              <Wallet size={40} className="text-web3-accent" />
            </div>
            <h3 className="text-lg font-medium mb-2">Connect Your Wallet</h3>
            <p className="text-web3-text-muted text-sm text-center mb-6">
              Connect your wallet to view your assets and perform transactions
            </p>
            <Button 
              onClick={connectWallet}
              className="bg-web3-accent hover:bg-web3-accent-hover w-full"
            >
              Connect Wallet
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default WalletCard;
