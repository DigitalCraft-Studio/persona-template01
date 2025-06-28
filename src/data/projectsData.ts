import { getResourcePath } from '../utils/pathUtils';

export interface Project {
  title: string;
  description: string;
  year: number;
  imageUrl?: string;
  technologies?: string[];
  methods?: string;
  results?: string;
  conclusion?: string;
  markdownPath?: string;
  methodsMarkdownPath?: string;
  resultsMarkdownPath?: string;
  conclusionMarkdownPath?: string;
  associatedWith: string;
}

export const projectsData: Project[] = [
  {
    title: 'EXAMPLE PROJECT 01',
    description: 'PLACEHOLDER',
    year: 2024,
    technologies: ['Skill 1', 'Skill 2', 'Skill 3'],
    imageUrl: getResourcePath('/static/images/projects/logo.jpeg'),
    methods: 'This section provides a detailed description of the methods and technologies used in the project. We employed the latest deep learning architectures and algorithms to solve this complex problem. By combining various techniques, we were able to efficiently process the data and generate high-quality results.',
    results: 'This section showcases the outcomes and results of the project. Our method performed exceptionally well in various benchmark tests, surpassing existing state-of-the-art techniques. Charts and data analysis demonstrate the effectiveness and robustness of our approach.',
    conclusion: 'This section summarizes the main findings and future directions of the project. Our research indicates that the proposed method performs well under various conditions. In the future, we plan to extend this work to apply it to wider domains.',
    associatedWith: 'UNIVERSITY-01',
  },

  {
    title: 'EXAMPLE PROJECT 02',
    description: 'This project uses multiple Markdown files to separately provide methods, results, and conclusion sections.',
    year: 2023,
    technologies: ['Skill A', 'Skill B', 'Skill C'],
    imageUrl: getResourcePath('/static/images/projects/logo.jpeg'),
    methodsMarkdownPath: getResourcePath('/static/markdown/projects/methods_example.md'),
    resultsMarkdownPath: getResourcePath('/static/markdown/projects/results_example.md'),
    conclusionMarkdownPath: getResourcePath('/static/markdown/projects/conclusion_example.md'),
    associatedWith: 'personal',
  }
]; 