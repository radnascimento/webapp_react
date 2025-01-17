import React, { useState, useEffect } from 'react';
import { Table, Spin, Typography, message, Card } from 'antd';
import MaterialService from '../services/MaterialService';

const { Title } = Typography;

const MaterialList = () => {
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);

  // Columns definition for Ant Design Table
  const columns = [
    {
      title: 'Material ID',
      dataIndex: 'idMaterial',
      key: 'idMaterial',
      responsive: ['md'], // Hide on small screens
    },
    {
      title: 'Topic ID',
      dataIndex: 'idTopic',
      key: 'idTopic',
      responsive: ['md'], // Hide on small screens
    },
    {
      title: 'Level ID',
      dataIndex: 'idLevel',
      key: 'idLevel',
      responsive: ['lg'], // Show only on larger screens
    },
    {
      title: 'URL',
      dataIndex: 'url',
      key: 'url',
      render: (text) => (
        <a href={text} target="_blank" rel="noopener noreferrer">
          {text}
        </a>
      ),
    },
  ];

  useEffect(() => {
    // Fetch materials when the component mounts
    MaterialService.getMaterials()
      .then((data) => {
        setMaterials(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('There was an error fetching materials!', error);
        message.error('Failed to fetch materials!');
        setLoading(false);
      });
  }, []);

  return (
    <div style={{ padding: '20px', maxWidth: '100%', margin: '0 auto' }}>
      <Card style={{ boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
        <Title level={3} style={{ textAlign: 'center', marginBottom: '20px' }}>
          Material List
        </Title>
        {loading ? (
          <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <Spin size="large" />
          </div>
        ) : (
          <Table
            columns={columns}
            dataSource={materials}
            rowKey="idMaterial"
            pagination={{ pageSize: 5, showSizeChanger: true }}
            scroll={{ x: 800 }} // Allow horizontal scrolling on small screens
          />
        )}
      </Card>
    </div>
  );
};

export default MaterialList;
