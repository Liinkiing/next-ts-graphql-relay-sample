import React, { FC } from 'react'
import AppContainer from '~/ui/layout/AppContainer'
import { AppBoxProps } from '~/ui/AppBox'
import { css } from 'styled-components'
import { pxToRem } from '~/styles/modules/mixins'

export const FullContainer: FC<AppBoxProps> = ({ children, ...rest }) => {
  return (
    <AppContainer
      full
      display="flex"
      alignItems="center"
      justifyContent="center"
      mt={0}
      css={
        css`
          height: auto;
          padding: ${pxToRem(20)};
          @media screen and (min-height: 800px) {
            padding: 0;
            height: 100vh;
          }
        ` as any
      }
      {...rest}
    >
      {children}
    </AppContainer>
  )
}

export default FullContainer
