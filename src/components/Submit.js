import React from 'react'
import { withFormState } from 'informed'
import Button from '@components/Button'

const Submit = withFormState((props) => {
  return (
    <Button type='submit' {...props}>
      {props.disabled
        ? props.submittingText || 'Submitting'
        : props.children || 'Submit'
      }
      <br />
    </Button>
  )
})

export default Submit
