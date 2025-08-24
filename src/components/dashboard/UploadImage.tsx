import React, { useState } from 'react';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { Upload, message } from 'antd';
import type { UploadProps } from 'antd';

type FileType =
  NonNullable<UploadProps['beforeUpload']> extends (file: infer F) => unknown
    ? F
    : never;

/* ---------- util ---------- */
const getBase64 = (file: FileType) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

const beforeUpload: UploadProps['beforeUpload'] = (file) => {
  const isJpgOrPng = /image\/(jpeg|png)/.test(file.type);
  if (!isJpgOrPng) message.error('Only JPG/PNG files!');
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) message.error('Image must be smaller than 2 MB!');
  return isJpgOrPng && isLt2M;
};

/* ---------- component ---------- */
interface UploadImageProps {
  onUploaded?: (previewUrl: string, file: FileType) => void;
}

const UploadImage: React.FC<UploadImageProps> = ({ onUploaded }) => {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();

  const handleCustomRequest: UploadProps['customRequest'] = async (options) => {
    const { file, onSuccess, onError } = options;

    try {
      setLoading(true);
      const preview = await getBase64(file as FileType);
      setImageUrl(preview);
      onUploaded?.(preview, file as FileType);
      onSuccess?.('ok');
    } catch (error) {
      message.error('Preview generation failed');
      onError?.(error as any);
    } finally {
      setLoading(false);
    }
  };

  const uploadButton = (
    <button type='button' style={{ border: 0, background: 'none' }}>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );

  return (
    <Upload
      name='avatar'
      listType='picture-card'
      showUploadList={false}
      beforeUpload={beforeUpload}
      customRequest={handleCustomRequest} // 🔥 Muhim qism
    >
      {imageUrl ? (
        <img src={imageUrl} alt='avatar' style={{ width: '100%' }} />
      ) : (
        uploadButton
      )}
    </Upload>
  );
};

export default UploadImage;
