import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png"

function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#242424] px-6">
      <div className="mb-8">
        <img src={logo} alt="S4YT Admin Logo" className="w-40 h-40" />
      </div>

      <h1 className="text-3xl font-bold mb-4">
        Welcome to S4YT Admin Panel
      </h1>
      <p className="text-white mb-6 text-center max-w-md">
        Manage and oversee all event operations seamlessly.
      </p>

      <Button
        className="bg-[#F9EB02] text-[#242424] px-6 py-3 rounded-2xl font-semibold hover:bg-[#d4c102] transition transform hover:scale-105"
      >
        Get Started
      </Button>
    </div>
  );
}

export default Home;
