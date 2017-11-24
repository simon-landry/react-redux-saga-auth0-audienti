/**
 * This is a smart table component which supports pagination, filtering, sorting, and actions
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Row,
  Col,
} from 'reactstrap';

import { perPage } from 'constants/page';
import Pagination from 'components/Pagination';

class SmartItemGroup extends Component {
  static propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape()),
    ItemComponent: PropTypes.oneOfType([PropTypes.shape(), PropTypes.func]).isRequired,
    total: PropTypes.number,
    onPageChange: PropTypes.func.isRequired,
    ghost: PropTypes.bool.isRequired,
  };

  static defaultProps = {
    data: [],
    total: 0,
  }

  render() {
    const { total, onPageChange, ItemComponent, ghost } = this.props;
    const data = ghost ? new Array(perPage).fill({}) : this.props.data;
    return (
      <div>
        <Row>
          {
            data.map((item, index) => (
              <Col xs="12" sm="6" md="4" key={index}>
                <ItemComponent data={item} />
              </Col>
            ))
          }
        </Row>
        <Pagination
          pageCount={Math.ceil(total / perPage)}
          onChange={onPageChange}
        />
      </div>
    );
  }
}

export default SmartItemGroup;
