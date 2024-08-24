"use client";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  MdKeyboardArrowLeft,
  MdOutlineAdminPanelSettings,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";
import { FiChevronDown } from "react-icons/fi";
import { FaTasks } from "react-icons/fa";
import { RiGalleryLine } from "react-icons/ri";
import { TbMathIntegralX } from "react-icons/tb";
import Link from "next/link";
import Image from "next/image";
import { SiAmazondocumentdb } from "react-icons/si";
import { TiFolderOpen } from "react-icons/ti";
import { LuLayoutList, LuUsers } from "react-icons/lu";
import { LiaComments } from "react-icons/lia";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import { IoCloseSharp } from "react-icons/io5";

const Sidebar = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [hovering, setHovering] = useState<boolean>(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const pathname = usePathname();
  const router = useRouter();

  const handleMouseEnter = () => setHovering(true);
  const handleMouseLeave = () => {
    if (!open) setHovering(false);
  };

  const handleClick = () => {
    setOpen((prevOpen) => {
      const newOpen = !prevOpen;
      if (!newOpen) setHovering(false);
      return newOpen;
    });
  };
const handleMouseOverEnter = () => {
  if (!open && !hovering) {
    setHovering(false)
  }
  if (hovering) {
    handleMouseEnter()
  }
}
  return (
    <div className="relative z-50">
      <button
      onMouseOver={handleMouseOverEnter}
        onClick={handleClick}
        className={`h-8 w-8 border rounded-full flex items-center justify-center bg-white outline-0 border-border drop-shadow-sm cursor-pointer text-secondary-foreground sm:absolute sm:top-4 sm:-right-[16px] ${hovering ? "sm:fixed sm:top-4 sm:left-[276px] z-[60]" : ""}
  ${
    open
      ? `z-[300] 
         max-sm:absolute max-sm:top-4 max-sm:left-[276px] max-sm:mt-1
         `
      : `max-sm:fixed max-sm:top-4 max-sm:left-4`
  } max-sm:z-[300]`}
      >
        <div className="hidden sm:block">
        {open ? (
          <MdKeyboardArrowLeft size={24} />
        ) : (
          <MdOutlineKeyboardArrowRight size={24} />
        )}
        </div>
        <div className="max-sm:block hidden">
          {
            open ? <IoCloseSharp size={24} />: <HiOutlineMenuAlt2 size={24} />
          }
        </div>
      </button>

      {/* Sidebar */}
      <div
        className={`bg-card border-r h-screen flex flex-col top-0 left-0 transition-all duration-300 
  ${
    open || hovering
      ? `w-72 ${open ? "max-sm:fixed max-sm:z-10 sm:sticky" : ""} ${
          hovering && !open ? "sm:fixed" : ""
        }`
      : "w-max"
  } ${!open && "max-sm:hidden"}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="relative w-full">
          <div
            onClick={() => router.push("/")}
            className="flex cursor-pointer items-center gap-2 h-16 border-b"
          >
            <div className="h-8 w-8 ml-4 ring-2 ring-secondary-foreground relative overflow-hidden rounded-full">
              <Image
                src={"/logo.png"}
                fill
                alt="Jspeeps"
                className="object-cover"
              />
            </div>
            <span
              className={`${
                open || hovering ? "block mr-4" : "hidden"
              } text-lg font-bold uppercase text-secondary-foreground transition-all duration-300`}
            >
              Jspeeps
            </span>
          </div>
        </div>

        <div className="px-4 pt-2 overflow-y-auto child flex flex-col items-start w-full gap-y-4">
          <MenuItem
            hovering={hovering}
            icon={<LuLayoutList />}
            label="Dashboard"
            open={open}
            pathname={pathname}
            activeMenu={activeMenu}
            setActiveMenu={setActiveMenu}
          />
          <MenuItem
            icon={<SiAmazondocumentdb />}
            label="Posts"
            open={open}
            pathname={pathname}
            hovering={hovering}
            activeMenu={activeMenu}
            setActiveMenu={setActiveMenu}
          >
            <SubMenu
              label="All Posts"
              href="/dashboard/posts"
              pathname={pathname}
            />
            <SubMenu
              label="Add New"
              href="/dashboard/posts/new"
              pathname={pathname}
            />
            <SubMenu
              label="Drafts"
              href="/dashboard/posts/drafts"
              pathname={pathname}
            />
          </MenuItem>

          <MenuItem
            hovering={hovering}
            icon={<TiFolderOpen />}
            label="Categories"
            open={open}
            pathname={pathname}
            activeMenu={activeMenu}
            setActiveMenu={setActiveMenu}
          />

          <MenuItem
            hovering={hovering}
            icon={<RiGalleryLine />}
            label="Media Library"
            open={open}
            pathname={pathname}
            activeMenu={activeMenu}
            setActiveMenu={setActiveMenu}
          />

          <MenuItem
            icon={<FaTasks />}
            label="Tags"
            open={open}
            pathname={pathname}
            hovering={hovering}
            activeMenu={activeMenu}
            setActiveMenu={setActiveMenu}
          >
            <SubMenu
              label="All Tags"
              href="/dashboard/tags"
              pathname={pathname}
            />
            <SubMenu
              label="Add New"
              href="/dashboard/tags/new"
              pathname={pathname}
            />
          </MenuItem>

          <MenuItem
            hovering={hovering}
            icon={<LiaComments />}
            label="Comments"
            open={open}
            pathname={pathname}
            activeMenu={activeMenu}
            setActiveMenu={setActiveMenu}
          />

          <MenuItem
            hovering={hovering}
            icon={<TbMathIntegralX />}
            label="Integrations"
            open={open}
            pathname={pathname}
            activeMenu={activeMenu}
            setActiveMenu={setActiveMenu}
          />
          <div className="mt-5 flex flex-col gap-y-2 bg-inherit w-full">
            <MenuItem
              hovering={hovering}
              icon={<LuUsers />}
              label="Users"
              open={open}
              pathname={pathname}
              activeMenu={activeMenu}
              setActiveMenu={setActiveMenu}
            />
            <MenuItem
              icon={<MdOutlineAdminPanelSettings size={22} />}
              label="Profile"
              open={open}
              pathname={pathname}
              hovering={hovering}
              activeMenu={activeMenu}
              setActiveMenu={setActiveMenu}
            >
              <SubMenu
                label="Profile Settings"
                href="/profile/settings"
                pathname={pathname}
              />
            </MenuItem>
          </div>
        </div>
      </div>
    </div>
  );
};

const MenuItem = ({
  icon,
  label,
  open,
  hovering,
  pathname,
  children,
  activeMenu,
  setActiveMenu,
}: any) => {
  const hasChildren = Array.isArray(children) && children.length > 0;
  const isActiveSubmenu = hasChildren
    ? children.some((child: any) => pathname === child.props.href)
    : false;
  const isActiveMenu =
    isActiveSubmenu ||
    pathname === `/dashboard/${label.toLowerCase()}` ||
    (label === "Dashboard" && pathname === "/dashboard");

  const isOpen = activeMenu === label;

  const toggleMenu = () => {
    setActiveMenu(isOpen ? null : label);
  };

  const menuItemClasses = `flex items-center w-full p-2 cursor-pointer hover:bg-muted transition-all duration-300 rounded-md ${
    isActiveMenu ? "bg-muted text-black border rounded-sm border-border" : ""
  } ${!open && !hovering && isActiveMenu ? "text-black" : ""}`;

  const iconClasses = `text-xl ${
    !open && !hovering && isActiveMenu ? "text-primary" : "text-black"
  }`;

  return (
    <div className="relative w-full">
      {hasChildren ? (
        <>
          <div className={menuItemClasses} onClick={toggleMenu}>
            <div className={iconClasses}>{icon}</div>
            {(open || hovering) && (
              <div className="ml-4 flex justify-between items-center w-full">
                <span className="text-secondary-foreground font-normal text-base">
                  {label}
                </span>
                <FiChevronDown
                  className={`${
                    isOpen ? "rotate-180" : "rotate-0"
                  } transition-transform`}
                />
              </div>
            )}
          </div>
          {/* Submenu */}
          {(open || hovering) && isOpen && (
            <div
              className={`transition-all duration-300 ease-in-out ${
                isOpen ? "max-h-screen" : "max-h-0"
              }`}
            >
              <div className="ml-6 pl-[8px] border-l border-muted mt-1 space-y-1">
                {children}
              </div>
            </div>
          )}
        </>
      ) : (
        <Link
          href={
            label === "Dashboard"
              ? `/dashboard`
              : `/dashboard/${label.toLowerCase()}`
          }
          className={menuItemClasses}
        >
          <div className={iconClasses}>{icon}</div>
          {(open || hovering) && (
            <span className="ml-4 text-secondary-foreground font-normal text-base">
              {label}
            </span>
          )}
        </Link>
      )}
    </div>
  );
};

const SubMenu = ({ label, href, pathname }: any) => {
  const isActiveSubmenu = pathname === href;

  return (
    <Link
      href={href}
      className={`block text-sm text-secondary-foreground font-normal py-2 px-2 transition-all duration-300 ${
        isActiveSubmenu ? "bg-muted text-primary rounded-sm" : ""
      }`}
    >
      {label}
    </Link>
  );
};

export default Sidebar;
