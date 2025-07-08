// src/data/sidebarMenus.js
import React from "react";

import HomeIcon from "@mui/icons-material/Home";
import PeopleIcon from "@mui/icons-material/People";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import EventNoteIcon from "@mui/icons-material/EventNote";
import LeavesIcon from "@mui/icons-material/BubbleChart";
import AddCommentIcon from "@mui/icons-material/AddComment"; // İtiraf Ekle
import ForumIcon from "@mui/icons-material/Forum";
import { FolderIcon } from "lucide-react"; // İtirafları Görüntüle

export const HR_MENU = [
  {
    label: "Ana Sayfa",
    path: "/hr/mainpage",
    icon: <HomeIcon fontSize="small" />,
  },
  {
    label: "Çalışanlar",
    path: "/hr/employees",
    icon: <PeopleIcon fontSize="small" />,
  },
  {
    label: "Çalışan Ekle",
    path: "/hr/add-employee",
    icon: <PersonAddIcon fontSize="small" />,
  },
  {
    label: "Çalışan İzinleri",
    path: "/hr/employees-leaves",
    icon: <LeavesIcon fontSize="small" />,
  },
  {
    label: "Projeler",
    path: "/hr/projects",
    icon: <FolderIcon fontSize="small" />,
  },
  // {
  //   label: "İtiraf Ekle",
  //   path: "/confession/add",
  //   icon: <AddCommentIcon fontSize="small" />,
  // },
  // {
  //   label: "İtirafları Görüntüle",
  //   path: "/confession/view",
  //   icon: <ForumIcon fontSize="small" />,
  // },
  {
    label: "Profilim",
    path: "/hr/profile",
    icon: <AccountCircleIcon fontSize="small" />,
  },
];

export const EMPLOYEE_MENU = [
  {
    label: "Ana Sayfa",
    path: "/employee/mainpage",
    icon: <HomeIcon fontSize="small" />,
  },
  {
    label: "İzinler",
    path: "/employee/leaves",
    icon: <EventAvailableIcon fontSize="small" />,
  },
  {
    label: "İzin Ekle",
    path: "/employee/leave-request",
    icon: <EventNoteIcon fontSize="small" />,
  },
  {
    label: "Projeler",
    path: "/employee/projects",
    icon: <FolderIcon fontSize="small" />,
  },
  // {
  //   label: "İtiraf Ekle",
  //   path: "/confession/add",
  //   icon: <AddCommentIcon fontSize="small" />,
  // },
  // {
  //   label: "İtirafları Görüntüle",
  //   path: "/confession/view",
  //   icon: <ForumIcon fontSize="small" />,
  // },
  {
    label: "Profilim",
    path: "/employee/profile",
    icon: <AccountCircleIcon fontSize="small" />,
  },
];
