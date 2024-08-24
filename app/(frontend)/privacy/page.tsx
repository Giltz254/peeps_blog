import Toc from '@/components/frontend/Toc'

const Privacy = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 min-h-screen">
      <h1 className="text-2xl pt-2 text-black font-bold mb-4 capitalize">Privacy Policy</h1>
      <p className="text-dark font-normal text-base mb-8">Last Updated May 23rd, 2022</p>
      <div className="grid md:grid-cols-4 gap-4">
        <aside className="md:col-span-1 border-r border-border">
          <nav className="sticky top-16">
            <Toc selector='.content' />
          </nav>
        </aside>
        <main className="md:col-span-3 content">
          <section id="introduction" className="mb-8">
            <h2 className="text-3xl font-semibold uppercase mb-4">Introduction</h2>
            <p>This Privacy Policy will help you better understand how we collect, use, and share your personal information.</p>
            <p className='text-justify font-normal text-base'>By using our website or Services, or by choosing to give us personal information, you consent to this Privacy Policy and the processing of your Personal Information it describes. If you do not agree with any terms of this Privacy Policy, please exercise the choices we describe in this Policy, or do not use the Services and do not give us any personal information.</p>
            <p className='text-justify font-normal text-base'>Creative Layer may change this policy from time to time by updating this page. You should check this page from time to time to ensure that you are happy with any changes. Your continued access to and/or use of our website or Services after any such changes constitutes your acceptance of, and agreement to this Privacy Policy, as revised.</p>
          </section>
          <section id="information-collection" className="mb-8">
            <h2 className="text-3xl font-semibold uppercase mb-4">Information Collection</h2>
            <p>We collect various types of information in connection with the services we provide, including:</p>
            <ul className="list-disc ml-5">
              <li className='text-sm font-medium leading-7'>Personal information you provide to us directly, such as your name, email address, and phone number.</li>
              <li className='text-sm font-medium leading-7'>Information about your usage of our services, including the pages you visit, the links you click, and other actions you take on our site.</li>
              <li className='text-sm font-medium leading-7'>Technical information such as your IP address, browser type, and operating system.</li>
            </ul>
          </section>
        </main>
      </div>
    </div>
  )
}

export default Privacy