import React from 'react';
import { Link } from 'react-router-dom';
import { Typography, Card, List, Button, Space, Divider, Tag } from 'antd';
import { projectsData, Project } from '../data/projectsData';
import { homeData } from '../data/homeData';
import { profileData } from '../data/profileData';
import '../styles/Projects.css';

const { Title, Paragraph } = Typography;

const getProjectLogo = (project: Project): string | undefined => {
  // Check work experience
  const exp = homeData.experience.find(e => e.company === project.associatedWith);
  if (exp) return exp.logo;
  // Check education
  const edu = homeData.education.find(e => e.university === project.associatedWith);
  if (edu) return edu.logo;
  // Personal
  if (project.associatedWith === 'personal') return profileData.imageUrl;
  return undefined;
};

const Projects: React.FC = () => {
  const groupedByYear = projectsData.reduce((acc, project) => {
    const year = project.year;
    if (!acc[year]) {
      acc[year] = [];
    }
    acc[year].push(project);
    return acc;
  }, {} as Record<number, Project[]>);

  const sortedYears = Object.keys(groupedByYear).map(Number).sort((a, b) => b - a);

  return (
    <div className="projects-section">
      {sortedYears.map(year => (
        <div key={year}>
          <Divider orientation="left"><Title level={3}>{year}</Title></Divider>
          <List
            grid={{ gutter: 16, xs: 1, sm: 1, md: 2, lg: 2, xl: 3, xxl: 3 }}
            dataSource={groupedByYear[year]}
            renderItem={project => {
              const projectUrl = `/project/${project.title.replace(/\s+/g, '-').toLowerCase()}`;
              const logo = getProjectLogo(project);
              return (
                <List.Item>
                  <Card 
                    title={<Link to={projectUrl} style={{ whiteSpace: 'normal', wordBreak: 'break-word' }}>{project.title}</Link>}
                    cover={project.imageUrl && (
                      <div className="project-image-container">
                        <img alt={project.title} src={project.imageUrl} className="project-image" />
                      </div>
                    )}
                  >
                    <Paragraph>{project.description}</Paragraph>
                    
                    {project.technologies && (
                      <div className="project-tech-tags">
                        {project.technologies.map((tech, index) => (
                          <Tag key={index} color="gold">{tech}</Tag>
                        ))}
                      </div>
                    )}
                    
                    <Space style={{ marginTop: '15px' }}>
                      <Link to={projectUrl}>
                        <Button type="primary" className="gold-button">View Details</Button>
                      </Link>
                      {logo && (
                        <img src={logo} alt="association logo" className="project-association-logo" />
                      )}
                    </Space>
                  </Card>
                </List.Item>
              )
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default Projects; 