import styled from 'styled-components'
import { space, justifyContent, alignItems, height } from 'styled-system'

const Flex = styled.div`
  display: flex;
  flex-wrap: wrap;
  ${justifyContent}
  ${alignItems}
  ${space}
  ${height}
`
Flex.displayName = 'Flex'

export default Flex
