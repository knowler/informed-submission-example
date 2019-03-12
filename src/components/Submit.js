import React from 'react'

const Submit = props => <button type='submit' {...props}>{props.children || 'Submit'}</button>

export default Submit
