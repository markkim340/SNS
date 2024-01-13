import { addDoc, collection, updateDoc } from 'firebase/firestore';
import { useState } from 'react';
import styled from 'styled-components';
import { auth, db, storage } from '../firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const TextArea = styled.textarea`
  border: 2px solid #b4b4b4;
  padding: 20px;
  border-radius: 20px;
  font-size: 16px;
  color: black;
  background-color: #f0f0f0;
  width: 100%;
  resize: none;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  &::placeholder {
    font-size: 16px;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue',
      sans-serif;
  }
  &:focus,
  &:hover {
    outline: none;
    border-color: #ffbe98;
  }
`;

const AttachFileButton = styled.label`
  padding: 10px 0px;
  color: #ffbe98;
  font-weight: 700;
  text-align: center;
  border-radius: 20px;
  border: 2px solid #ffbe98;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
`;

const AttachFileInput = styled.input`
  display: none;
`;

const SubmitButton = styled.input`
  background-color: #ffbe98;
  color: white;
  border: none;
  border-radius: 20px;
  padding: 10px 0px;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  &:hover,
  &:active {
    opacity: 0.9;
  }
`;

export default function PostForm() {
  const [isLoading, setLoading] = useState(false);
  const [content, setContenet] = useState('');
  const [file, setFile] = useState<File | null>(null);

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContenet(e.target.value);
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files && files.length === 1) {
      // 10MB File Size Limit
      if (files[0].size > 10 * 1024 * 1024) {
        alert('File size should be less than 10MB');
        return;
      }
      setFile(files[0]);
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const user = auth.currentUser;
    if (!user || isLoading || content === '' || content.length > 180) return;

    try {
      setLoading(true);
      const doc = await addDoc(collection(db, 'posts'), {
        userId: user.uid,
        username: user.displayName || 'Anonymous',
        content,
        createdAt: Date.now(),
      });

      if (file) {
        const locationRef = ref(storage, `posts/${user.email}/${doc.id}`);
        const result = await uploadBytes(locationRef, file);
        const url = await getDownloadURL(result.ref);

        await updateDoc(doc, {
          image: url,
        });
      }

      setContenet('');
      setFile(null);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form onSubmit={onSubmit}>
      <TextArea onChange={onChange} value={content} placeholder="what is happening?" rows={5} maxLength={180} />
      <AttachFileButton htmlFor="file">{file ? 'Image added ✅' : '+ Add Image'}</AttachFileButton>
      <AttachFileInput onChange={onFileChange} type="file" id="file" accept="image/*" />
      <SubmitButton type="submit" value={isLoading ? 'Posting...' : 'Post'} />
    </Form>
  );
}
