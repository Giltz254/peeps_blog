import Image from 'next/image';
import Link from 'next/link';
import { FaGithub, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';

const Card = () => {
  return (
    <div className="w-64 h-90 bg-muted/10 transition-all ease-in-out duration-1000 clip-path-polygon card-shape border-t border-muted border-r border-b border-l flex flex-col">
      <div className="w-20 h-20 relative overflow-hidden bg-muted rounded-full mx-auto mt-4">
        <Image src={'/logo.png'} fill alt='Jspeeps' />
      </div>
      <span className="font-bold text-black text-center block text-lg mt-4 uppercase">About Me</span>
      <p className="font-normal text-black text-center block text-sm mx-4 mt-4">
      Hey there, I'm Godfrey Kiptoo, a passionate web developer and a graduate of information technology. My focus is on creating easy-to-use web apps using the latest in-demand technologies. I'm always on the lookout for projects and freelance work, and I am excited to share my expertise and advancement in the tech field.
      </p>
      <div className="flex justify-center gap-4 my-4">
        <Link href="https://github.com/Giltz254" className="text-primary transition-opacity duration-400 hover:text-primary/80">
          <FaGithub size={20} />
        </Link>
        <Link href="https://x.com/techtrektips" className="text-primary transition-opacity duration-400 hover:text-primary/80">
          <FaTwitter size={20} />
        </Link>
        <Link href="#" className="text-primary transition-opacity duration-400 hover:text-primary/80">
          <FaInstagram size={20} />
        </Link>
        <Link href="#" className="text-primary transition-opacity duration-400 hover:text-primary/80">
          <FaYoutube size={20} />
        </Link>
      </div>
    </div>
  );
};

export default Card;
