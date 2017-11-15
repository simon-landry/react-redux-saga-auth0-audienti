import { Component } from 'react';
import { connect } from 'react-redux';
import { setBreadcrumbMenu } from 'redux/ui/actions';

export class BreadcrumbMenu extends Component {
  componentWillMount() {
    const { children, setBreadcrumbMenu } = this.props;
    setBreadcrumbMenu(children);
  }
  render() {
    return null;
  }
}

/* istanbul ignore next */
const mapDispatchToProps = dispatch => ({
  setBreadcrumbMenu: node => dispatch(setBreadcrumbMenu(node)),
});

export default connect(undefined, mapDispatchToProps)(BreadcrumbMenu);
