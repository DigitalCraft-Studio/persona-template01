import { getResourcePath } from '../utils/pathUtils';

export const homeData = {
  news: [
    {
      date: 'XX-XX-2025',
      content: 'TO BE UPDATED --  THIS IS A PLACEHOLDER',
      image: getResourcePath('/static/images/news/logo.jpeg'),
    },

  ],
  experience: [
    {
      role: 'ROLE-01',
      company: 'Company-01',
      duration: 'Jan 2024 - Present',
      location: 'Remote',
      logo: getResourcePath('/static/images/news/logo.jpeg'),
      details: [
        'DUTY-1',
        'DUTY-2',
        'DUTY-3',
      ],
    },
    {
      role: 'ROLE-02',
      company: 'Company-02',
      duration: 'Jan 2023 - Dec 2023',
      location: 'Remote',
      logo: getResourcePath('/static/images/news/logo.jpeg'),
      details: [
        'DUTY-1',
        'DUTY-2',
        'DUTY-3',
      ],
    },
  ],
  education: [
    {
      degree: 'Ph.D. in XXX',
      university: 'UNIVERSITY-01',
      duration: '20XX - 20XX',
      location: 'XXXX, XX, USA',
      logo: getResourcePath('/static/images/logos/logo.jpeg'),
    },
    {
      degree: 'B.S. in XXX',
      university: 'UNIVERSITY-02',
      duration: '20XX - 20XX',
      location: 'XXXX, XX, USA',
      logo: getResourcePath('/static/images/logos/logo.jpeg'),
    },
  ],
  publications: [
    {
      title: 'THIS IS THE TITLE OF THE PAPER',
      authors: ['Author One', 'Author Two', 'Author Three'],
      date: 'XX 20XX',
      journal: 'Preprint',
      link: 'https://example.com/paper',
    },
   
  ]
};