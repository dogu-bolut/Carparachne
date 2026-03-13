export interface BlogPost {
    slug: string;
    title: string;
    category: string;
    readingTime: number;
    publishedAt: string;
    content: string; // The HTML string
    tags: string[];
    seo: {
      title: string;
      description: string;
      ogImage?: string;
    };
    coverImage: {
      src: string;
      altText: string;
    };
    author: {
      name: string;
      role?: string;
      bio?: string;
      avatar: {
        src: string;
        altText: string;
      };
    };
    toc?: {
      id: string;
      text: string;
      level: number;
    }[];
  }
  
  export const POSTS: BlogPost[] = [
    {
      slug: "getting-started-with-nextjs-app-router",
      title: "Mastering the Next.js App Router: A Comprehensive Guide",
      category: "Engineering",
      readingTime: 6,
      publishedAt: "2024-03-10T08:30:00Z",
      // Because your page uses dangerouslySetInnerHTML, we pass HTML directly here
      content: `
        <p>Welcome to the wonderful world of the <strong>Next.js App Router</strong>. This architecture changes how we think about layouts, data fetching, and caching.</p>
        <h2 id="server-components">Server Components by Default</h2>
        <p>By default, components inside the app directory are React Server Components. This allows you to render components on the server, reducing the amount of JavaScript sent to the client.</p>
        <h2 id="data-fetching">Simplified Data Fetching</h2>
        <p>You can now fetch data directly inside your server components using the native fetch API or database queries.</p>
      `,
      tags: ["Next.js", "React", "Frontend"],
      seo: {
        title: "Mastering the Next.js App Router",
        description: "Learn the ins and outs of the Next.js App Router, Server Components, and data fetching.",
      },
      coverImage: {
        // Using Unsplash as a placeholder. In production, use your own assets.
        src: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80",
        altText: "A laptop displaying code",
      },
      author: {
        name: "Alex Developer",
        role: "Senior Frontend Engineer",
        bio: "Alex loves building blazing-fast web applications and writing about modern React architecture.",
        avatar: {
          // Placeholder avatar
          src: "https://i.pravatar.cc/150?u=alex",
          altText: "Alex Developer's profile picture",
        },
      },
      toc: [
        { id: "server-components", text: "Server Components by Default", level: 2 },
        { id: "data-fetching", text: "Simplified Data Fetching", level: 2 },
      ],
    }
  ];