"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Breadcrumb = () => {
  const pathname = usePathname();
  const pathSegments = pathname.split('/').filter(Boolean);

  return (
    <nav className="text-sm max-sm:ml-8 text-muted-foreground">
      <ol className="list-none p-0 inline-flex">
        <li className="flex items-center">
          <Link href="/" className="hover:text-secondary-foreground">
            Home
          </Link>
        </li>
        {pathSegments.map((segment, index) => {
          const path = `/${pathSegments.slice(0, index + 1).join('/')}`;
          const isLast = index === pathSegments.length - 1;
          const text = segment.replace(/-/g, ' ').replace(/^\w/, (c) => c.toUpperCase());

          return (
            <li key={path} className="flex items-center">
              <span className="mx-2">›</span>
              {isLast ? (
                <span className="text-secondary-foreground">{text}</span>
              ) : (
                <Link href={path} className="hover:text-secondary-foreground">
                  {text}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
