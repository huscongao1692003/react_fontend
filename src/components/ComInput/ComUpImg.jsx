import React, { useState } from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { Button, Upload ,message } from 'antd';

const ComUpImg = ({onChange}) => {
  const [fileList, setFileList] = useState([]);

  const isImageFile = (file) => {
    const acceptedFormats = ['.jpg', '.jpeg', '.png', '.gif'];
    const fileExtension = file.name.toLowerCase().slice(-4); 
    if (!acceptedFormats.includes(fileExtension)) {
        message.error('Chỉ cho phép chọn các tệp hình ảnh.');
        return false; 
      }
      return true;
  };

  const handleFileChange = ({ fileList }) => {

    const filteredFileList = fileList.filter((file) => isImageFile(file));
    setFileList(filteredFileList);
    onChange(filteredFileList)
  };

  return (
    <>
      <Upload
        fileList={fileList}
        onChange={handleFileChange}
        beforeUpload={() => false} 
        accept=".jpg,.jpeg,.png,.gif" 
        multiple={true} 
      >
        <Button icon={<UploadOutlined />}>Tải hình ảnh</Button>
      </Upload>
    </>
  );
};

export default ComUpImg;
