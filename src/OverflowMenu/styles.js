import styled from 'styled-components';
import { cyan, gray, rgba } from '@carbon/colors';

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
  color: ${cyan[30]};
  cursor: pointer;
  padding: 0.4em 0.5em;
  display: inline-block;
  text-align: left;

  :focus {
    outline: 2px solid currentColor;
    outline-offset: -3px;
  }
  ::-moz-focus-inner {
    border: none;
  }
`;

export const ToggleButton = styled(ButtonReset)`
  &,
  :hover {
    background-color: ${({ open }) => (open ? gray[80] : gray[90])};
  }
`;

export const MenuButton = styled(ButtonReset)`
  padding: 0.8em;
  :hover {
    background-color: ${gray[90]};
  }
`;

export const Menu = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  top: 100%;
  left: ${({ flipped }) => (flipped ? 'unset' : 0)};
  right: ${({ flipped }) => (flipped ? 0 : 'unset')};
  background-color: ${gray[80]};
  min-width: 15em;
  box-shadow: 0 5px 1em ${rgba(gray[100], 0.3)};
  max-height: 9em;
  overflow: auto;
`;
