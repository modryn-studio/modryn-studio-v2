import Navbar from "@/components/navbar";
import Hero from "@/components/hero";
import ToolsGrid from "@/components/tools-grid";
import BuildLog from "@/components/build-log";
import EmailSignup from "@/components/email-signup";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <div className="noise-overlay min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        <Hero />
        <ToolsGrid />
        <BuildLog />
        <EmailSignup />
      </main>
      <Footer />
    </div>
  );
}
