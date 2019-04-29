import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  display: inline;
`;

export const ButtonReset = styled.button`
  appearance: none;
  background-color: transparent;
  border: 0;
  font: inherit;
  line-height: inherit;
  color: #6ccaff;
  cursor: pointer;
  padding: 0.4em 0.5em;
  display: inline-block;
  text-align: left;
`;

export const ToggleButton = styled(ButtonReset)`
  &,
  :hover {
    background-color: ${({ open }) => (open ? '#565656' : '#3D3D3D')};
  }
`;

export const MenuButton = styled(ButtonReset)`
  padding: 0.8em;
  :hover {
    background-color: #3f3f3f;
  }
`;

export const Menu = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  top: 100%;
  left: ${({ flipped }) => (flipped ? 'unset' : 0)};
  right: ${({ flipped }) => (flipped ? 0 : 'unset')};
  background-color: #565656;
  min-width: 15em;
  box-shadow: 0 4px 1em rgba(0, 0, 0, 0.2);
`;
