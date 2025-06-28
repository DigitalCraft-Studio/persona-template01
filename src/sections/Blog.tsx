import React from 'react';
import { Typography, List } from 'antd';
import { blogData } from '../data/blogData';
import '../styles/Blog.css';

const { Text, Paragraph } = Typography;

const Blog: React.FC = () => {
  return (
    <div className="blog-section">
      <List
        itemLayout="vertical"
        size="large"
        dataSource={blogData}
        renderItem={post => (
          <List.Item
            key={post.title}
            actions={[
              <a href={post.link} className="gold-link">Read more</a>,
            ]}
          >
            <List.Item.Meta
              title={<a href={post.link} className="gold-link">{post.title}</a>}
              description={<Text type="secondary">{post.date}</Text>}
            />
            <Paragraph>
              {post.summary}
            </Paragraph>
          </List.Item>
        )}
      />
    </div>
  );
};

export default Blog; 