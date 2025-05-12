
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to the dashboard page when accessing the root URL
    navigate("/dashboard");
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-web3-background text-web3-text">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Loading Dashboard...</h1>
        <div className="h-8 w-8 mx-auto rounded-full border-4 border-web3-accent/30 border-t-web3-accent animate-spin"></div>
      </div>
    </div>
  );
};

export default Index;
