import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';

export default function Home() {
  const navigate = useNavigate();
  const logOut = async () => {
    const ok = confirm('Are you sure you want to log out?');
    if (ok) {
      await auth.signOut();
      navigate('/login');
    }
  };

  return (
    <h1>
      <button onClick={logOut}>Log Out</button>
    </h1>
  );
}
