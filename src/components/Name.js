import React from 'react'
import { asField, BasicText } from 'informed'
import styled from 'styled-components'
import { borderColor, color } from 'styled-system'

const Input = styled(BasicText)`
  font-size: 1rem;
  padding: 0.5rem;
  border: 1px solid;
  transition: 0.2s ease;
  ${borderColor}

  &:focus {
    border-color: #6638f0;
  }
`
Input.displayName = 'Input'

const Label = styled.span`
  display: block;
  margin-bottom: 0.5rem;
  font-size: 0.8rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  transition: 0.2s ease;
  ${color}
`
Label.displayName = 'Label'

const Wrapper = styled.label`
  display: block;
  padding-left: 0.25rem;
  padding-right: 0.25rem;
`
Wrapper.displayName = 'Wrapper'

const ErrorMessage = styled.p`
  margin-top: 0.5rem;
  margin-bottom: 1rem;
  font-size: 0.8rem;
  color: red;
  height: 0.8rem;
`
ErrorMessage.displayName = 'ErrorMessage'

const Name = asField(({ fieldState, ...props }) => {
  const { label, ...rest } = props
  const { error } = fieldState

  return (
    <Wrapper>
      <Label 
        children={label} 
        color={error ? 'red' : 'black'} 
      />
      <Input 
        {...rest} 
        fieldState={fieldState} 
        borderColor={error ? 'red' : 'black'}
      /> 
      <ErrorMessage>{error ? fieldState.error : null}</ErrorMessage>
    </Wrapper>
  )
})
Name.displayName = 'Name'

export default Name
