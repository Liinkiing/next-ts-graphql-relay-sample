import React, { FC } from 'react'
import AppBox, { AppBoxProps } from '~/ui/AppBox'
import styled from 'styled-components'
import { pxToRem } from '~/styles/modules/mixins'

interface Props {
  readonly full?: boolean
}

const FULL_PROPS: AppBoxProps = {
  width: 1,
  maxWidth: [null, null, null, '70%'],
  ml: [0, null, null, 5],
  mr: [null, null, null, 5],
  pl: [pxToRem(20), 5, null, 0],
  pr: [pxToRem(20), 5, 5, 0],
}

const NOFULL_PROPS: AppBoxProps = {
  width: 1,
  maxWidth: [null, '85%', '65%', '70%'],
  ml: [null, null, null, 5],
  mr: [null, null, null, 5],
  pl: [pxToRem(20), 5, null, 0],
  pr: [pxToRem(20), 0],
}

const AppContainerInner = styled(AppBox).attrs<Props>(({ ...props }) => ({
  mt: [4, 5],
  pb: 5,
  ...(props.full ? FULL_PROPS : NOFULL_PROPS),
  ...props,
}))<Props>``

export const AppContainer: FC<Props & AppBoxProps> = ({ children, full = false, ...rest }) => {
  return (
    <AppContainerInner full={full} {...rest}>
      {children}
    </AppContainerInner>
  )
}

export default AppContainer
