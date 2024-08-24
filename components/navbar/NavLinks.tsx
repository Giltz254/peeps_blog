import Link from "next/link";

export default function NavLinks() {
  return (
    <>
      <Link href="/about" className="text-gray-700 hover:text-gray-900">
        About
      </Link>
      <Link href="/portfolio" className="text-gray-700 hover:text-gray-900">
        Portfolio
      </Link>
      <Link href="/contact" className="text-gray-700 hover:text-gray-900">
        Contact
      </Link>
    </>
  );
}
