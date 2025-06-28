import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { Layout, Tabs } from 'antd';
import { HomeOutlined, AppstoreOutlined, BookOutlined } from '@ant-design/icons';
import { getPublicPath } from './utils/pathUtils';
import About from './sections/About';
import Home from './sections/Home';
import Projects from './sections/Projects';
import Blog from './sections/Blog';
import ProjectPage from './sections/ProjectPage';
import GeometricBackground from './components/GeometricBackground';
import './styles/App.css';

const { Content } = Layout;

interface MainLayoutProps {
  defaultTab?: string;
}

const MainLayout: React.FC<MainLayoutProps> = ({ defaultTab = "1" }) => {
  const [activeKey, setActiveKey] = useState(defaultTab);
  const location = useLocation();
  const navigate = useNavigate();
  
  useEffect(() => {
    // Check if we're coming back from a project page
    const fromProject = location.state && location.state.fromProject;
    if (fromProject) {
      setActiveKey("2"); // Set to Projects tab
    }
  }, [location]);

  const handleTabChange = (key: string) => {
    setActiveKey(key);
    // Update the URL to reflect the current tab without reloading
    // This makes browser history work better
    if (key === "1") {
      navigate("/", { replace: true });
    } else if (key === "2") {
      navigate("/?tab=projects", { replace: true });
    } else if (key === "3") {
      navigate("/?tab=blog", { replace: true });
    }
  };

  const tabItems = [
    {
      key: "1",
      label: <span><HomeOutlined style={{ marginRight: 8 }} />Home</span>,
      children: <Home />
    },
    {
      key: "2",
      label: <span><AppstoreOutlined style={{ marginRight: 8 }} />Projects</span>,
      children: <Projects />
    },
    {
      key: "3",
      label: <span><BookOutlined style={{ marginRight: 8 }} />Blog</span>,
      children: <Blog />
    }
  ];

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
            <About />
            <Tabs activeKey={activeKey} onChange={handleTabChange} centered items={tabItems} />
          </div>
        </Content>
      </Layout>
    </div>
  );
};

// Wrapper to handle location and navigation context
const MainLayoutWrapper: React.FC = () => {
  const location = useLocation();
  
  // Check if the URL has a tab parameter
  const queryParams = new URLSearchParams(location.search);
  const tabParam = queryParams.get('tab');
  
  // Map URL parameter to tab key
  let defaultTab = "1"; // Default to Home tab
  if (tabParam === 'projects') {
    defaultTab = "2";
  } else if (tabParam === 'blog') {
    defaultTab = "3";
  }
  
  return <MainLayout defaultTab={defaultTab} />;
};

const App: React.FC = () => {
  const basename = getPublicPath();
  
  return (
    <Router basename={basename}>
      <Routes>
        <Route path="/" element={<MainLayoutWrapper />} />
        <Route path="/project/:id" element={<ProjectPage />} />
      </Routes>
    </Router>
  );
};

export default App;
