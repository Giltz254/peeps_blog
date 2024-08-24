import Link from "next/link";
import NavLinks from "./NavLinks";

export default function MobileNavLinks() {
  return (
    <ul className="space-y-4 flex flex-col">
      <NavLinks />
    </ul>
  );
}
