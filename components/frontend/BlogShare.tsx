import { FaTwitter, FaWhatsapp, FaLinkedin, FaTelegramPlane, FaEnvelope, FaPinterestP, FaRedditAlien } from 'react-icons/fa';
import { FC } from 'react';
import { DEFAULT_WEBSITE_URL } from '@/constants';
import Link from 'next/link';

interface BlogShareProps {
  title: string;
  des: string;
  url: string;
  imageUrl: string;
  tags?: string[];
}

const BlogShare: FC<BlogShareProps> = ({ title, des, url, imageUrl, tags = [] }) => {
  const shareUrl = `${DEFAULT_WEBSITE_URL}/blog/${url}`;

  const twitterShare = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(shareUrl)}&hashtags=${tags[0] || ""}`;
  const whatsappShare = `https://wa.me/?text=${encodeURIComponent(title + " " + des + " " + shareUrl)}`;
  const linkedinShare = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(title)}&summary=${encodeURIComponent(des)}`;
  const telegramShare = `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(title + " " + des)}`;
  const emailShare = `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(des + " " + shareUrl)}`;
  const pinterestShare = `https://www.pinterest.com/pin/create/button/?url=${encodeURIComponent(shareUrl)}&media=${encodeURIComponent(imageUrl)}&description=${encodeURIComponent(title)}`;
  const redditShare = `https://www.reddit.com/submit?url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(title)}`;

  return (
    <div className="px-4 flex flex-col">
      <p className="text-base font-semibold capitalize text-black mb-2">Share with:</p>
      <div className="flex flex-wrap items-center gap-4">
        <Link href={twitterShare} target="_blank" rel="noopener noreferrer" className="text-ndigo-500 hover:text-ndigo-700 transition-colors duration-500">
          <FaTwitter size={24} />
        </Link>
        <Link href={whatsappShare} target="_blank" rel="noopener noreferrer" className="text-green-500 hover:text-green-700 transition-colors duration-500">
          <FaWhatsapp size={24} />
        </Link>
        <Link href={linkedinShare} target="_blank" rel="noopener noreferrer" className="text-ndigo-600 hover:text-ndigo-500 transition-colors duration-500">
          <FaLinkedin size={24} />
        </Link>
        <Link href={telegramShare} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-600">
          <FaTelegramPlane size={24} />
        </Link>
        <Link href={emailShare} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-800">
          <FaEnvelope size={24} />
        </Link>
        <Link href={pinterestShare} target="_blank" rel="noopener noreferrer" className="text-red-600 hover:text-red-800">
          <FaPinterestP size={24} />
        </Link>
        <Link href={redditShare} target="_blank" rel="noopener noreferrer" className="text-orange-600 hover:text-orange-800">
          <FaRedditAlien size={24} />
        </Link>
      </div>
    </div>
  );
};

export default BlogShare;
