import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MenuItem from './MenuItem';
import { Container, ToggleButton, Menu } from './styles';

class OverflowMenu extends Component {
  static propTypes = {
    toggleText: PropTypes.node.isRequired,
    children: PropTypes.node.isRequired,
    flipped: PropTypes.bool,
  };

  static defaultProps = {
    flipped: false,
  };

  state = {
    open: false,
  };

  container = React.createRef();

  componentDidMount = () => {
    window.addEventListener('click', this.handleWindowClick);
  };

  componentWillUnmount = () => {
    window.removeEventListener('click', this.handleWindowClick);
  };

  open = () => this.setState({ open: true });

  close = () => this.setState({ open: false });

  toggle = () => {
    const { open } = this.state;
    this.setState({ open: !open });
  };

  handleWindowClick = ({ target }) => {
    if (!this.container.current.contains(target)) {
      this.close();
    }
  };

  render = () => {
    const { toggleText, children, flipped } = this.props;
    const { open } = this.state;
    return (
      <Container ref={this.container} data-testid="overflow-menu">
        <ToggleButton open={open} onClick={this.toggle} data-testid="overflow-menu-toggle">
          {toggleText}
        </ToggleButton>
        {open && <Menu flipped={flipped}>{children}</Menu>}
      </Container>
    );
  };
}

export { OverflowMenu, MenuItem };
