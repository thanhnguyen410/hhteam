import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Table as AntdTable, Pagination as PaginationCustom } from 'antd'
import styled from 'styled-components'
import { observer } from 'mobx-react'

import Media from '@/utils/media'

import { Colors } from '@/theme'

const StyledTable = styled(AntdTable)`
  .ant-table {
    .ant-table-container {
      .ant-table-content {
        .ant-table-thead {
          .ant-table-cell {
            background-color: #eceeef;
            font-size: 16px;
            color: #55595c;
            padding: 0px 16px;
            height: 40px;
          }
        }
        
        .ant-table-tbody {
          .ant-table-row {
            .ant-table-cell {
              font-size: 16px;
              padding: 0px 16px;
              height: 40px;
              border-bottom: 1px solid #dddddd;
            }
          }
        }
      }
    }
  }

  ${Media.lessThan(Media.SIZE.XXL)} {
    .ant-table {
      .ant-table-container {
        .ant-table-content {
          .ant-table-thead {
            .ant-table-cell {
              font-size: 14px;
            }
          }

          .ant-table-tbody {
            .ant-table-row {
              .ant-table-cell {
                font-size: 14px;
              }
            }
          }
        }
      }
    }
  }
`

const PaginationStyle = styled(PaginationCustom)`
  li, .ant-pagination-next, .ant-pagination-prev button {
    border-radius: 6px;
    border-width: 1.6px;
    border-color: ${Colors.GRAY4};
  }

  .ant-pagination-item-active {
    background-color: ${Colors.PRIMARY};
    border: none;
    a {
      color: #fff;
    }
  }
`

const PaginationBox = styled.div`
  height: 60px;
  background: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

@observer
class Table extends Component {
  static propTypes = {
    dataSource: PropTypes.array
  }

  static Pagination = (props) => (
    <PaginationBox>
      <p>合計: <b>{props.total}</b></p>
      <PaginationStyle {...props} />
    </PaginationBox>
  )

  scroll = (x = 0, y = 0) => {
    const tableBody = document.getElementsByClassName('ant-table-body')[0]
    if (tableBody) tableBody.scroll(x, y)
  }

  render() {
    const { dataSource } = this.props

    return (
      <StyledTable
        {...this.props}
        pagination={false}
        dataSource={dataSource.toJSON ? dataSource.toJSON() : dataSource}
      />
    )
  }
}

export default Table
