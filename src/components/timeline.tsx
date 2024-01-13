import { collection, getDocs, onSnapshot, orderBy, query } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { db } from '../firebase';
import Post from './post';

export interface IPost {
  id: string;
  uid: string;
  username: string;
  content: string;
  image?: string;
  createdAt: number;
}

const Wrapper = styled.div``;

export default function TimeLine() {
  const [posts, setPost] = useState<IPost[]>([]);
  const fetchPosts = async () => {
    const postsQuery = query(collection(db, 'posts'), orderBy('createdAt', 'desc'));
    // const snapshot = await getDocs(postsQuery);
    // const posts = snapshot.docs.map((doc) => {
    //   const { uid, username, content, image, createdAt } = doc.data();
    //   return {
    //     id: doc.id,
    //     uid,
    //     username,
    //     content,
    //     image,
    //     createdAt,
    //   };
    // });

    // Get Realtime Database
    await onSnapshot(postsQuery, (snapshot) => {
      const posts = snapshot.docs.map((doc) => {
        const { uid, username, content, image, createdAt } = doc.data();
        return {
          id: doc.id,
          uid,
          username,
          content,
          image,
          createdAt,
        };
      });
      setPost(posts);
    });
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <Wrapper>
      {posts.map((post) => (
        <Post key={post.id} {...post} />
      ))}
    </Wrapper>
  );
}
