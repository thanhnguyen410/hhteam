import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { CaretDownOutlined } from '@ant-design/icons'
import memoizeOne from 'memoize-one'
import classnames from 'classnames'

import Configs from '@/configs'
import Table from './table'
import Clickable from './clickable'

const StyledDiv = styled.div`
  .sort-clickable {
    height: 100%;
    display: flex;
    align-items: center;
    
    .sort-icon {
      margin-left: 10px;
      opacity: 0.1;
      transition: transform 0.5s;
    }
    
    &.active {
      .sort-icon {
        opacity: 1;
      }
    }
    
    &.asc {
      .sort-icon {
        transform: rotate(-180deg);
      }
    }
  }
`

class FetchableTable extends Component {
  static propTypes = {
    action: PropTypes.func.isRequired,
    payload: PropTypes.object,
    rowKey: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.func
    ]).isRequired,
    loading: PropTypes.bool,
    items: PropTypes.array.isRequired,
    columns: PropTypes.array.isRequired,
    total: PropTypes.number.isRequired,
    page: PropTypes.number.isRequired,
    limit: PropTypes.number,
    sort: PropTypes.string,
    onFetched: PropTypes.func,
    pagination: PropTypes.bool
  }

  state = {
    newPayload: {}
  }

  componentDidMount() {
    this._fetchData(0)
  }

  _fetchData = async (page, sort) => {
    const { action, onFetched, payload, limit } = this.props
    const { newPayload } = this.state
    const result = await action({
      offset: limit ? page * limit : (page) * Configs.PAGINATION_PAGE_SIZE,
      limit: limit || Configs.PAGINATION_PAGE_SIZE,
      ...payload,
      ...newPayload,
      ...(sort ? { sort } : {})
    }, {
      page,
      sort
    })

    if (onFetched) {
      onFetched(result, {
        page,
        sort
      })
    }
  }

  fetchDataWithNewPayload = async (newPayload = {}) => {
    this.state.newPayload = newPayload

    await this._fetchData(0)
  }

  _onPaginationChange = (page) => {
    const { sort } = this.props
    const sortParts = (sort || '').split('|')

    this._fetchData(page - 1, sort && `${sortParts[0]}|${sortParts[1]}`)
  }

  _onSortChange = (column, sortDirection) => {
    this._fetchData(0, `${column}|${sortDirection === 'asc' ? 'desc' : 'asc'}`)
  }

  _getColumns = memoizeOne((sort) => {
    const { columns } = this.props
    const sortParts = (sort || '').split('|')

    return columns.map((column) => ({
      ...column,
      title: !column.sortable ? column.title : (
        <Clickable
          className={classnames('sort-clickable', {
            active: sortParts[0] === column.dataIndex,
            asc: sortParts[1] === 'asc' && sortParts[0] === column.dataIndex
          })}
          onClick={() => this._onSortChange(column.dataIndex, sortParts[1])}
        >
          {column.title}
          <CaretDownOutlined className="sort-icon" />
        </Clickable>
      )
    }))
  })

  render() {
    const { items, page, total, sort, pagination = true, limit, ...props } = this.props
    const columns = this._getColumns(sort)
    const finalLimit = limit || Configs.PAGINATION_PAGE_SIZE

    return (
      <StyledDiv>
        <Table
          {...props}
          columns={columns}
          dataSource={items}
        />
        {pagination && total > finalLimit && (
          <Table.Pagination
            total={total}
            pagination={false}
            pageSize={finalLimit}
            current={page + 1}
            showSizeChanger={false}
            onChange={this._onPaginationChange}
          />
        )}
      </StyledDiv>
    )
  }
}

export default FetchableTable
