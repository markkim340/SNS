import styled from 'styled-components';
import { auth, db, storage } from '../firebase';
import { useEffect, useState } from 'react';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { updateProfile } from 'firebase/auth';
import { collection, getDocs, limit, orderBy, query, where } from 'firebase/firestore';
import { IPost } from '../components/timeline';
import Post from '../components/post';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 20px;
`;

const AvatarUpload = styled.label`
  width: 80px;
  height: 80px;
  overflow: hidden;
  border-radius: 50%;
  background-color: #dedede;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const AvatarImg = styled.img`
  width: 100%;
`;

const AvatarInput = styled.input`
  display: none;
`;

const Name = styled.span`
  font-size: 20px;
`;

const Posts = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 10px;
`;

export default function Profile() {
  const user = auth.currentUser;
  const [avatar, setAvatar] = useState(user?.photoURL);
  const [posts, setPosts] = useState<IPost[]>([]);

  const onAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (!user) return;
    if (files && files.length === 1) {
      const file = files[0];

      const locationRef = ref(storage, `avatars/${user?.uid}`);
      const result = await uploadBytes(locationRef, file);
      const avatarURL = await getDownloadURL(result.ref);

      setAvatar(avatarURL);
      await updateProfile(user, { photoURL: avatarURL });
    }
  };

  const fetchPosts = async () => {
    const postQuery = query(collection(db, 'posts'), where('userId', '==', user?.uid), orderBy('createdAt', 'desc'), limit(25));
    const snapshot = await getDocs(postQuery);
    const posts = snapshot.docs.map((doc) => {
      const { username, content, userId, image, createdAt } = doc.data();

      return {
        id: doc.id,
        userId,
        username,
        content,
        image,
        createdAt,
      };
    });

    setPosts(posts);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <Wrapper>
      <AvatarUpload htmlFor="avatar">{Boolean(avatar) ? <AvatarImg src={avatar} /> : <img src="/user-icon.svg"></img>}</AvatarUpload>
      <AvatarInput id="avatar" onChange={onAvatarChange} type="file" accept="image/*" />
      <Name>{user?.displayName ?? 'Anonymous'}</Name>
      <Posts>
        {posts.map((post) => (
          <Post key={post.id} {...post} />
        ))}
      </Posts>
    </Wrapper>
  );
}
