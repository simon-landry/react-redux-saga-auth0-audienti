import React, { Component } from 'react';
import { injectIntl as injectReactIntl } from 'react-intl';

function getDisplayName(Component) {
  return Component.displayName || Component.name;
}

export const injectIntl = (WrappedComponent, test = false) => {
  class InjectIntl extends Component {
    static displayName = `InjectIntl(${getDisplayName(WrappedComponent)})`;

    // For now we only define formatMessage but will add others according to the requirements.
    formatMessage = (id, values) => this.props.intl.formatMessage({ id, defaultMessage: id }, values);

    render() {
      return (
        <WrappedComponent
          {...this.props}
          formatMessage={this.formatMessage}
        />
      );
    }
  }
  return test ? InjectIntl : injectReactIntl(InjectIntl);
};
