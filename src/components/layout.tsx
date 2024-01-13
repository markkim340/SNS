import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

const Wrapper = styled.div``;

const Menu = styled.div``;

const MenuItem = styled.div`
  background-color: white;
`;

export default function Layout() {
  return (
    <Wrapper>
      <Menu>
        <MenuItem>
          <img src="/user-icon.svg" alt="" />
        </MenuItem>
        <MenuItem></MenuItem>
        <MenuItem></MenuItem>
      </Menu>
      <Outlet />
    </Wrapper>
  );
}
