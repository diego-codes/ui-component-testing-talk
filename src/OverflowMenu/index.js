import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MenuItem from './MenuItem';
import { Container, ToggleButton, Menu, Icon } from './styles';

class OverflowMenu extends Component {
  static propTypes = {
    toggleText: PropTypes.node.isRequired,
    children: PropTypes.node.isRequired,
    flipped: PropTypes.bool,
    compact: PropTypes.bool,
    open: PropTypes.bool,
    onOpen: PropTypes.func,
    onClose: PropTypes.func,
  };

  static defaultProps = {
    flipped: false,
    compact: false,
    open: false,
    onOpen: () => {},
    onClose: () => {},
  };

  state = {
    // eslint-disable-next-line react/destructuring-assignment
    open: this.props.open,
  };

  container = React.createRef();

  componentDidMount = () => {
    document.addEventListener('click', this.handleWindowClick);
  };

  componentWillUnmount = () => {
    document.removeEventListener('click', this.handleWindowClick);
  };

  open = () => {
    const { onOpen } = this.props;
    this.setState({ open: true });
    onOpen();
  };

  close = () => {
    const { onClose } = this.props;
    this.setState({ open: false });
    onClose();
  };

  toggle = () => {
    const { open } = this.state;
    if (open) {
      this.close();
    } else {
      this.open();
    }
  };

  handleWindowClick = ({ target }) => {
    if (!this.container.current.contains(target)) {
      this.close();
    }
  };

  getCompactIcon = () => {
    const { toggleText } = this.props;

    return (
      <Icon
        width="30"
        height="8"
        xmlns="http://www.w3.org/2000/svg"
        data-testid="overflow-toggle-icon"
        aria-label={toggleText}
      >
        <title>{toggleText}</title>
        <circle cx="4" cy="4" r="3" />
        <circle cx="15" cy="4" r="3" />
        <circle cx="26" cy="4" r="3" />
      </Icon>
    );
  };

  render = () => {
    const { toggleText, children, flipped, compact } = this.props;
    const { open } = this.state;
    return (
      <Container ref={this.container}>
        <ToggleButton open={open} onClick={this.toggle} data-testid="overflow-toggle">
          {compact ? this.getCompactIcon() : toggleText}
        </ToggleButton>
        {open && (
          <Menu data-testid="overflow-menu" flipped={flipped}>
            {children}
          </Menu>
        )}
      </Container>
    );
  };
}

export { OverflowMenu, MenuItem };
