import { Link, Outlet, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { auth } from '../firebase';

const Wrapper = styled.div`
  display: grid;
  gap: 20px;
  grid-template-columns: 1fr 4fr;
  padding: 50px 30px;
  width: 100%;
  height: 100%;
  max-width: 860px;
`;

const Menu = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

const MenuItem = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid white;
  height: 50px;
  width: 50px;
  border-radius: 50%;
  background-color: white;
  img {
    width: 30px;
    height: 30px;
  }
  &.log-out {
    border-color: #ffbe98;
    background-color: #ffbe98;
  }
  &:hover {
    opacity: 0.75;
  }
`;

export default function Layout() {
  const navigate = useNavigate();
  const onLogOut = async () => {
    const ok = confirm('Are you sure you want to log out?');
    if (ok) {
      await auth.signOut();
      navigate('/login');
    }
  };

  return (
    <Wrapper>
      <Menu>
        <Link to="/">
          <MenuItem>
            <img src="/home-icon.svg" alt="" />
          </MenuItem>
        </Link>
        <Link to="/profile">
          <MenuItem>
            <img src="/user-icon.svg" alt="" />
          </MenuItem>
        </Link>
        <MenuItem onClick={onLogOut} className="log-out">
          <img src="/arrow-left-icon.svg" alt="" />
        </MenuItem>
      </Menu>
      <Outlet />
    </Wrapper>
  );
}
