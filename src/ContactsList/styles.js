import styled from 'styled-components';

export const Title = styled.h1`
  font-weight: 600;
`;

export const ContactsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(25em, 1fr));
  justify-content: start;
  grid-gap: 1.5em;
`;

export const ContactWrapper = styled.div`
  flex: 1 0 40em;
`;
