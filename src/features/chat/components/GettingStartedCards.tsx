import { ArrowRight, Bot, Code2, Download, Sparkles } from "lucide-react";
import { motion } from "motion/react";

const cards = [
  {
    title: "Launch your AI assistant",
    description: "Design an AI agent with custom skills and goals—tailored to your workflow and users.",
    icon: Bot,
    tone: "sky",
    href: "#launch-assistant",
  },
  {
    title: "Fine-tune a model",
    description: "Create and deploy a fine-tuned model from your own data.",
    icon: Sparkles,
    tone: "cyan",
    href: "#fine-tune",
  },
  {
    title: "API requests",
    description: "Make your first Chat completion API requests.",
    icon: Code2,
    tone: "blue",
    href: "#api-requests",
  },
  {
    title: "Download & self-deploy models",
    description: "Explore our market-leading open models.",
    icon: Download,
    tone: "amber",
    href: "#self-deploy",
  },
];

const GettingStartedCards = () => (
  <section aria-labelledby="getting-started-heading" className="getting-started">
    <div className="getting-started-heading">
      <h2 id="getting-started-heading">Get started with an example below</h2>
      <span>Explore what you can do</span>
    </div>
    <div className="starter-grid">
      {cards.map(({ title, description, icon: Icon, tone, href }, index) => (
        <motion.a
          animate={{ opacity: 1, y: 0 }}
          className="starter-card"
          href={href}
          initial={{ opacity: 0, y: 14 }}
          key={title}
          transition={{ delay: 0.12 + index * 0.07, duration: 0.35 }}
          whileHover={{ y: -3, borderColor: "rgba(96, 165, 250, 0.36)" }}
        >
          <div className="starter-card-title">
            <span className={`starter-icon ${tone}`}>
              <Icon size={16} />
            </span>
            <h3>{title}</h3>
          </div>
          <p>{description}</p>
          <span className="starter-card-footer">
            Learn more <ArrowRight size={14} />
          </span>
        </motion.a>
      ))}
    </div>
  </section>
);

export default GettingStartedCards;
