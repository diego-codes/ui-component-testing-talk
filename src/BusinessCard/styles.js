import styled from 'styled-components';
import { gray, green } from '@carbon/colors';

export const Container = styled.div`
  font-family: 'IBM Plex Sans';
  font-size: 0.875rem;
  line-height: 1.2;
  background-color: ${gray[10]};
  color: ${gray[90]};
  max-width: 32em;
`;

export const ContactInfo = styled.div`
  padding: 2em;
  display: flex;
  align-items: center;
`;

export const HeadShot = styled.div`
  width: 5em;
  height: 5em;
  display: inline-block;
  background-image: url(${props => props.image});
  background-size: cover;
  background-position: center;
  background-repeat: none;
  border-radius: 4px;
  margin-right: 1em;
`;

export const FullName = styled.h1`
  font-size: 2em;
  font-weight: 600;
  letter-spacing: -0.03em;
  margin: 0;
  margin-bottom: 0.1em;
`;

export const Subtitle = styled.h2`
  margin: 0;
  font-size: 1em;
  font-weight: 400;
  color: #3d3d3d;
`;

export const Footer = styled.footer`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${gray[90]};
  font-size: 0.9em;
  height: 2em;
  color: ${gray[10]};
`;

export const OnlineStatus = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 0 2em;

  &:before {
    content: '';
    display: inline-block;
    height: 0.5em;
    width: 0.5em;
    border-radius: 100%;
    background-color: ${props => (props.online ? green[30] : 'transparent')};
    box-shadow: inset 0 0 0 1px ${props => (props.online ? 'transparent' : 'currentColor')};
    margin-right: 0.4em;
  }
`;
