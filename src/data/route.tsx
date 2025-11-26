import type { ReactNode } from "react";
import { MdEmail } from "react-icons/md";
import { IoAppsSharp, IoHomeSharp } from "react-icons/io5";
import { CiViewTable } from "react-icons/ci";
import { FaFolder, FaLock, FaWpforms } from "react-icons/fa";
import { TbError404 } from "react-icons/tb";

export interface MenuConfigItem {
  label: string;
  key: string;
  icon: ReactNode;
  children?: MenuConfigItem[];
}

export const menuConfig: MenuConfigItem[] = [
  { label: "داشبورد", key: "/", icon: <IoHomeSharp size={20} /> },

  {
    label: "صفحات",
    key: "pages",
    icon: <FaFolder size={20} />,
    children: [
      {
        label: "جدول‌ها",
        key: "/pages/table",
        icon: <CiViewTable size={20} />,
      },
      { label: "فرم‌ها", key: "/pages/forms", icon: <FaWpforms size={20} /> },
    ],
  },

  {
    label: "اپلیکیشن‌ها",
    key: "applications",
    icon: <IoAppsSharp size={20} />,
    children: [
      {
        label: "ایمیل",
        key: "/applications/mail",
        icon: <MdEmail size={20} />,
      },
    ],
  },

  {
    label: "ورود/ ثبت‌نام",
    key: "authentication",
    icon: <FaLock size={20} />,
    children: [
      { label: "ورود", key: "/auth/login", icon: <CiViewTable size={20} /> },
      {
        label: "ثبت‌نام",
        key: "/auth/register",
        icon: <FaWpforms size={20} />,
      },
    ],
  },

  {
    label: "بدون لینک ۱",
    key: "test1",
    icon: <TbError404 size={20} />,
    children: [
      { label: "مورد ۱", key: "/link-1x", icon: <TbError404 size={20} /> },
      { label: "مورد ۲", key: "/link-1y", icon: <TbError404 size={20} /> },
    ],
  },
  {
    label: "بدون لینک ۲",
    key: "test2",
    icon: <TbError404 size={20} />,
    children: [
      { label: "مورد ۱", key: "/link-2x", icon: <TbError404 size={20} /> },
      { label: "مورد ۲", key: "/link-2y", icon: <TbError404 size={20} /> },
    ],
  },
];

// 3) Recursive flatten (works to any depth, preserves all fields)
export function flattenMenuItems(items: MenuConfigItem[]): MenuConfigItem[] {
  return items.reduce<MenuConfigItem[]>((acc, item) => {
    // always include the parent node
    acc.push({ ...item, children: undefined });
    // then, if there are children, recurse
    if (item.children) {
      acc.push(...flattenMenuItems(item.children));
    }
    return acc;
  }, []);
}

export const menuItems = flattenMenuItems(menuConfig);
export const menuData = menuConfig;
