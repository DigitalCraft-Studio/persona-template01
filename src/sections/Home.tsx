import React, { useState } from 'react';
import { Typography, Row, Col, Card, List, Timeline } from 'antd';
import { homeData } from '../data/homeData';
import '../styles/Home.css';

const { Title, Text } = Typography;

const Home: React.FC = () => {
  const [expanded, setExpanded] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setExpanded(expanded === index ? null : index);
  };

  return (
    <div className="home-section">
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Card title={<Title level={4}>News</Title>}>
            <Timeline 
              items={homeData.news.map((item, index) => ({
                key: index,
                children: (
                  <div className="news-item">
                    <div className="news-content">
                      <Text strong>{item.date}:</Text> <span dangerouslySetInnerHTML={{ __html: item.content || '' }} />
                    </div>
                    {item.image && (
                      <div className="news-image">
                        <img 
                          src={item.image} 
                          alt={`News ${index + 1}`} 
                          className="news-attached-image"
                        />
                      </div>
                    )}
                  </div>
                )
              }))}
            />
          </Card>
        </Col>
        <Col md={12} sm={24}>
          <Card title={<Title level={4}>Experience</Title>}>
            <List
              itemLayout="horizontal"
              dataSource={homeData.experience}
              renderItem={(item, index) => (
                <List.Item
                  style={{ cursor: 'pointer' }}
                  onClick={() => handleToggle(index)}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', width: '100%' }}>
                    {item.logo && (
                      <img src={item.logo} alt={item.company} className="company-logo" style={{ marginRight: 16 }} />
                    )}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <Text strong>{item.role}</Text>
                      <div>{item.company} | {item.duration}</div>
                      <div className="location">{item.location}</div>
                      <div className={"exp-summary-wrapper" + (expanded === index ? " expanded" : "")}
                           style={{ overflow: 'hidden', transition: 'max-height 0.4s cubic-bezier(0.4,0,0.2,1)', maxHeight: expanded === index ? 500 : 0 }}>
                        {item.details && (
                          <ul className={expanded === index ? 'exp-summary-list expanded' : 'exp-summary-list'} style={{ marginTop: 8 }}>
                            {item.details.map((point: string, i: number) => (
                              <li key={i}>{point}</li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>
                  </div>
                </List.Item>
              )}
            />
          </Card>
        </Col>
        <Col md={12} sm={24}>
          <Card title={<Title level={4}>Education</Title>}>
            <List
              itemLayout="horizontal"
              dataSource={homeData.education}
              renderItem={item => (
                <List.Item>
                  <div style={{ display: 'flex', alignItems: 'flex-start', width: '100%' }}>
                    {item.logo && (
                      <img src={item.logo} alt={item.university} className="university-logo" style={{ marginRight: 16 }} />
                    )}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <Text strong>{item.degree}</Text>
                      <div>{item.university} | {item.duration}</div>
                      <div className="location">{item.location}</div>
                    </div>
                  </div>
                </List.Item>
              )}
            />
          </Card>
        </Col>
        <Col span={24}>
          <Card title={<Title level={4}>Recent Publications</Title>}>
            <div className="publications-container">
              <List
                itemLayout="horizontal"
                dataSource={homeData.publications}
                renderItem={item => (
                  <List.Item>
                    <List.Item.Meta
                      title={<Text strong>{item.title}</Text>}
                      description={
                        <>
                          <div>{item.authors.length > 10 
                            ? item.authors.slice(0, 10).join(', ') + ', et al.' 
                            : item.authors.join(', ')}</div>
                          <div><Text type="secondary">{item.journal} | {item.date}</Text></div>
                          <div>{item.link && <a href={item.link} target="_blank" rel="noopener noreferrer">View publication</a>}</div>
                        </>
                      }
                    />
                  </List.Item>
                )}
              />
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Home; 