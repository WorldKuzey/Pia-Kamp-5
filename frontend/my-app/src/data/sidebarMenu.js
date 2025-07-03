// src/data/sidebarMenus.js
import {
  Home,
  Users,
  UserPlus,
  UserCircle,
  CalendarDays,
  CalendarPlus,
} from "lucide-react";

export const HR_MENU = [
  { label: "Ana Sayfa", path: "/hr/mainpage", icon: <Home size={18} /> },
  { label: "Çalışanlar", path: "/hr/employees", icon: <Users size={18} /> },
  {
    label: "Çalışan Ekle",
    path: "/hr/add-employee",
    icon: <UserPlus size={18} />,
  },
  { label: "Profilim", path: "/hr/profile", icon: <UserCircle size={18} /> },
];

export const EMPLOYEE_MENU = [
  { label: "Ana Sayfa", path: "/employee/mainpage", icon: <Home size={18} /> },
  {
    label: "İzinler",
    path: "/employee/leaves",
    icon: <CalendarDays size={18} />,
  },
  {
    label: "İzin Ekle",
    path: "/employee/leave-request",
    icon: <CalendarPlus size={18} />,
  },
  {
    label: "Profilim",
    path: "/employee/profile",
    icon: <UserCircle size={18} />,
  },
];
