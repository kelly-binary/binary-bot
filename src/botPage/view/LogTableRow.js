import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export default class LogRow extends PureComponent {
  static propTypes = {
    log: PropTypes.shape({
      id: PropTypes.number,
      timestamp: PropTypes.string,
      type: PropTypes.string,
      message: PropTypes.string,
    }).isRequired,
  };
  render() {
    return (
      <tr className={this.props.log.type}>
        <td>{this.props.log.timestamp}</td>
        <td>{this.props.log.type}</td>
        <td>{this.props.log.message}</td>
      </tr>
    );
  }
}
