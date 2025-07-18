// src/Utils/NavIcons.js
import React from "react";
import { CiUser } from "react-icons/ci";
import {
  FaPen,
  FaInfoCircle,
  FaClipboardList,
  FaLock,
  FaHandshake,
} from "react-icons/fa";
import { IoIosAnalytics } from "react-icons/io";

// Export array of items with icon components (not JSX elements)
export const NavItems = [
  { to: "/profile", text: "Profile", icon: CiUser },
  { to: "/createpost", text: "Create Post", icon: FaPen },
  { to: "/about", text: "About", icon: FaInfoCircle },
  { to: "/terms", text: "Terms & Conditions", icon: FaClipboardList },
  { to: "/privacy", text: "Privacy Policy", icon: FaLock },
  { to: "/community", text: "Community Rules", icon: FaHandshake },
  { to: "/analytics", text: "Analytics", icon: IoIosAnalytics },
];
