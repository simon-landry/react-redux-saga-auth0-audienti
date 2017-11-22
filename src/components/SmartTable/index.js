/**
 * This is a smart table component which supports pagination, filtering, sorting, and actions
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import {
  Card,
  CardHeader,
  Input,
  Table,
  Label,
} from 'reactstrap';
import { Link } from 'react-router-dom';

import { perPage } from 'constants/page';
import Pagination from 'components/Pagination';

const defaultRender = data => data;

class SmartTable extends Component {
  static propTypes = {
    fields: PropTypes.arrayOf(PropTypes.shape({
      label: PropTypes.string,
      name: PropTypes.string,
      sort: PropTypes.bool,
      filter: PropTypes.func,
      render: PropTypes.func,
    })).isRequired,
    actions: PropTypes.arrayOf(PropTypes.shape({
      label: PropTypes.string,
      onClick: PropTypes.func,
      icon: PropTypes.string,
    })),
    data: PropTypes.arrayOf(PropTypes.shape()),
    total: PropTypes.number,
    checkable: PropTypes.bool,
    onPageChange: PropTypes.func.isRequired,
  };

  static defaultProps = {
    data: [],
    actions: [],
    total: 0,
    checkable: false,
  }

  state = { checks: [] };

  checkRow = (rowId) => {
    const { checks } = this.state;
    const checkIndex = checks.indexOf(rowId);
    if (checkIndex === -1) {
      this.setState({ checks: checks.concat([rowId]) });
      return;
    }
    const newChecks = checks.slice();
    newChecks.splice(checkIndex, 1);
    this.setState({ checks: newChecks });
  }

  checkAll = () => {
    const { checks } = this.state;
    if (checks.indexOf('all') === -1) {
      this.setState({ checks: ['all'] });
      return;
    }
    this.setState({ checks: [] });
  }

  render() {
    const { fields, data, checkable, total, actions, onPageChange } = this.props;
    const { checks } = this.state;
    const halfChecked = (checks[0] === 'all' && checks.length > 1) || (checks[0] !== 'all' && checks.length);
    return (
      <Card className="smarttable">
        {actions && actions.length && (
          <CardHeader>
            {
              actions.map((action, index) => (
                <Link key={index} to="#" onClick={(e) => { e.preventDefault(); action.onClick(checks); }}>
                  {action.icon && <i className={`fa fa-${action.icon}`} />}
                  {action.label}
                </Link>
              ))
            }
          </CardHeader>
        )}
        <Table responsive>
          <thead>
            <tr>
              {checkable && (
                <th>
                  <Label className={`switch switch-sm switch-default switch-${halfChecked ? 'info' : 'primary'}`}>
                    <Input
                      type="checkbox"
                      className="switch-input"
                      checked={!!checks.length}
                      onChange={this.checkAll}
                    />
                    <span className="switch-label" />
                    <span className="switch-handle" />
                  </Label>
                </th>
              )}
              {fields.map((field, index) => (
                <th key={index}>{field.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {
              data.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {checkable && (
                    <td>
                      <Label className="switch switch-sm switch-default switch-primary">
                        <Input
                          type="checkbox"
                          className="switch-input"
                          checked={(checks.indexOf(row.id) + 0.5) * (checks.indexOf('all') + 0.5) < 0}
                          onChange={() => this.checkRow(row.id)}
                        />
                        <span className="switch-label" />
                        <span className="switch-handle" />
                      </Label>
                    </td>
                  )}
                  {
                    fields.map((field, index) => (
                      <td key={index}>{(field.render || defaultRender)(get(row, field.name), row) || '-'}</td>
                    ))
                  }
                </tr>
              ))
            }
          </tbody>
        </Table>
        <Pagination
          pageCount={Math.ceil(total / perPage)}
          onChange={onPageChange}
        />
      </Card>
    );
  }
}

export default SmartTable;
