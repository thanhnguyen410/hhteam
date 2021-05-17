import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import classnames from 'classnames'

import { Colors } from '@/theme'
import Clickabke from '@/components/clickable'
import Typography from '@/components/typography'

const StyledDiv = styled.div`
  height: 40px;
  background-color: white;
  border-radius: 5px 5px 0 0;
  display: flex;
  border: 0 solid ${Colors.COLORED_BLACKGROUND};
  border-bottom-width: 2px;
  
  &.balance {
    .tab-item {
      flex: 1;
      justify-content: center;
    }
  }
  
  .tab-item {
    position: relative;
    display: flex;
    align-items: center;
    padding: 0 7px;
    border: 0 solid ${Colors.COLORED_BLACKGROUND};
    border-right-width: 2px;
    
    .tab-text {
      color: #b0b4b5;
    }
    
    &:last-child {
      border-right-width: 0;
    }
    
    &::after {
      position: absolute;
      content: '';
      top: 0;
      left: 0;
      right: 0;
      height: 2px;
      background-color: ${Colors.PRIMARY};
      opacity: 0;
      transition: opacity 0.2s;
    }
    
    &::before {
      position: absolute;
      content: '';
      bottom: -2px;
      left: 0;
      right: 0;
      height: 2px;
      background-color: white;
      opacity: 0;
    }
    
    &.active {
      .tab-text {
        color: ${Colors.PRIMARY};
        font-weight: bold;
      }
    
      &::after, &::before {
        opacity: 1;
      }
    }
  }
`

const TabBar = ({ tabs, balance, currentTab, onChange }) => (
  <StyledDiv className={classnames({ balance })}>
    {tabs.map((tab) => (
      <Clickabke
        key={tab.key}
        className={classnames('tab-item', { active: currentTab === tab.key })}
        onClick={() => onChange(tab)}
      >
        <Typography size="small" className="tab-text">
          {tab.name}
        </Typography>
      </Clickabke>
    ))}
  </StyledDiv>
)
TabBar.propTypes = {
  tabs: PropTypes.array,
  currentTab: PropTypes.any,
  onChange: PropTypes.func,
  balance: PropTypes.bool
}

export default TabBar
