/**
 * Centralized SEO Utility for ThinkSarath
 * Maps brand entities and pages to rich JSON-LD schemas.
 */

export interface SEOData {
  title: string;
  description: string;
  keywords: string;
  schema?: Record<string, any> | Record<string, any>[];
}

/**
 * Returns the baseline brand entities (Person, Organization, ProfessionalService)
 * to be consistently injected as JSON-LD schema into the head of every page.
 */
export function getCentralSchema(): Record<string, any>[] {
  return [
    {
      "@context": "https://schema.org",
      "@type": "Person",
      "@id": "https://thinksarath.com/#person",
      "name": "Sarath Babu K",
      "alternateName": "Sarath Babu",
      "jobTitle": "AI SEO Consultant & Digital Marketing Strategist",
      "url": "https://thinksarath.com",
      "image": "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80",
      "sameAs": [
        "https://github.com/sarathb299",
        "https://linkedin.com/in/sarathb299",
        "https://wa.me/917094629042"
      ],
      "knowsAbout": [
        "Search Engine Optimization",
        "Answer Engine Optimization",
        "Generative Engine Optimization",
        "Programmatic SEO",
        "Google Ads",
        "Meta Ads",
        "Digital Marketing Strategy",
        "Web Development"
      ],
      "worksFor": {
        "@type": "Organization",
        "name": "ThinkSarath",
        "url": "https://thinksarath.com"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "@id": "https://thinksarath.com/#organization",
      "name": "ThinkSarath",
      "url": "https://thinksarath.com",
      "logo": "https://thinksarath.com/logo.png",
      "founder": {
        "@id": "https://thinksarath.com/#person"
      },
      "sameAs": [
        "https://github.com/sarathb299",
        "https://linkedin.com/in/sarathb299"
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      "@id": "https://thinksarath.com/#service",
      "name": "ThinkSarath AI Digital Marketing",
      "image": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
      "url": "https://thinksarath.com",
      "telephone": "+917094629042",
      "priceRange": "$$",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "OMR Road, Sholinganallur",
        "addressLocality": "Chennai",
        "addressRegion": "Tamil Nadu",
        "postalCode": "600119",
        "addressCountry": "IN"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 12.9010,
        "longitude": 80.2279
      },
      "openingHoursSpecification": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday"
        ],
        "opens": "09:00",
        "closes": "18:00"
      }
    }
  ];
}

/**
 * Returns dynamic page-specific metadata and JSON-LD schema
 * based on the active view and optional active blog post.
 */
export function getPageMetadata(view: string, activePost?: any): SEOData {
  const baseTitle = "ThinkSarath | AI SEO & Digital Marketing Consultant Chennai";
  const baseDesc = "Chennai's leading AI digital marketing consultant. Specialized in SEO, Answer Engine Optimisation (AEO), Generative Engine Optimisation (GEO), Google Ads, and Meta Ads.";
  const baseKeywords = "AI Digital Marketing Chennai, SEO Freelancer Chennai, AEO Specialist Chennai, GEO Optimization, Google Ads Consultant, Meta Ads Expert, ThinkSarath, Generative Engine Optimization";

  if (view === 'blog' && activePost) {
    const formattedDate = (() => {
      try {
        const d = new Date(activePost.date);
        return isNaN(d.getTime()) ? "2026-07-05" : d.toISOString().split('T')[0];
      } catch {
        return "2026-07-05";
      }
    })();

    return {
      title: `${activePost.title} | ThinkSarath AI SEO Blog`,
      description: activePost.summary,
      keywords: `${activePost.title}, AI SEO, GEO, AEO, ThinkSarath, ${activePost.categoryLabel}, ${activePost.id}`,
      schema: {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": `https://thinksarath.com/blog?post=${activePost.id}`
        },
        "headline": activePost.title,
        "description": activePost.summary,
        "image": activePost.image,
        "datePublished": formattedDate,
        "dateModified": formattedDate,
        "author": {
          "@type": "Person",
          "@id": "https://thinksarath.com/#person",
          "name": "Sarath Babu K",
          "jobTitle": "Head of Digital Marketing & AI SEO Consultant",
          "url": "https://thinksarath.com"
        },
        "publisher": {
          "@type": "Organization",
          "@id": "https://thinksarath.com/#organization",
          "name": "ThinkSarath",
          "url": "https://thinksarath.com",
          "logo": {
            "@type": "ImageObject",
            "url": "https://thinksarath.com/logo.png"
          }
        }
      }
    };
  }

  const viewsConfig: Record<string, { title: string; description: string; keywords: string; schema?: any }> = {
    home: {
      title: baseTitle,
      description: baseDesc,
      keywords: baseKeywords,
    },
    about: {
      title: "About Sarath Babu K | AI SEO Consultant & Strategist",
      description: "Learn about Sarath Babu K, founder of ThinkSarath, organic growth expert, and Head of Digital Marketing at Code99 IT Academy.",
      keywords: "Sarath Babu K, ThinkSarath Founder, SEO Consultant Chennai, Code99 Academy Head",
    },
    services: {
      title: "AI Search, AEO, GEO & Elite SEO Services | ThinkSarath",
      description: "Explore our premium performance services: Answer Engine Optimization, Generative Engine Optimization, custom pSEO engines, and Google/Meta Ads.",
      keywords: "AEO Services, GEO Services, Programmatic SEO Chennai, Google Ads Consultant",
    },
    blog: {
      title: "Advanced AI SEO & GEO Technical Blog | ThinkSarath",
      description: "Deep dive technical articles on Answer Engine Optimization, LLM schema mapping, programmatic traffic scaling, and AI Search strategy.",
      keywords: "AI SEO Blog, GEO Guide, AEO Schema, Programmatic SEO Strategy",
      schema: {
        "@context": "https://schema.org",
        "@type": "Blog",
        "name": "ThinkSarath Advanced AI SEO Blog",
        "description": "Technical essays on AEO, GEO, and advanced digital marketing architectures.",
        "url": "https://thinksarath.com/blog",
        "publisher": {
          "@type": "Person",
          "name": "Sarath Babu K"
        }
      }
    },
    faq: {
      title: "Technical AI SEO & Marketing FAQ | ThinkSarath",
      description: "Clear, authoritative answers to the most critical technical questions regarding AEO, GEO, schema mapping, and paid acquisition synergy.",
      keywords: "SEO FAQ, AI Marketing Questions, Perplexity SEO FAQ, ChatGPT Optimization FAQ",
    },
    contact: {
      title: "Contact ThinkSarath | Direct Growth Consulting Concierge",
      description: "Get in touch directly with Sarath Babu K for high-ticket SEO audit pipelines and custom performance marketing campaigns.",
      keywords: "Contact Sarath Babu, SEO Consultation Chennai, Hire AI Marketing Freelancer",
    },
    'brand-hub': {
      title: "Brand Entity Hub & Proprietary Method™ | ThinkSarath",
      description: "Explore the verified entity nodes, academic partnerships, and the signature ThinkSarath Method™ for AI Search optimization.",
      keywords: "ThinkSarath Entity Hub, ThinkSarath Method, AI Search Framework, ZenX Academy Partner",
    }
  };

  return viewsConfig[view] || { title: baseTitle, description: baseDesc, keywords: baseKeywords };
}
