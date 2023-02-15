import React from "react";
import { useState, useEffect } from 'react';
import { Button} from 'antd';
import { FileTextOutlined } from '@ant-design/icons';

const AnnouncementForm = () => {
    return (
        // <p>Announcement Form</p>
    <Button
        className="floatPost"
      icon={<FileTextOutlined />}
      description="Create Post"
      shape="square"

      
    />
    )
};
export default AnnouncementForm;