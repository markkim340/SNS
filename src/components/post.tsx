import styled from 'styled-components';
import { IPost } from './timeline';
import { auth, db, storage } from '../firebase';
import { deleteDoc, doc } from 'firebase/firestore';
import { deleteObject, ref } from 'firebase/storage';
import { useState } from 'react';

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr;
  padding: 15px 20px;
  border: 1px solid #b4b4b4;
  border-radius: 15px;
`;

const Column = styled.div``;

const Username = styled.span`
  font-weight: 600;
  font-size: 15px;
`;

const Payload = styled.p`
  margin: 10px 0px;
  font-size: 18px;
`;

const Photo = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 15px;
`;

const DeleteButton = styled.button`
  background-color: #ffbe98;
  color: white;
  font-weight: 600;
  font-size: 12px;
  padding: 5px 10px;
  border: 0;
  border-radius: 5px;
  text-transform: uppercase;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
`;

export default function Post({ username, content, image, userId, id }: IPost) {
  const user = auth.currentUser;
  const [isLoading, setLoading] = useState(false);
  const onDelete = async () => {
    const ok = confirm('Are you sure you want to delete this post?');
    if (!ok || user?.uid !== userId) return;

    try {
      setLoading(true);
      await deleteDoc(doc(db, 'posts', id));
      if (image) {
        const imageRef = ref(storage, `posts/${user.email}/${id}`);
        await deleteObject(imageRef);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Wrapper>
      <Column>
        <Username>{username}</Username>
        <Payload>{content}</Payload>
        {user?.uid === userId ? <DeleteButton onClick={onDelete}>{isLoading ? 'Deleting...' : 'Delete'}</DeleteButton> : null}
      </Column>
      {image ? (
        <Column>
          <Photo src={image} />
        </Column>
      ) : null}
    </Wrapper>
  );
}
