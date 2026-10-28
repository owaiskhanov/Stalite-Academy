import { Megaphone, BarChart3, Code2 } from "lucide-react";

export const curriculum = {
  basics: [
    {
      name: "Social Media Marketing",
      icon: Megaphone,
      topics: [
        "Video marketing and YouTube optimisation",
        "Mobile marketing and SMS marketing",
        "Social media optimisation: profiles, content calendar, engagement, analytics",
        "Facebook marketing",
        "Instagram marketing: profile, content strategy, influencers, paid ads",
        "LinkedIn marketing",
        "X (Twitter) marketing",
        "Email marketing",
        "Affiliate marketing",
        "Online reputation management",
        "Freelancing, agency pricing, and certification prep",
      ],
    },
    {
      name: "Performance Marketing and Search",
      icon: BarChart3,
      topics: [
        "Google Business Profile: setup, optimisation, citations, posts, reviews",
        "Why running ads will not be taken over by AI anytime soon",
        {
          title: "Meta Ads",
          subtopics: [
            "Account creation",
            "Connecting WhatsApp and Instagram",
            "Types of ads",
            "Campaign objectives and audience basics",
            "Budgets and scheduling",
            "Creating campaigns",
            "Understanding basic campaign metrics",
          ],
        },
        {
          title: "Google Ads",
          subtopics: [
            "Account creation",
            "Google Ads campaign types",
            "Campaign goals and keyword basics",
            "Budgets and bidding fundamentals",
            "Creating campaigns and writing ad copy",
            "Understanding basic campaign metrics",
          ],
        },
        {
          title: "SEO/AISO",
          subtopics: [
            "What SEO is and how it pulls data",
            "Why SEO matters in 2026 and beyond",
            "Keyword research and search intent",
            "On-page SEO: titles, descriptions and content",
            "Introduction to AISO and AI-powered search",
            "Creating helpful content for people and search engines",
            "Measuring search visibility and performance",
          ],
        },
      ],
    },
    {
      name: "AI Powered Website and Web App Development",
      icon: Code2,
      topics: [
        {
          title: "Website Fundamentals",
          subtopics: [
            "How websites, browsers and hosting work",
            "Domains, web pages and responsive design",
            "Introduction to prompting AI tools",
          ],
        },
        {
          title: "Prompt Engineering for Web Development",
          subtopics: [
            "Writing clear prompts for layouts, features and functionality",
            "Providing context and examples to guide AI tools",
            "Iterating on prompts to improve results",
          ],
        },
        {
          title: "Building Websites with Antigravity or AI Agents",
          subtopics: [
            "Using prompts to build a website with Antigravity or AI agents",
            "Planning pages, layouts and content with AI",
            "Refining design and functionality through follow-up prompts",
            "Reviewing and testing the website across devices",
            "Preparing the website for publishing",
          ],
        },
        {
          title: "Deployment and Hosting",
          subtopics: [
            "Using GitHub to manage and publish website code",
            "Connecting a GitHub repository to Render or Vercel for hosting",
            "Deploying updates and checking the live website",
          ],
        },
        {
          title: "Databases",
          subtopics: [
            "What databases are and how they store information",
            "Connecting a website to a database",
          ],
        },
      ],
    },
  ],
};
