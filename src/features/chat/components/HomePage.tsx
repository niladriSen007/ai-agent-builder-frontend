import { useState } from "react";
import { useNavigate } from "react-router-dom";
import GettingStartedCards from "./GettingStartedCards";
import PromptComposer from "./PromptComposer";
import Sidebar from "./Sidebar";
import TopBar from "./TopBar";
import WelcomeHero from "./WelcomeHero";
import "./home.css";

const HomePage = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("AI Chat");
  const [isLight, setIsLight] = useState(false);

  const handleNewChat = () => {
    setActiveSection("AI Chat");
    setSidebarOpen(false);
  };

  return (
    <div className={`assistant-shell${isLight ? " light-theme" : ""}`}>
      <Sidebar
        activeSection={activeSection}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onNewChat={handleNewChat}
        onSelectSection={(section) => {
          setActiveSection(section);
          setSidebarOpen(false);
        }}
      />
      <main className="home-main">
        <TopBar
          isLight={isLight}
          onToggleSidebar={() => setSidebarOpen(true)}
          onToggleTheme={() => setIsLight((current) => !current)}
        />
        <div className="home-content">
          <WelcomeHero />
          <div className="home-content-inner">
            <PromptComposer
              onSubmit={async (prompt) => {
                navigate("/chat", { state: { initialPrompt: prompt } });
              }}
            />
            <GettingStartedCards />
          </div>
        </div>
      </main>
    </div>
  );
};

export default HomePage;
