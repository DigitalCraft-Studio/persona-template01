export interface BlogPost {
  title: string;
  date: string;
  summary: string;
  link: string;
}

export const blogData: BlogPost[] = [
  {
    title: 'Welcome to my new blog!',
    date: '20XX-XX-XX',
    summary: 'This is the first post on my new blog. I will be writing about my research and other interests.',
    link: '#',
  },
  // Add more blog posts here
]; 