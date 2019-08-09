import styled from 'styled-components';
import { gray, green } from '@carbon/colors';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${gray[10]};
  color: ${gray[90]};
`;

export const ContactInfo = styled.div`
  padding: 2em;
  flex: auto;
  display: flex;
  align-items: center;
`;

export const ContactInfoWrapper = styled.div`
  flex: auto;
`;

export const Avatar = styled.div`
  width: 5em;
  height: 5em;
  flex: 0 0 5em;
  display: inline-block;
  background-size: cover;
  background-position: center;
  background-repeat: none;
  border-radius: 4px;
  margin-right: 1em;
`;

export const LoadingText = styled.div`
  height: 0.8em;
  width: 70%;
  margin-bottom: 0.3em;
  background-color: ${gray[20]};
  position: relative;
  overflow: hidden;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background-color: ${gray[30]};
    animation: loading-text 3s ease-in-out alternate-reverse infinite;
  }

  @keyframes loading-text {
    0% {
      transform: translateX(-100%);
    }
    100% {
      transform: translateX(100%);
    }
  }
`;

export const LoadingTitle = styled(LoadingText)`
  height: 2em;
  width: 80%;
  margin-bottom: 0.5em;
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
  min-height: 2em;
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
