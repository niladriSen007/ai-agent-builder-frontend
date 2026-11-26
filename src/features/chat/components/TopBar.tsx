import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuthStore } from "@/features/auth/store/auth.store";
import {
  Bot,
  BoxesLinked,
  ChevronDown,
  LogOut,
  Menu,
  Moon,
  Plus,
  Sun,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";

type TopBarProps = {
  isLight: boolean;
  onToggleSidebar: () => void;
  onToggleTheme: () => void;
};

const TopBar = ({ isLight, onToggleSidebar, onToggleTheme }: TopBarProps) => {
  const [model, setModel] = useState<string>();
  const { user } = useAuthStore();
  const { logoutMutationFn } = useLogout();
  const navigate = useNavigate();

  return (
    <header className="home-topbar">
      <div className="topbar-workspace">
        <Button
          aria-label="Open navigation"
          className="icon-button mobile-menu-button"
          onClick={onToggleSidebar}
          type="button"
        >
          <Menu size={19} />
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger
            render={<Button variant="outline" className={"cursor-pointer"} />}
          >
            {model ?? "Select Your Model"} <ChevronDown />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuRadioGroup
              value={model}
              onValueChange={(value) => setModel(value)}
            >
              <DropdownMenuRadioItem value="OpenAI">
                OpenAI
              </DropdownMenuRadioItem>

              <DropdownMenuRadioItem value="Gemini">
                Gemini
              </DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <nav aria-label="Main navigation" className="topbar-links">
        <button
          aria-label={
            isLight ? "Switch to dark theme" : "Switch to light theme"
          }
          className="theme-toggle"
          onClick={onToggleTheme}
          type="button"
        >
          <motion.span
            animate={{ rotate: isLight ? 0 : -35 }}
            transition={{ duration: 0.25 }}
          >
            {isLight ? <Sun size={18} /> : <Moon size={18} />}
          </motion.span>
        </button>
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <img
                src={user?.profilePicture}
                className={"cursor-pointer size-8 rounded-3xl"}
              />
            }
          ></DropdownMenuTrigger>
          <DropdownMenuContent className="w-40 cursor-pointer rounded-xl border border-blue-300/15 bg-gradient-to-b from-[#111827] to-[#08080a] text-white shadow-[0_12px_32px_rgba(0,0,0,0.65)] ring-1 ring-blue-300/10">
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={() => navigate("/agents")}>
                <Bot />
                My Agents
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate("/agents/new")}>
                <Plus />
                Create New Agent
              </DropdownMenuItem>
              <DropdownMenuItem>
                <div className="flex items-center justify-start gap-2">
                  {" "}
                  <BoxesLinked />
                  Integrations
                </div>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator className="bg-blue-200/15" />
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={() => logoutMutationFn()}>
                <LogOut />
                Logout
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </nav>
    </header>
  );
};

export default TopBar;
