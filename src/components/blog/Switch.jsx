import React from 'react';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { Switch, Space } from 'antd';
const App = () => (
  <Space direction="vertical">
    <Switch checkedChildren="Grid" unCheckedChildren="List" defaultChecked />
    
  </Space>
);
export default App;