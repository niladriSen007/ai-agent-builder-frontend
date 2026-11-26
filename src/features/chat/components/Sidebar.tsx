import {
  BookOpen,
  ChevronDown,
  CircleHelp,
  MessageCircle,
  PanelLeftClose,
  Plus,
  Search,
  Sparkles,
  WandSparkles,
  X,
} from "lucide-react";
import BrandMark from "./BrandMark";
import { Button } from "@/components/ui/button";

type SidebarProps = {
  isOpen: boolean;
  activeSection: string;
  onClose: () => void;
  onNewChat: () => void;
  onSelectSection: (section: string) => void;
};

const recentConversations = [
  "Design a retro-themed dashboard",
  "Create an 80s-inspired cityscape",
  "Generate a retro digital watch",
  "Illustrate a funky 70s living room",
  "Render a retro computer UI with pixel art",
];

const olderConversations = [
  "Retro style image generation with neon",
  "Text for a business solution for a new app",
  "Exporting files from the database",
];

const Sidebar = ({
  isOpen,
  activeSection,
  onClose,
  onNewChat,
  onSelectSection,
}: SidebarProps) => (
  <>
    <Button
      aria-label="Close navigation"
      className={`sidebar-backdrop${isOpen ? " is-visible" : ""}`}
      onClick={onClose}
      tabIndex={isOpen ? 0 : -1}
      type="button"
    />
    <aside className={`home-sidebar${isOpen ? " is-open" : ""}`}>
      <div className="sidebar-brand">
        <div className="brand-lockup">
          <span className="brand-icon">
            <BrandMark />
          </span>
          <span>WhispAI</span>
        </div>
        <div className="sidebar-actions">
          <Button
            aria-label="Search conversations"
            className="icon-button"
            type="button"
          >
            <Search size={17} />
          </Button>
          <Button
            aria-label="Close sidebar"
            className="icon-button sidebar-close"
            onClick={onClose}
            type="button"
          >
            <X size={17} />
          </Button>
        </div>
      </div>

      <Button className="new-chat-button" onClick={onNewChat} type="button">
        <Plus size={17} />
        <span>New Chat</span>
      </Button>

      <div className="sidebar-scroll">
        <div className="sidebar-section conversation-section">
          <p className="sidebar-label">Today</p>
          <div className="pl-4">
            {recentConversations.map((conversation) => (
              <Button
                className="conversation-link pt-2"
                key={conversation}
                onClick={() => onSelectSection(conversation)}
                title={conversation}
                type="button"
              >
                {conversation}
              </Button>
            ))}
          </div>
        </div>

        <div className="sidebar-section conversation-section">
          <p className="sidebar-label">Yesterday</p>
          <div className="pl-4">
            {olderConversations.map((conversation) => (
              <button
                className="conversation-link"
                key={conversation}
                onClick={() => onSelectSection(conversation)}
                title={conversation}
                type="button"
              >
                {conversation}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="sidebar-upgrade">
        <div className="upgrade-avatars" aria-hidden="true">
          <span className="mini-avatar avatar-one">A</span>
          <span className="mini-avatar avatar-two">J</span>
          <span className="mini-avatar avatar-three">M</span>
        </div>
        <h2>Upgrade to Pro</h2>
        <p>
          Unlock more power
          <br />
          and features
        </p>
        <button className="upgrade-button" type="button">
          <Sparkles size={15} fill="currentColor" />
          Upgrade
        </button>
      </div>

      <div className="sidebar-footer">
        <button className="sidebar-footer-link" type="button">
          <CircleHelp size={15} />
          Help center
        </button>
        <button
          aria-label="More navigation options"
          className="icon-button"
          type="button"
        >
          <ChevronDown size={16} />
        </button>
        <PanelLeftClose className="sidebar-footer-mark" size={16} />
        <WandSparkles className="sidebar-footer-spark" size={15} />
      </div>
    </aside>
  </>
);

export default Sidebar;
