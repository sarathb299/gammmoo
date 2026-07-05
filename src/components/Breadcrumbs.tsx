import React from 'react';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  name: string;
  path: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  const navigateTo = (path: string) => {
    window.history.pushState({}, '', path);
    window.dispatchEvent(new PopStateEvent('popstate'));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Construct JSON-LD BreadcrumbList Schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://thinksarath.com"
      },
      ...items.map((item, index) => ({
        "@type": "ListItem",
        "position": index + 2,
        "name": item.name,
        "item": `https://thinksarath.com${item.path}`
      }))
    ]
  };

  return (
    <nav aria-label="Breadcrumb" className="mb-6 z-20 relative">
      {/* JSON-LD Schema for Google Rich Snippets */}
      <script 
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      
      <ol className="flex items-center flex-wrap gap-1.5 md:gap-2 font-mono text-[10px] md:text-xs text-zinc-500 uppercase tracking-wider">
        <li className="flex items-center">
          <button
            onClick={() => navigateTo('/')}
            className="flex items-center gap-1 hover:text-luxury-green-glowing transition-colors duration-200 focus:outline-none cursor-pointer"
          >
            <Home className="w-3.5 h-3.5" />
            <span>HOME</span>
          </button>
        </li>
        
        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;
          return (
            <React.Fragment key={idx}>
              <li className="flex items-center text-zinc-700">
                <ChevronRight className="w-3 h-3 mx-0.5" />
              </li>
              <li className="flex items-center">
                {isLast ? (
                  <span className="text-luxury-green-glowing font-medium bg-green-950/20 px-2 py-0.5 rounded border border-green-900/20">
                    {item.name}
                  </span>
                ) : (
                  <button
                    onClick={() => navigateTo(item.path)}
                    className="hover:text-luxury-green-glowing transition-colors duration-200 focus:outline-none cursor-pointer"
                  >
                    {item.name}
                  </button>
                )}
              </li>
            </React.Fragment>
          );
        })}
      </ol>
    </nav>
  );
}
