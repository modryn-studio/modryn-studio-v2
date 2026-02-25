import "@/App.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ToolsGrid from "@/components/ToolsGrid";
import BuildLog from "@/components/BuildLog";
import EmailSignup from "@/components/EmailSignup";
import Footer from "@/components/Footer";

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="modryn-theme">
      <div className="min-h-screen bg-background text-foreground" data-testid="app-root">
        <Navbar />
        <main>
          <Hero />
          <ToolsGrid />
          <BuildLog />
          <EmailSignup />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
