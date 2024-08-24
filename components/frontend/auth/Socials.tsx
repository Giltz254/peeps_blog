import { DEFAULT_LOGIN_REDIRECT } from '@/constants';
import { signIn } from 'next-auth/react';
import { FcGoogle } from 'react-icons/fc'
import { GrGithub } from 'react-icons/gr'

const Socials = () => {
  const onClick = (provider: "google" | "github") => {
    signIn(provider, {
      callbackUrl: DEFAULT_LOGIN_REDIRECT,
    });
  };
  return (
    <div className='flex items-center justify-center gap-4'>
        <button onClick={() => onClick("google")} className='flex-1 max-[400px]:h-12 max-[400px]:w-12 max-[400px]:p-0 max-[400px]:rounded-full flex items-center bg-white border drop-shadow-sm rounded-full min-[400px]:px-2 min-[400px]:py-2 justify-center group gap-2  hover:bg-primary-foreground transition-colors duration-500'>
            <FcGoogle size={24} />
            <p className='max-[400px]:hidden text-sm font-medium text-black group-hover:text-primary transition-colors duration-300'>Google</p>
        </button>
        <button onClick={() => onClick("github")} className='flex-1 max-[400px]:h-12 max-[400px]:w-12 max-[400px]:p-0 max-[400px]:rounded-full flex items-center bg-white border drop-shadow-sm rounded-full min-[400px]:px-2 min-[400px]:py-2 justify-center group gap-2 hover:bg-primary-foreground transition-colors duration-500'>
            <GrGithub size={24} />
            <p className='max-[400px]:hidden text-sm font-medium text-black group-hover:text-primary transition-colors duration-300'>Github</p>
        </button>
    </div>
  )
}

export default Socials