import { getUniqueTags } from '@/actions/get-unique-tags';
import { DEFAULT_WEBSITE_URL } from '@/constants';
import { UniqueTag } from '@/types/index';
import Link from 'next/link';
import React from 'react';
import { FaFacebookF, FaTwitter, FaPinterest, FaYoutube, FaLinkedinIn } from 'react-icons/fa';

const Footer = async () => {
    const uniqueTags = await getUniqueTags()
    const links = [
        { name: 'Terms & Conditions', href: '/terms' },
        { name: 'About Us', href: '/about' },
        { name: 'Help & Support', href: '/support' },
        { name: 'Careers', href: '/careers' },
        { name: 'Privacy Policy', href: '/privacy' },
        { name: 'Community & Forum', href: '/community' },
      ];
  return (
    <footer className="bg-white border-t border-t-border text-secondary-foreground py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        
        {/* About Us Section */}
        <div>
          <h3 className="text-secondary-foreground font-bold capitalize mb-4">About Jspeeps</h3>
          <p className="text-sm font-normal text-muted-foreground">
            It includes rich features & contents. It’s designed & developed based on One Page/Multi-page layouts.
            You can use any layout from any demo anywhere.
          </p>
          <div className="mt-4">
            <h3 className="text-white font-bold capitalize mb-4">Social Links</h3>
            <div className="flex space-x-3">
              <Link target='_blank' href={''}><FaFacebookF size={24} className="text-xl text-muted-foreground hover:text-secondary-foreground transition-colors duration-300" /></Link>
              <Link target='_blank' href={''}><FaTwitter size={24} className="text-xl text-muted-foreground hover:text-secondary-foreground transition-colors duration-300" /></Link>
              <Link target='_blank' href={''}><FaPinterest size={24} className="text-xl text-muted-foreground hover:text-secondary-foreground transition-colors duration-300" /></Link>
              <Link target='_blank' href={''}><FaYoutube size={24} className="text-xl text-muted-foreground hover:text-secondary-foreground transition-colors duration-300" /></Link>
              <Link target='_blank' href={''}><FaLinkedinIn size={24} className="text-xl text-muted-foreground hover:text-secondary-foreground transition-colors duration-300" /></Link>
            </div>
          </div>
        </div>

        {/* Tags Widget Section */}
        <div>
          <h3 className="text-secondary-foreground font-bold mb-4">Tags Widget</h3>
          <div className="flex flex-wrap gap-2">
            {uniqueTags.uniqueTags.map((tag: UniqueTag, i: number) => (
              <Link href={`${DEFAULT_WEBSITE_URL}/tags/${tag.tag}`} key={i} className="bg-white text-muted-foreground text-sm font-medium py-1 px-3 rounded hover:bg-white hover:text-black transition-all duration-300 border border-border">
                {tag.tag}
              </Link>
            ))}
          </div>
          <div className="mt-8">
            <h3 className="text-secondary-foreground font-bold mb-4">Important Links</h3>
            <ul className="space-y-2 text-sm flex flex-col">
              {links.map((link, i) => (
                <Link href={link.href} key={i} className="text-muted-foreground transition-colors duration-300 hover:text-secondary-foreground">{link.name}</Link>
              ))}
            </ul>
          </div>
        </div>

        {/* Latest News Section */}
        <div>
          <h3 className="text-secondary-foreground font-bold mb-4">Latest News</h3>
          {Array(2).fill('').map((_, i) => (
            <div key={i} className="mb-4">
              <div className="flex space-x-3">
                <img src="https://via.placeholder.com/50" alt="News Thumbnail" className="w-12 h-12 rounded" />
                <div>
                  <h4 className="text-sm text-secondary-foreground font-semibold">Your Blog Title Goes Here</h4>
                  <p className="text-xs font-medium text-muted-foreground">Lorem ipsum dolor sit amet, consectetur</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Contact Section */}
        <div>
          <h3 className="text-secondary-foreground font-bold mb-4">Quick Contact</h3>
          <p className="text-sm text-secondary-foreground">Phone:</p>
          <p className="text-sm text-muted-foreground font-medium mb-4">+254 741 126 520 / +254 7398 312</p>
          <p className="text-sm text-secondary-foreground">Email:</p>
          <p className="text-sm mb-4 text-muted-foreground font-medium">gkiptoo169@gmail.com</p>
          <h3 className="text-secondary-foreground font-bold mb-4">Latest Works</h3>
          {Array(2).fill('').map((_, i) => (
            <div key={i} className="mb-4">
              <div className="flex space-x-3">
                <img src="https://via.placeholder.com/50" alt="Work Thumbnail" className="w-12 h-12 rounded" />
                <div>
                  <h4 className="text-sm text-secondary-foreground font-semibold">Your Blog Title Goes Here</h4>
                  <p className="text-xs text-muted-foreground font-medium">Lorem ipsum dolor sit amet, consectetur</p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </footer>
  );
};

export default Footer;
