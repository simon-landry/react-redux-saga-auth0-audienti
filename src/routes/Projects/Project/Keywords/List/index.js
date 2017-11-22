import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';

import { injectIntl } from 'components/Intl';
import { selectState, getRequestingSelector } from 'redux/selectors';
import { listKeywords, createKeywords } from 'redux/keyword/actions';
import { createNegativeKeywords } from 'redux/negative_keyword/actions';
import BreadcrumbMenu from 'components/BreadcrumbMenu';
import LoadingIndicator from 'components/LoadingIndicator';
import ButtonLink from 'components/ButtonLink';
import HeaderTitle from 'components/HeaderTitle';
import SmartTable from 'components/SmartTable';

import AddKeywordsModal from './components/AddKeywordsModal';

export class KeywordsList extends Component {
  static propTypes = {
    formatMessage: PropTypes.func.isRequired,
    keywords: ImmutablePropTypes.listOf(
      ImmutablePropTypes.mapContains({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      }),
    ).isRequired,
    match: PropTypes.shape({
      params: PropTypes.shape({
        projectId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      }),
    }).isRequired,
    keywordsRequesting: PropTypes.bool.isRequired,
    keywordsMeta: ImmutablePropTypes.mapContains({
      total: PropTypes.number,
    }).isRequired,
    project: ImmutablePropTypes.mapContains({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    }).isRequired,
    listKeywords: PropTypes.func.isRequired,
    createKeywords: PropTypes.func.isRequired,
    createNegativeKeywords: PropTypes.func.isRequired,
    createKeywordsRequesting: PropTypes.bool.isRequired,
  };

  state = { createModal: false, pageIndex: 1, tags: [] };

  componentWillMount() {
    this.load();
  }

  componentWillReceiveProps({ createKeywordsRequesting }) {
    if (!createKeywordsRequesting && this.props.createKeywordsRequesting) {
      this.load();
    }
  }

  onAddTags = (checks) => {
    const { keywords } = this.props;
    console.log(keywords, checks);
  }

  load = () => {
    const { listKeywords, match: { params: { projectId } } } = this.props;
    const { tags, pageIndex } = this.state;
    listKeywords(projectId, { 'page[number]': pageIndex, tags });
  }

  toggleCreateModal = () => this.setState({ createModal: !this.state.createModal })

  loadPage = (index) => {
    const { listKeywords, match: { params: { projectId } } } = this.props;
    this.setState({ pageIndex: index });
    listKeywords(projectId, { 'page[number]': index, tags: this.state.tags });
  }

  loadByTag = (tags) => {
    const { listKeywords, match: { params: { projectId } } } = this.props;
    this.setState({ tags });
    listKeywords(projectId, { 'page[number]': this.state.pageIndex, tags });
  }

  render() {
    const {
      formatMessage,
      keywords,
      keywordsRequesting,
      keywordsMeta,
      project,
      createKeywords,
      createNegativeKeywords,
      match: { params: { projectId } },
    } = this.props;
    const { createModal } = this.state;
    const keywordsCount = formatMessage('{count} {count, plural, one {keyword} other {keywords}}', { count: keywordsMeta.get('total') });
    const renderLoading = keywordsRequesting ? () => <LoadingIndicator size="small" /> : null;

    return (
      <div className="animated fadeIn">
        <Helmet
          title={formatMessage('Keywords')}
          meta={[
            { name: 'description', content: formatMessage('This is a page to list all keywords.') },
          ]}
        />
        <BreadcrumbMenu>
          {!keywordsRequesting && (
            <ButtonLink className="no-border" handleClick={this.load}>
              {keywordsCount}
            </ButtonLink>)}
          <ButtonLink className="no-border" handleClick={this.toggleCreateModal} icon="fa fa-plus">
            {formatMessage('Add Keyword(s)')}
          </ButtonLink>
        </BreadcrumbMenu>
        <HeaderTitle>
          {formatMessage(
            'All Keywords of Project {projectName}',
            { projectName: project.getIn(['attributes', 'name']) || '--' },
          )}
        </HeaderTitle>
        <AddKeywordsModal
          isOpen={createModal}
          toggle={this.toggleCreateModal}
          className="primary"
          onAddKeywords={payload => createKeywords(projectId, payload)}
          onAddNegativeKeywords={payload => createNegativeKeywords(projectId, payload)}
        />
        <SmartTable
          data={keywordsRequesting ? new Array(1).fill({}) : keywords.toJS()}
          fields={[
            {
              label: formatMessage('Keyword'),
              name: 'attributes.name',
              render: renderLoading || ((value, row) => (
                <Link to={`/projects/${projectId}/keywords/${row.id}`}>{value}</Link>
              )),
            },
            {
              label: formatMessage('Tags'),
              name: 'attributes.tags',
              render: renderLoading || (value => value.map((tag, index) => (
                <Button
                  color="primary"
                  size="sm"
                  style={{ marginRight: 5, marginBottom: 5 }}
                  onClick={() => this.loadByTag([tag])}
                  key={index}
                >
                  {tag}
                </Button>
              ))),
            },
          ]}
          actions={[
            { icon: 'plus-square', label: formatMessage('Add Tags'), onClick: this.onAddTags },
          ]}
          onPageChange={this.loadPage}
          total={keywordsMeta.get('total')}
          checkable
        />
      </div>
    );
  }
}

/* istanbul ignore next */
const mapStateToProps = state => ({
  ...selectState('project', 'project')(state, 'project'),
  ...selectState('keyword', 'keywords')(state, 'keywords'),
  createKeywordsRequesting: getRequestingSelector('keyword', 'createKeywords')(state, 'createKeywords'),
});

/* istanbul ignore next */
const mapDispatchToProps = dispatch => ({
  listKeywords: (projectId, query) => dispatch(listKeywords(projectId, query)),
  createKeywords: (projectId, payload) => dispatch(createKeywords(projectId, payload)),
  createNegativeKeywords: (projectId, payload) =>
    dispatch(createNegativeKeywords(projectId, payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(KeywordsList));
