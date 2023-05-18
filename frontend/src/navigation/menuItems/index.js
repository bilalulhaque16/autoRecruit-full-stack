import { Copy, Mail, Home, User, Package, FileText } from "react-feather"

export const SideMenuItemsForCompany = [
  {
    id: "dashboard",
    title: "Dashboard",
    icon: <Home size={20} />,
    navLink: "/dashboard"
  },
  {
    id: "applicants",
    title: "Applicants",
    icon: <Package size={20} />,
    navLink: "/applicants"
  },
  {
    id: "posted-jobs",
    title: "Posted Jobs",
    icon: <Mail size={20} />,
    navLink: "/posted-jobs"
  },
  {
    id: "create-job",
    title: "Create Job",
    icon: <FileText size={20} />,
    navLink: "/create-job"
  },
  {
    id: "job-category",
    title: "Job Category",
    icon: <Copy size={20} />,
    navLink: "/job-category"
  },
  {
    
    id: "profile",
    title: "Profile",
    icon: <User size={20} />,
    navLink: "/company-profile"
  },
  {
    
    id: "analytics",
    title: "Analytics",
    icon: <User size={20} />,
    navLink: "/company-profile"
  },
  {
    
    id: "calendar",
    title: "Calendar",
    icon: <User size={20} />,
    navLink: "/company-profile"
  },
  {
    
    id: "integration",
    title: "Integration",
    icon: <User size={20} />,
    navLink: "/company-profile"
  },
  
  {
    
    id: "pricing",
    title: "Pricing",
    icon: <User size={20} />,
    navLink: "/company-profile"
  },
  {
    id: "documentation",
    title: "Documentation",
    icon: <User size={20} />,
    navLink: "/company-profile"
  }

  
]

export const SideMenuItemsForUser = [
  {
    id: "home",
    title: "Home",
    icon: <Home size={20} />,
    navLink: "/home"
  },

  {
    id: "applications",
    title: "Applications",
    icon: <Mail size={20} />,
    navLink: "/applications"
  }
]
