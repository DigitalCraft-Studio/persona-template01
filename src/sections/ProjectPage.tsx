import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Typography, Layout, Divider, Tag, Button } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { projectsData } from '../data/projectsData';
import MarkdownRenderer from '../components/MarkdownRenderer';
import GeometricBackground from '../components/GeometricBackground';
import '../styles/ProjectPage.css';

const { Title, Paragraph } = Typography;
const { Content } = Layout;

const ProjectPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const project = projectsData.find(p => p.title.replace(/\s+/g, '-').toLowerCase() === id);

  const handleBack = () => {
    // Navigate back to the main page with state indicating we're coming from a project page
    navigate('/?tab=projects', { state: { fromProject: true } });
  };

  if (!project) {
    return <div>Project not found</div>;
  }

  return (
    <div className="app-container">
      {/* Layer 1: Black Background */}
      <div className="black-background-layer"></div>
      
      {/* Layer 2: Geometric Background */}
      <GeometricBackground />
      
      {/* Layer 3: Content */}
      <Layout className="content-layer">
        <Content style={{ padding: '0 50px', marginTop: '64px' }}>
          <div className="site-layout-content">
            <div className="project-back-button">
              <Button 
                icon={<ArrowLeftOutlined />} 
                onClick={handleBack}
                style={{ marginBottom: '20px' }}
              >
                Back to Projects
              </Button>
            </div>
            <div className="project-header-background" style={{
              backgroundImage: project.imageUrl ? `url(${project.imageUrl})` : undefined,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              position: 'relative',
              minHeight: '220px',
              borderRadius: '16px',
              marginBottom: '32px',
              overflow: 'hidden',
            }}>
              <div className="project-header-overlay">
                <Title style={{ color: '#fff', textShadow: '0 2px 8px rgba(0,0,0,0.45)', margin: 0 }}>{project.title}</Title>
                <div className="project-tech-tags">
                  {project.technologies?.map((tech, index) => (
                    <Tag key={index} color="gold">{tech}</Tag>
                  ))}
                </div>
              </div>
            </div>
            
            <Divider />
            {!project.markdownPath && (
              <>
                <Title level={3}>Project Overview</Title>
                <Paragraph>
                  {project.description}
                </Paragraph>
              </>
            )}
            
            {/* If a complete Markdown file path is available, render the entire Markdown */}
            {project.markdownPath ? (
              <div className="project-content">
                <MarkdownRenderer filePath={project.markdownPath} />
              </div>
            ) : (
              <div className="project-content">
                <Title level={3}>Methods</Title>
                {project.methodsMarkdownPath ? (
                  <MarkdownRenderer filePath={project.methodsMarkdownPath} />
                ) : (
                  <Paragraph>
                    {project.methods || "This project has not provided a detailed methods description yet."}
                  </Paragraph>
                )}
                
                <Title level={3}>Results</Title>
                {project.resultsMarkdownPath ? (
                  <MarkdownRenderer filePath={project.resultsMarkdownPath} />
                ) : (
                  <Paragraph>
                    {project.results || "This project has not provided a detailed results description yet."}
                  </Paragraph>
                )}
                
                <Title level={3}>Conclusion</Title>
                {project.conclusionMarkdownPath ? (
                  <MarkdownRenderer filePath={project.conclusionMarkdownPath} />
                ) : (
                  <Paragraph>
                    {project.conclusion || "This project has not provided a detailed conclusion description yet."}
                  </Paragraph>
                )}
              </div>
            )}
          </div>
        </Content>
      </Layout>
    </div>
  );
};

export default ProjectPage;