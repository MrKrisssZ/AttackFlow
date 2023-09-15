import React from 'react';
import ReportUploadForm from '../components/ReportForm';
import FileUpload from '../components/FileUpload.js'; // 根据文件路径进行调整

const Annotation = () => {
    return (
        <>
            {/* <h1>Annotation</h1> */}
            <ReportUploadForm />
            
            {/* 这里添加文件上传组件 */}
            <FileUpload />
        </>
    );
}

export default Annotation;
