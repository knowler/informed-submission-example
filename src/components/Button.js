import styled from 'styled-components'

const Button = styled.button`
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  background: none;
  border: 1px solid black;
  margin: 0.25rem;
  padding: 0.5rem 0.75rem;
  cursor: pointer;
  transition: 0.2s ease;

  &[disabled],
  &:hover {
    background-color: #6638f0;
    border-color: #6638f0;
    color: white;
  }

  &[disabled] {
    opacity: 0.5;
    cursor: default !important;
  }
`

export default Button
