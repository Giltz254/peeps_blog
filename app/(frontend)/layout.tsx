import { AuthProvider } from '@/components/AuthProvider';
import Footer from '@/components/Footer';
import Navbar from '@/components/frontend/Header';
import SocialIcons from '@/components/social-icons';
const FrontendLayout = async({children}: { children: React.ReactNode }) => {
  return (
    <div className='flex flex-col w-full min-h-screen bg-background'>
        <AuthProvider>
        <Navbar />
        </AuthProvider>
        <SocialIcons />
        <main>
            {children}
            <Footer />
        </main>
    </div>
  )
}

export default FrontendLayout