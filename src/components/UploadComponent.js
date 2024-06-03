import { useState, useCallback } from 'react';
import axios from 'axios';
import Image from 'next/image';
import { BiImageAlt } from 'react-icons/bi';
import toast from 'react-hot-toast';

export default function UploadComponent() {
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const handleInputChangeFile = useCallback(async (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      toast.loading('Uploading...', { id: 'upload' });
      const response = await axios.post('/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      toast.success('Upload complete', { id: 'upload' });
      setImageUrl(response.data.url);
    } catch (error) {
      toast.error('Upload failed', { id: 'upload' });
      console.error(error);
    }
  }, []);

  const handleSelectImage = useCallback(() => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.addEventListener('change', handleInputChangeFile);
    input.click();
  }, [handleInputChangeFile]);

  return (
    <div>
      <textarea
        rows={3}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="What's happening?"
        className="w-full bg-transparent text-xl px-3 border-b border-slate-700"
      />
      {imageUrl && (
        <Image src={imageUrl} alt="Uploaded Image" height={300} width={300} />
      )}
      <div className="mt-2 flex justify-between items-center">
        <BiImageAlt className="text-xl cursor-pointer" onClick={handleSelectImage} />
        <button
          className="bg-[#1d9bf0] py-2 px-4 rounded-full text-sm"
          onClick={() => {
            // handleCreateTweet logic here
          }}
        >
          Tweet
        </button>
      </div>
    </div>
  );
}
