import React from 'react';
import { Avatar, Typography, Space, Divider } from 'antd';
import { GithubOutlined, LinkedinOutlined, MailOutlined } from '@ant-design/icons';
import GoogleScholarIcon from '../components/GoogleScholarIcon';
import { profileData } from '../data/profileData';
import '../styles/About.css';

const { Title, Paragraph, Text } = Typography;

const About: React.FC = () => {
  return (
    <div className="about-section">
      <div className="about-left">
        <Avatar size={150} src={profileData.imageUrl} />
        <Title level={2} style={{ marginTop: '20px' }}>{profileData.name}</Title>
        <Text type="secondary">{profileData.title}</Text>
        <Divider />
        <Space size="middle">
          <a href={profileData.socialLinks.googleScholar} target="_blank" rel="noopener noreferrer"><GoogleScholarIcon /></a>
          <a href={profileData.socialLinks.github} target="_blank" rel="noopener noreferrer"><GithubOutlined /></a>
          <a href={profileData.socialLinks.linkedin} target="_blank" rel="noopener noreferrer"><LinkedinOutlined /></a>
          <a href={`mailto:${profileData.socialLinks.email}`}><MailOutlined /></a>
        </Space>
      </div>
      <div className="about-right">
        <Title level={3}>About Me</Title>
        <Paragraph>
          {profileData.bio}
        </Paragraph>
      </div>
    </div>
  );
};

export default About; 