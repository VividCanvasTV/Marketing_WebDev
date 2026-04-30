window.VC_PORTAL_DATA = {
  brand: {
    name: "Vivid Canvas",
    pageTitle: "Portal Dashboard",
    subtitle: "Internal Command Center",
    logo: "assets/logo-vivid.png",
    mantra:
      "Cinematic is our standard. Strategy is our difference. Speed wins the lead. Follow-up wins the deal. Every conversation creates momentum. Every offer gets a focused page. Every idea becomes a draft. Every draft becomes an asset. No problem is someone else's problem - we fix it, flag it, or find the person who can. We are not freelancers; we are a growth engine. Every day, we learn, build, ship, document, and make the machine stronger."
  },
  nav: [
    { id: "dashboard", label: "Dashboard", logo: "VC" },
    { id: "sales", label: "Sales", logo: "SL" },
    { id: "fulfillment", label: "Fulfillment", logo: "FL" },
    { id: "content", label: "Content", logo: "CE" },
    { id: "sops", label: "SOPs", logo: "KB" },
    { id: "tutorials", label: "Tutorials", logo: "TR" },
    { id: "team", label: "Team", logo: "TM" },
    { id: "pricing", label: "Pricing", logo: "$" },
    { id: "drive", label: "Drive HQ", logo: "GD" },
    { id: "reports", label: "Reports", logo: "DR" }
  ],
  quickActions: [
    { label: "Open GHL", logo: "GHL", url: "https://app.gohighlevel.com/" },
    { label: "Open ClickUp", logo: "CU", url: "https://app.clickup.com/" },
    { label: "Open Drive", logo: "GD", url: "https://drive.google.com/" },
    { label: "Open Buffer", logo: "BF", url: "https://buffer.com/" },
    { label: "SOP Library", logo: "SOP", url: "#sops" },
    { label: "Content Tracker", logo: "CT", url: "#content" },
    { label: "Pricing", logo: "$", url: "#pricing" }
  ],
  operatingSystem: [
    { title: "Sales", logo: "SL", body: "Lead response, pipeline movement, proposals, and follow-up.", status: "Revenue", url: "#sales" },
    { title: "Fulfillment", logo: "FL", body: "Client delivery, production, reviews, revisions, and handoff.", status: "Delivery", url: "#fulfillment" },
    { title: "Team", logo: "TM", body: "Ownership, blockers, EOD reports, and growth tracks.", status: "People", url: "#team" },
    { title: "Systems", logo: "SYS", body: "Problems become SOPs, tools, owners, and repeatable standards.", status: "Process", url: "#sops" },
    { title: "Brand", logo: "BR", body: "Proof, offers, pages, content, authority, and trust.", status: "Authority", url: "#content" },
    { title: "Finance", logo: "$", body: "Pricing, scope, invoices, collection, margin, and reinvestment.", status: "Cash", url: "#pricing" },
    { title: "Purpose", logo: "WHY", body: "Build, ship, document, and make the machine stronger every day.", status: "North star", url: "#dashboard" }
  ],
  pulse: [
    { label: "New Leads", value: "18", detail: "+6 since yesterday", status: "hot", logo: "NL" },
    { label: "Hot Deals", value: "7", detail: "$42k in active motion", status: "good", logo: "HD" },
    { label: "Follow-Ups Needed", value: "12", detail: "Reply before noon", status: "warning", logo: "FU" },
    { label: "Projects Moving", value: "9", detail: "On track this week", status: "good", logo: "PM" },
    { label: "Projects Stuck", value: "3", detail: "Waiting on owner/client", status: "danger", logo: "PS" },
    { label: "Content Bank", value: "6 days", detail: "Buffer warning threshold", status: "warning", logo: "CB" },
    { label: "SOPs Added", value: "4", detail: "This week", status: "good", logo: "SO" },
    { label: "Money Collected", value: "$18.4k", detail: "Month-to-date", status: "good", logo: "$" }
  ],
  tomorrowPriorities: [
    "Move every hot sales conversation to a clear next step.",
    "Clear the three stuck project blockers or assign owners.",
    "Build seven more approved posts before Buffer drops below three days."
  ],
  attention: [
    { title: "Speed risk", copy: "Twelve follow-ups need a reply before noon. Open GHL first.", logo: "GHL", status: "danger" },
    { title: "Content bank", copy: "Six scheduled days left. Build the next content batch before current posts run out.", logo: "BF", status: "warning" },
    { title: "Delivery clarity", copy: "Three projects are stalled because owner/client next steps are unclear.", logo: "CU", status: "danger" }
  ],
  loops: {
    sales: ["Lead", "Response", "Conversation", "Next Step", "Proposal", "Close", "Follow-Up"],
    fulfillment: ["Onboard", "Plan", "Shoot", "Edit", "Review", "Revise", "Deliver", "Collect"],
    content: ["Capture", "Organize", "Script", "Record", "Edit", "Review", "Schedule", "Track"],
    team: ["Assign", "Output", "Report", "Feedback", "Improve", "Trust"],
    systems: ["Problem", "SOP", "Tool", "Owner", "Repeat"],
    brand: ["Proof", "Page", "Offer", "Content", "Authority", "Trust"],
    finance: ["Price", "Scope", "Invoice", "Collect", "Margin", "Reinvest"]
  },
  salesCards: [
    { title: "GHL Pipeline", logo: "GHL", body: "Source of truth for leads, stages, automations, and conversation history.", status: "Core tool", url: "https://app.gohighlevel.com/" },
    { title: "Inbound Leads", logo: "IN", body: "Website, calls, forms, referrals, and DMs that need response speed.", status: "Watch" },
    { title: "Outbound Campaigns", logo: "OB", body: "Campaign lists, offers, and daily prospecting momentum.", status: "Active" },
    { title: "Phoenix / Clinic Outreach", logo: "PHX", body: "Premium wellness and clinic route opportunities.", status: "Field" },
    { title: "Thumbtack", logo: "TT", body: "Fast quote response and review-driven service leads.", status: "Monitor", url: "https://www.thumbtack.com/pro" },
    { title: "Yelp", logo: "YP", body: "Local intent, quote requests, and profile visibility.", status: "Monitor", url: "https://biz.yelp.com/" },
    { title: "Google Business", logo: "GB", body: "Calls, map discovery, reviews, and local trust.", status: "Monitor", url: "https://business.google.com/" },
    { title: "Apollo", logo: "AP", body: "List building and outbound enrichment for targeted campaigns.", status: "Prospect", url: "https://app.apollo.io/" },
    { title: "LinkedIn", logo: "LI", body: "Relationship warming, proof drops, and decision-maker context.", status: "Prospect", url: "https://www.linkedin.com/" }
  ],
  fulfillmentCards: [
    { title: "Active Clients", logo: "AC", body: "Current retainers, projects, and service commitments.", status: "Live" },
    { title: "Active Projects", logo: "AP", body: "The project board for tasks, due dates, and owners.", status: "ClickUp", url: "https://app.clickup.com/" },
    { title: "Onboarding", logo: "ON", body: "Kickoff, folder setup, access collection, and first plan.", status: "Start" },
    { title: "Pre-Production", logo: "PP", body: "Creative brief, shot list, scheduling, talent, and locations.", status: "Plan" },
    { title: "Production", logo: "PR", body: "Capture, field notes, backups, and asset intake.", status: "Shoot" },
    { title: "Post-Production", logo: "PO", body: "Edit queue, review links, and quality control.", status: "Edit" },
    { title: "Review / Revision", logo: "RV", body: "Client notes, internal review, and revision scope.", status: "Review" },
    { title: "Delivery", logo: "DL", body: "Final exports, upload locations, and handoff notes.", status: "Ship" },
    { title: "Payment Closeout", logo: "$", body: "Invoice status, revision overages, and collection.", status: "Collect" }
  ],
  contentStats: [
    { label: "Scheduled Posts", value: "22", status: "warning", logo: "SP" },
    { label: "Ready to Schedule", value: "11", status: "good", logo: "RS" },
    { label: "Editing Queue", value: "17", status: "neutral", logo: "EQ" },
    { label: "Idea Pool", value: "49", status: "good", logo: "IP" },
    { label: "Buffer Runs Out", value: "6 days", status: "warning", logo: "BF" }
  ],
  contentCards: [
    { title: "Idea Pool", logo: "IP", body: "Raw hooks, campaign themes, and one-line content drafts.", status: "Capture" },
    { title: "Reference Videos", logo: "RV", body: "Saved examples for motion, tone, shot style, and pacing.", status: "Study" },
    { title: "Screen Recordings", logo: "SR", body: "Proof, walkthroughs, web builds, and process clips.", status: "Asset" },
    { title: "Talking Heads", logo: "TH", body: "Founder POVs, client education, and offer explanations.", status: "Record" },
    { title: "Edit Queue", logo: "EQ", body: "Footage and drafts ready for post-production.", status: "Edit" },
    { title: "Ready for Review", logo: "RR", body: "Drafts needing internal or client approval.", status: "Review" },
    { title: "Approved for Buffer", logo: "BF", body: "Final posts ready for scheduling.", status: "Schedule", url: "https://buffer.com/" },
    { title: "Posted Content", logo: "PC", body: "Published assets and repurpose candidates.", status: "Track" },
    { title: "Performance Notes", logo: "PN", body: "Winners, weak hooks, comments, and next tests.", status: "Learn" }
  ],
  sops: [
    { problem: "Lead response is slow", name: "First Five Minute Follow-Up", category: "Sales SOPs", owner: "Julie", status: "Live", tool: "GHL", logo: "GHL", link: "https://app.gohighlevel.com/" },
    { problem: "New client kickoff is scattered", name: "Client Onboarding Intake", category: "Client Onboarding SOPs", owner: "Charlie", status: "Draft", tool: "Drive", logo: "GD", link: "#drive" },
    { problem: "Shoot prep misses details", name: "Pre-Production Checklist", category: "Pre-Production SOPs", owner: "Paul", status: "Live", tool: "ClickUp", logo: "CU", link: "https://app.clickup.com/" },
    { problem: "Field assets get lost", name: "Production Backup Flow", category: "Production SOPs", owner: "Paul", status: "Live", tool: "Drive", logo: "GD", link: "#drive" },
    { problem: "Edits lack consistent QC", name: "Post-Production Review Pass", category: "Post-Production SOPs", owner: "Paul", status: "Live", tool: "DaVinci", logo: "DV", link: "#tutorials" },
    { problem: "Resolve workflow is inconsistent", name: "DaVinci Project Setup", category: "DaVinci Resolve SOPs", owner: "Paul", status: "Needs update", tool: "DaVinci", logo: "DV", link: "#tutorials" },
    { problem: "Final exports are hard to find", name: "Delivery Folder Handoff", category: "Delivery SOPs", owner: "Julie", status: "Live", tool: "Drive", logo: "GD", link: "#drive" },
    { problem: "Pipeline stages drift", name: "GHL Stage Hygiene", category: "GHL SOPs", owner: "Julie", status: "Live", tool: "GHL", logo: "GHL", link: "https://app.gohighlevel.com/" },
    { problem: "Tasks are not assigned cleanly", name: "ClickUp Owner Rules", category: "ClickUp SOPs", owner: "Charlie", status: "Draft", tool: "ClickUp", logo: "CU", link: "https://app.clickup.com/" },
    { problem: "Files land in random folders", name: "Drive Naming + Folder Rules", category: "Google Drive SOPs", owner: "Julie", status: "Live", tool: "Drive", logo: "GD", link: "#drive" },
    { problem: "Buffer runs low", name: "Content Bank Refill Sprint", category: "Content Engine SOPs", owner: "Tut", status: "Live", tool: "Buffer", logo: "BF", link: "https://buffer.com/" },
    { problem: "Scope is unclear", name: "Invoice + Scope Closeout", category: "Finance + Invoicing SOPs", owner: "Charlie", status: "Draft", tool: "Pricing", logo: "$", link: "#pricing" },
    { problem: "EOD reports lack signal", name: "Daily Report Format", category: "Team Reports SOPs", owner: "Charlie", status: "Live", tool: "Reports", logo: "DR", link: "#reports" },
    { problem: "Team gets blocked", name: "Fix, Flag, or Find Owner", category: "Troubleshooting Cards", owner: "Charlie", status: "Live", tool: "SOP", logo: "KB", link: "#sops" }
  ],
  tutorials: [
    { title: "Color Pipeline Basics", tool: "DaVinci Resolve", teaches: "Clean project setup, nodes, and export discipline.", when: "When footage starts post-production.", savedBy: "Paul", date: "Apr 2026", logo: "DV", link: "#tutorials" },
    { title: "Build Small Internal Tools", tool: "Vibe Coding", teaches: "Turn rough workflow pain into a simple prototype.", when: "When a repeated task needs a faster surface.", savedBy: "Tut", date: "Apr 2026", logo: "AI", link: "#tutorials" },
    { title: "Premium Above-the-Fold Layouts", tool: "Web Design", teaches: "Hero structure, offer clarity, and trust signals.", when: "When every offer needs a focused page.", savedBy: "Charlie", date: "Apr 2026", logo: "WD", link: "#tutorials" },
    { title: "Landing Page Conversion Blocks", tool: "Landing Pages", teaches: "Proof, pain, offer, objections, and CTA rhythm.", when: "When a campaign gets a dedicated page.", savedBy: "Charlie", date: "Apr 2026", logo: "LP", link: "#tutorials" },
    { title: "AI Draft Workflow", tool: "AI Tools", teaches: "Idea to draft to asset without losing brand voice.", when: "When the idea pool needs production speed.", savedBy: "Tut", date: "Apr 2026", logo: "AI", link: "#tutorials" },
    { title: "Follow-Up That Moves Deals", tool: "Sales Training", teaches: "Short replies that earn the next commitment.", when: "When a lead has gone quiet.", savedBy: "Joe", date: "Apr 2026", logo: "SL", link: "#tutorials" },
    { title: "Interview Lighting Map", tool: "Cinematography", teaches: "Fast premium lighting setups for small crews.", when: "When capture has to feel expensive.", savedBy: "Paul", date: "Apr 2026", logo: "CI", link: "#tutorials" },
    { title: "Practical Key + Fill", tool: "Lighting", teaches: "Repeatable lighting choices by room type.", when: "When shooting in clinics, offices, or studios.", savedBy: "Paul", date: "Apr 2026", logo: "LT", link: "#tutorials" },
    { title: "Music Bed Selection", tool: "Audio + Music", teaches: "Tempo, emotion, and premium brand fit.", when: "When a cut feels flat.", savedBy: "Paul", date: "Apr 2026", logo: "AU", link: "#tutorials" },
    { title: "Edit Pacing References", tool: "Editing References", teaches: "Hooks, cuts, rhythm, and visual proof pacing.", when: "When short-form drafts need more punch.", savedBy: "Tut", date: "Apr 2026", logo: "ER", link: "#tutorials" },
    { title: "Logo Motion Starters", tool: "Motion Graphics", teaches: "Simple motion systems for premium IDs.", when: "When assets need branded polish.", savedBy: "Paul", date: "Apr 2026", logo: "MG", link: "#tutorials" },
    { title: "Hooks That Hold Attention", tool: "Ads + Hooks", teaches: "First-line patterns for offers and proof.", when: "When scripting ad or social openers.", savedBy: "Joe", date: "Apr 2026", logo: "AD", link: "#tutorials" }
  ],
  people: [
    { name: "Charlie", role: "Founder / Machine Builder", responsibility: "Build the system, protect standards, and keep the company focused.", priority: "Decide what gets built next and what gets delegated.", blockers: "Too many founder-owned tasks.", report: "#reports", growth: "From engine to architect.", question: "Am I building the machine, or being the engine again?", logo: "CM" },
    { name: "Julie", role: "Operations / Money Movement", responsibility: "Replies, collections, handoffs, folders, and follow-up reliability.", priority: "Clear replies and stuck money before the day spreads out.", blockers: "Missing owner data or unclear client next steps.", report: "#reports", growth: "Sharper operating cadence.", question: "Who needs a reply, and where is the money stuck?", logo: "JL" },
    { name: "Joe", role: "Sales Motion", responsibility: "Advance conversations and keep pipeline energy visible.", priority: "Move one more deal to a next step today.", blockers: "Leads without specific offers or proof.", report: "#reports", growth: "Closer with tighter follow-through.", question: "What deal did we move forward today?", logo: "JO" },
    { name: "Paul", role: "Production / Post", responsibility: "Ship polished work, improve process, and document repeatable methods.", priority: "Finish the highest-value edit and capture the SOP lesson.", blockers: "Unclear revision scope or missing footage.", report: "#reports", growth: "Senior creative operator.", question: "What did I ship, learn, and document today?", logo: "PL" },
    { name: "Tut", role: "Learning / Asset Builder", responsibility: "Convert learning into useful company assets.", priority: "Build one reusable card, draft, or reference while learning.", blockers: "Unclear success criteria.", report: "#reports", growth: "From learning to leverage.", question: "What useful company asset did I build while learning?", logo: "TT" }
  ],
  pricing: [
    {
      group: "Marketing Retainers",
      logo: "MR",
      items: [
        ["Foundation", "$5,000/mo"],
        ["Accelerate", "$10,000/mo"],
        ["Dominate", "$15,000/mo"],
        ["Custom & Enterprise", "Starting at $20,000/mo"]
      ]
    },
    {
      group: "Marketing Video Packages",
      logo: "MV",
      items: [
        ["Essential", "$5,000/mo"],
        ["Signature", "$10,000/mo"],
        ["Prestige", "$15,000/mo"]
      ]
    },
    {
      group: "Video Production",
      logo: "VP",
      items: [
        ["Rapid Shoot", "$899 flat"],
        ["Solo Cinematographer", "$1,500/day"],
        ["Solo DP", "$2,000/day"],
        ["Full Production", "$3,000/day"],
        ["Additional Camera / Operator", "+$1,500/day"],
        ["Associate / BTS Add-On", "+$500/day"]
      ]
    },
    {
      group: "Editing",
      logo: "ED",
      items: [
        ["Standard", "$100/hr"],
        ["Advanced", "$200/hr"],
        ["Signature", "$250/hr"]
      ]
    }
  ],
  pricingRules: [
    "Default: one revision unless signed package says otherwise.",
    "Editing billed hourly in 15-minute increments unless scoped.",
    "If it is not written in the agreement, it is not included."
  ],
  driveFolders: [
    { code: "00", name: "INBOX", detail: "Dump links, ideas, raw notes", logo: "00" },
    { code: "01", name: "CLIENTS", detail: "Client master folders", logo: "01" },
    { code: "02", name: "ACTIVE PROJECTS", detail: "Current delivery work", logo: "02" },
    { code: "03", name: "CONTENT ENGINE", detail: "Ideas, drafts, edits, approved posts", logo: "03" },
    { code: "04", name: "SALES + MARKETING", detail: "Offers, campaigns, proof, outreach", logo: "04" },
    { code: "05", name: "SOPS + KNOWLEDGE BASE", detail: "How the machine works", logo: "05" },
    { code: "06", name: "TUTORIALS + REFERENCES", detail: "Learning library and examples", logo: "06" },
    { code: "07", name: "PAPERWORK + ADMIN", detail: "Contracts, forms, admin docs", logo: "07" },
    { code: "08", name: "BRAND ASSETS", detail: "Logos, type, colors, templates", logo: "08" },
    { code: "09", name: "TEAM TRAINING", detail: "Training tracks and internal lessons", logo: "09" },
    { code: "10", name: "FINANCE + KPI", detail: "Revenue, margin, invoices, scorecards", logo: "10" },
    { code: "99", name: "ARCHIVE", detail: "Completed, old, and cold storage", logo: "99" }
  ],
  reports: [
    { title: "Vivid Daily Control Panel", owner: "Leadership", prompts: ["What needs attention today?", "Where is money stuck?", "What are tomorrow's top three priorities?"], logo: "VC" },
    { title: "Julie EOD Report", owner: "Julie", prompts: ["Who got a reply?", "What money moved?", "What is blocked?"], logo: "JL" },
    { title: "Joe EOD Report", owner: "Joe", prompts: ["What deal moved forward?", "What follow-up is due?", "What proof or offer would help?"], logo: "JO" },
    { title: "Paul EOD Report", owner: "Paul", prompts: ["What shipped?", "What did I learn?", "What did I document?"], logo: "PL" },
    { title: "Tut Daily Check-In", owner: "Tut", prompts: ["What did I learn?", "What asset did I build?", "Where am I blocked?"], logo: "TT" }
  ],
  logos: [
    { name: "Vivid Canvas", type: "image", src: "assets/logo-vivid.png", logo: "VC" },
    { name: "Partel Pharmacy", type: "image", src: "assets/logo-partel.png", logo: "PP" },
    { name: "AMC Theatres", type: "image", src: "assets/logo-amc.png", logo: "AMC" },
    { name: "Arizona Autism", type: "image", src: "assets/logo-arizona.png", logo: "AZ" },
    { name: "Gabby Petito Foundation", type: "image", src: "assets/logo-gabby.png", logo: "GP" },
    { name: "GoHighLevel", type: "mark", logo: "GHL" },
    { name: "ClickUp", type: "mark", logo: "CU" },
    { name: "Google Drive", type: "mark", logo: "GD" },
    { name: "Buffer", type: "mark", logo: "BF" },
    { name: "Apollo", type: "mark", logo: "AP" },
    { name: "LinkedIn", type: "mark", logo: "LI" }
  ]
};
