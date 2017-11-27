import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
import { get } from 'lodash';

import { injectIntl } from 'components/Intl';
import { selectState, getRequestingSelector } from 'redux/selectors';
import { listKeywords, createKeywords, removeKeyword } from 'redux/keyword/actions';
import { listNegativeKeywords, createNegativeKeywords, removeNegativeKeyword } from 'redux/negative_keyword/actions';
import BreadcrumbMenu from 'components/BreadcrumbMenu';
import LoadingIndicator from 'components/LoadingIndicator';
import ButtonLink from 'components/ButtonLink';
import HeaderTitle from 'components/HeaderTitle';
import SmartTable from 'components/SmartTable';
import NotificationCard from 'components/NotificationCard';
import { perPage } from 'constants/page';

import AddKeywordsModal from './components/AddKeywordsModal';
import { setConfirmMessage } from '../../../../../redux/ui/actions';

export class KeywordsList extends Component {
  static propTypes = {
    formatMessage: PropTypes.func.isRequired,
    keywords: ImmutablePropTypes.listOf(
      ImmutablePropTypes.mapContains({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      }),
    ).isRequired,
    negativeKeywords: ImmutablePropTypes.listOf(
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
    negativeKeywordsRequesting: PropTypes.bool.isRequired,
    keywordsMeta: ImmutablePropTypes.mapContains({
      total: PropTypes.number,
    }).isRequired,
    negativeKeywordsMeta: ImmutablePropTypes.mapContains({
      total: PropTypes.number,
    }).isRequired,
    project: ImmutablePropTypes.mapContains({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    }).isRequired,
    listKeywords: PropTypes.func.isRequired,
    listNegativeKeywords: PropTypes.func.isRequired,
    createKeywords: PropTypes.func.isRequired,
    createNegativeKeywords: PropTypes.func.isRequired,
    setConfirmMessage: PropTypes.func.isRequired,
    removeKeyword: PropTypes.func.isRequired,
    removeNegativeKeyword: PropTypes.func.isRequired,
  };

  state = {
    createModal: false,
    pageIndex: 1,
    tags: [],
    addKeywords: '',
    negative: false,
    list: this.props.listKeywords,
    createRequesting: 'createKeywordsRequesting',
    removeRequesting: 'removeKeywordRequesting',
  };

  componentWillMount() {
    this.load();
  }

  componentWillReceiveProps(nextProps) {
    const { createRequesting, removeRequesting } = this.state;
    if (!nextProps[createRequesting] && this.props[createRequesting]) {
      this.load();
    } else if (!nextProps[removeRequesting] && this.props[removeRequesting]) {
      this.load();
    }
  }

  onAddTags = (checks) => {
    this.setState({
      createModal: true,
      addKeywords: checks.map(check => get(check, 'attributes.name') || '***').join('\n'),
    });
  }

  load = () => {
    const { match: { params: { projectId } } } = this.props;
    const { tags, pageIndex, list } = this.state;
    list(projectId, { 'page[number]': pageIndex, tags });
  }

  toggleCreateModal = () => this.setState({ createModal: !this.state.createModal, addKeywords: '' })

  toggleNegative = () => {
    const { listKeywords, listNegativeKeywords, match: { params: { projectId } } } = this.props;
    if (this.state.negative) {
      this.setState({
        negative: false,
        createRequesting: 'createKeywordsRequesting',
        removeRequesting: 'removeKeywordRequesting',
        list: listKeywords,
        tags: [],
        pageIndex: 1,
      });
      listKeywords(projectId, { 'page[number]': 1, tags: [] });
    } else {
      this.setState({
        negative: true,
        createRequesting: 'createNegativeKeywordsRequesting',
        removeRequesting: 'removeNegativeKeywordRequesting',
        list: listNegativeKeywords,
        tags: [],
        pageIndex: 1,
      });
      listNegativeKeywords(projectId, { 'page[number]': 1, tags: [] });
    }
  }

  loadPage = (index) => {
    const { match: { params: { projectId } } } = this.props;
    const { list } = this.state;
    this.setState({ pageIndex: index });
    list(projectId, { 'page[number]': index, tags: this.state.tags });
  }

  loadByTag = (tags) => {
    const { match: { params: { projectId } } } = this.props;
    const { list } = this.state;
    this.setState({ tags });
    list(projectId, { 'page[number]': this.state.pageIndex, tags });
  }

  render() {
    const {
      formatMessage,
      keywords,
      negativeKeywords,
      keywordsRequesting,
      negativeKeywordsRequesting,
      keywordsMeta,
      project,
      createKeywords,
      createNegativeKeywords,
      negativeKeywordsMeta,
      match: { params: { projectId } },
      setConfirmMessage,
      removeKeyword,
      removeNegativeKeyword,
    } = this.props;
    const { createModal, addKeywords, negative } = this.state;
    const keywordsCount = formatMessage('{count} {count, plural, one {keyword} other {keywords}}', { count: keywordsMeta.get('total') });
    const negativeKeywordsCount = formatMessage('{count} {count, plural, one {negative keyword} other {negative keywords}}', { count: negativeKeywordsMeta.get('total') });
    const renderLoading = (keywordsRequesting || negativeKeywordsRequesting) ? () => <LoadingIndicator size="small" /> : null;

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
              {negative ? negativeKeywordsCount : keywordsCount}
            </ButtonLink>)}
          <ButtonLink className="no-border" handleClick={this.toggleCreateModal} icon="fa fa-plus">
            {formatMessage('Add Keyword(s)')}
          </ButtonLink>
          <ButtonLink className="no-border" handleClick={this.toggleNegative} icon={`fa fa-${negative ? 'key' : 'shield'}`}>
            {negative ? formatMessage('Keywords') : formatMessage('Negative Keywords')}
          </ButtonLink>
        </BreadcrumbMenu>
        {
          negative ? (
            <HeaderTitle>
              {formatMessage(
                'All Negative Keywords of Project {projectName}',
                { projectName: project.getIn(['attributes', 'name']) || '--' },
              )}
            </HeaderTitle>
          ) : (
            <HeaderTitle>
              {formatMessage(
                'All Keywords of Project {projectName}',
                { projectName: project.getIn(['attributes', 'name']) || '--' },
              )}
            </HeaderTitle>
          )
        }
        <AddKeywordsModal
          isOpen={createModal}
          toggle={this.toggleCreateModal}
          className="primary"
          onAddKeywords={payload => createKeywords(projectId, payload)}
          onAddNegativeKeywords={payload => createNegativeKeywords(projectId, payload)}
          keywords={addKeywords}
          key={addKeywords}
        />
        {
          negative ? (
            !negativeKeywordsRequesting && !negativeKeywords.size ? (
              <NotificationCard
                icon="shield"
                title={formatMessage('There are no negative keywords')}
                description={formatMessage('Please, add negative keywords to get started.')}
              />
            ) : (
              <SmartTable
                data={
                  negativeKeywordsRequesting ? new Array(perPage).fill({}) : negativeKeywords.toJS()
                }
                fields={[
                  {
                    label: formatMessage('Negative Keyword'),
                    name: 'attributes.name',
                    render: renderLoading || (value => value),
                  },
                  {
                    label: '',
                    name: 'id',
                    render: renderLoading || ((value, row) => (
                      <i
                        className="fa fa-trash action"
                        onClick={() => setConfirmMessage({
                          title: formatMessage('Remove Negative Keyword'),
                          message: formatMessage('Are you sure you want to remove the negative keyword?'),
                          action: () => removeNegativeKeyword(projectId, row.id),
                        })}
                      />
                    )),
                  },
                ]}
                actions={[]}
                onPageChange={this.loadPage}
                total={negativeKeywordsMeta.get('total')}
                checkable
                key="negative_smart_table"
              />
            )
          ) : (
            !keywordsRequesting && !keywords.size ? (
              <NotificationCard
                icon="key"
                title={formatMessage('You have not added any keywords yet')}
                description={formatMessage('Keywords are the main driver of mentions, which drive leads. Add topics of interest to drive the system.')}
              />
            ) : (
              <SmartTable
                data={keywordsRequesting ? new Array(perPage).fill({}) : keywords.toJS()}
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
                  {
                    label: '',
                    name: 'id',
                    render: renderLoading || ((value, row) => (
                      <i
                        className="fa fa-trash action"
                        onClick={() => setConfirmMessage({
                          title: formatMessage('Remove Keyword'),
                          message: formatMessage('Are you sure you want to remove the keyword?'),
                          action: () => removeKeyword(projectId, row.id),
                        })}
                      />
                    )),
                  },
                ]}
                actions={[
                  { icon: 'plus-square', label: formatMessage('Add Tags'), onClick: this.onAddTags },
                ]}
                onPageChange={this.loadPage}
                total={keywordsMeta.get('total')}
                checkable
                key="smart_table"
              />
            )
          )
        }
      </div>
    );
  }
}

/* istanbul ignore next */
const mapStateToProps = state => ({
  ...selectState('project', 'project')(state, 'project'),
  ...selectState('keyword', 'keywords')(state, 'keywords'),
  ...selectState('negativeKeyword', 'negativeKeywords')(state, 'negativeKeywords'),
  createKeywordsRequesting: getRequestingSelector('keyword', 'createKeywords')(state),
  createNegativeKeywordsRequesting: getRequestingSelector('negativeKeyword', 'createNegativeKeywords')(state),
  removeKeywordRequesting: getRequestingSelector('keyword', 'removeKeyword')(state),
  removeNegativeKeywordRequesting: getRequestingSelector('negativeKeyword', 'removeNegativeKeyword')(state),
});

/* istanbul ignore next */
const mapDispatchToProps = dispatch => ({
  listKeywords: (projectId, query) => dispatch(listKeywords(projectId, query)),
  listNegativeKeywords: (projectId, query) => dispatch(listNegativeKeywords(projectId, query)),
  createKeywords: (projectId, payload) => dispatch(createKeywords(projectId, payload)),
  createNegativeKeywords: (projectId, payload) =>
    dispatch(createNegativeKeywords(projectId, payload)),
  setConfirmMessage: payload => dispatch(setConfirmMessage(payload)),
  removeKeyword: (projectId, keywordId) => dispatch(removeKeyword(projectId, keywordId)),
  removeNegativeKeyword: (projectId, negativeKeywordId) =>
    dispatch(removeNegativeKeyword(projectId, negativeKeywordId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(KeywordsList));
