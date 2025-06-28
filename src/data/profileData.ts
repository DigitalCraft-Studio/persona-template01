import { getResourcePath } from '../utils/pathUtils';

export const profileData = {
  name: 'Your Name',
  title: 'CURRENT TITLE',
  imageUrl: getResourcePath('/static/images/logo.jpeg'),
  bio: `Brief bio about yourself. This can include your current position, research interests, and any other relevant information you'd like to share.`,
  socialLinks: {
    googleScholar: 'https://scholar.google.com/citations?user=YOUR_GOOGLE_SCHOLAR_ID',
    github: 'https://github.com/YOUR_GITHUB_USERNAME',
    linkedin: 'https://www.linkedin.com/in/YOUR_LINKEDIN_USERNAME/',
    email: 'your.email@example.com',
  },
}; 