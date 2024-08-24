import Link from 'next/link';
import { FaLinkedin, FaGithub, FaInstagram, FaYoutube } from 'react-icons/fa';

const SocialIcons = () => {
  return (
    <ul className="flex flex-col bg-[#333333] py-4 items-center space-y-4 list-none fixed top-1/2 -translate-y-1/2 right-0 z-10">
      <li className="border-b border-border px-4 flex items-center justify-center pb-2">
        <Link
          href="https://linkedin.com/"
          className="flex items-center justify-center w-12 h-12 rounded-full bg-inherit text-white border border-border transition-all duration-300 ease-in-out hover:bg-primary"
        >
          <FaLinkedin className="relative z-10 text-2xl" />
        </Link>
      </li>
      <li className="border-b border-border px-4 flex items-center justify-center pb-2">
        <Link
          href="https://www.github.com/"
          className="flex items-center justify-center w-12 h-12 rounded-full bg-inherit text-white border border-border transition-all duration-300 ease-in-out hover:bg-primary"
        >
          <FaGithub className="relative z-10 text-2xl" />
        </Link>
      </li>
      <li className="border-b border-border px-4 flex items-center justify-center pb-2">
        <Link
          href="https://www.instagram.com/"
          className="flex items-center justify-center w-12 h-12 rounded-full bg-inherit text-white border border-border transition-all duration-300 ease-in-out hover:bg-[#e1306c]"
        >
          <FaInstagram className="relative z-10 text-2xl" />
        </Link>
      </li>
      <li className="px-4 flex items-center justify-center">
        <Link
          href="https://youtube.com/"
          aria-label="YouTube"
          data-social="youtube"
          className="flex items-center justify-center w-12 h-12 rounded-full bg-inherit text-white border border-border transition-all duration-300 ease-in-out hover:bg-destructive"
        >
          <FaYoutube className="relative z-10 text-2xl" />
        </Link>
      </li>
    </ul>
  );
};

export default SocialIcons;
