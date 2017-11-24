import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';

import { injectIntl } from 'components/Intl';
import BreadcrumbMenu from 'components/BreadcrumbMenu';
import HeaderTitle from 'components/HeaderTitle';
import ButtonLink from 'components/ButtonLink';
import SmartItemGroup from 'components/SmartItemGroup';
import { listSegments } from 'redux/segment/actions';
import { selectState } from 'redux/selectors';

import SegmentCard from './components/SegmentCard';

export class SegmentsList extends Component {
  static propTypes = {
    formatMessage: PropTypes.func.isRequired,
    segments: ImmutablePropTypes.listOf(
      ImmutablePropTypes.mapContains({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      }),
    ).isRequired,
    match: PropTypes.shape({
      params: PropTypes.shape({
        projectId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      }),
    }).isRequired,
    segmentsRequesting: PropTypes.bool.isRequired,
    segmentsMeta: ImmutablePropTypes.mapContains({
      total: PropTypes.number,
    }).isRequired,
    project: ImmutablePropTypes.mapContains({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    }).isRequired,
    listSegments: PropTypes.func.isRequired,
  };

  state = { pageIndex: 1 };

  componentWillMount() {
    this.load();
  }

  load = () => {
    const { listSegments, match: { params: { projectId } } } = this.props;
    const { pageIndex } = this.state;
    listSegments(projectId, { 'page[number]': pageIndex });
  }

  loadPage = (index) => {
    const { listSegments, match: { params: { projectId } } } = this.props;
    this.setState({ pageIndex: index });
    listSegments(projectId, { 'page[number]': index });
  }

  render() {
    const {
      formatMessage,
      project,
      segmentsRequesting,
      segmentsMeta,
      segments,
      match: { params: { projectId } },
    } = this.props;
    const segmentsCount = formatMessage('{count} {count, plural, one {segment} other {segments}}', { count: segmentsMeta.get('total') });
    const ItemComponent = props =>
      <SegmentCard {...props} projectId={projectId} ghost={segmentsRequesting} />;
    return (
      <div className="animated fadeIn">
        <Helmet
          title={formatMessage('Segments')}
          meta={[
            { name: 'description', content: formatMessage('This is a page to list all segments.') },
          ]}
        />
        <BreadcrumbMenu>
          {!segmentsRequesting && (
            <ButtonLink className="no-border" handleClick={this.load}>
              {segmentsCount}
            </ButtonLink>)}
          <ButtonLink className="no-border" to={`/projects/${projectId}/segments/new`} icon="fa fa-plus">
            {formatMessage('Add Segments(s)')}
          </ButtonLink>
        </BreadcrumbMenu>
        <HeaderTitle>
          {formatMessage(
            'All Segments of Project {projectName}',
            { projectName: project.getIn(['attributes', 'name']) || '--' },
          )}
        </HeaderTitle>
        <SmartItemGroup
          data={segments.toJS()}
          ItemComponent={ItemComponent}
          total={segmentsMeta.get('total')}
          onPageChange={this.loadPage}
          ghost={segmentsRequesting}
          checkable
        />
      </div>
    );
  }
}

/* istanbul ignore next */
const mapStateToProps = state => ({
  ...selectState('project', 'project')(state, 'project'),
  ...selectState('segment', 'segments')(state, 'segments'),
});

/* istanbul ignore next */
const mapDispatchToProps = dispatch => ({
  listSegments: (projectId, query) => dispatch(listSegments(projectId, query)),
});

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(SegmentsList));
