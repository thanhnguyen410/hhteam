import React from 'react'
import styled from 'styled-components'

import Media from '@/utils/media'
import Typography from '@/components/typography'

const StyledDiv = styled.div`
  height: 151px;
  min-height: 151px;
  border-top: 2px solid #efefef;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  
  .typography {
    color: #75838a;
  }
  
  .__footer-description-2 {
    font-size: 11px;
    margin-top: 20px;
  }
  
  ${Media.lessThan(Media.SIZE.MD)} {
    height: 95px;
    min-height: 95px;
  
    .__footer-description-2 {
      font-size: 10px;
      margin-top: 0;
    }
  }
`

const Footer = () => (
  <StyledDiv>
    <Typography className="__footer-description-2" size="small">(C)HANH HOA INC. ALL RIGHTS RESERVED.</Typography>
  </StyledDiv>
)

export default Footer
