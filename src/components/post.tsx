import styled from 'styled-components';
import { IPost } from './timeline';

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr;
  padding: 20px;
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

export default function Post({ username, content, image }: IPost) {
  return (
    <Wrapper>
      <Column>
        <Username>{username}</Username>
        <Payload>{content}</Payload>
      </Column>
      {image ? (
        <Column>
          <Photo src={image} />
        </Column>
      ) : null}
    </Wrapper>
  );
}