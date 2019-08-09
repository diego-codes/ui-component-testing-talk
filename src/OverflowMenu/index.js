import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MenuItem from './MenuItem';
import { Container, ToggleButton, Menu } from './styles';

class OverflowMenu extends Component {
  static propTypes = {
    toggleText: PropTypes.node.isRequired,
    children: PropTypes.node.isRequired,
    flipped: PropTypes.bool,
    onOpen: PropTypes.func,
    onClose: PropTypes.func,
  };

  static defaultProps = {
    flipped: false,
    onOpen: () => {},
    onClose: () => {},
  };

  state = {
    open: false,
  };

  componentWillUnmount = () => {
    document.removeEventListener('click', this.handleDocumentClick);
  };

  open = () => {
    const { onOpen } = this.props;
    document.addEventListener('click', this.handleDocumentClick);
    this.setState({ open: true });
    onOpen();
  };

  close = () => {
    const { onClose } = this.props;
    document.removeEventListener('click', this.handleDocumentClick);
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

  handleDocumentClick = () => {
    this.close();
  };

  render = () => {
    const { toggleText, children, flipped } = this.props;
    const { open } = this.state;

    return (
      <Container>
        <ToggleButton open={open} onClick={this.toggle}>
          {toggleText}
        </ToggleButton>
        {open && <Menu flipped={flipped}>{children}</Menu>}
      </Container>
    );
  };
}

export { OverflowMenu, MenuItem };
