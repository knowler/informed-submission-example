import React, { Component } from 'react'
import { Form, withFormApi } from 'informed'
import { fetch } from 'whatwg-fetch'

import Name from '@components/Name'
import Submit from '@components/Submit'
import Flex from '@components/Flex'
import Button from '@components/Button'
import { hasValue } from '@utils/validation'
import { msg } from '@utils/logging'

/**
 * Application Form class
 */
class ApplicationForm extends Component {
  constructor() {
    super()

    /**
     * Set initial state
     */
    this.state = {
      apiBase: 'https://jsonplaceholder.typicode.com/',
      posts: null,
      submitting: false,
      submitted: false,
    }

    /**
     * Register bindings
     */
    this.handleSubmit = this.handleSubmit.bind(this)
    this.setFormApi = this.setFormApi.bind(this)
  }

  /**
   * Set the form API
   */
  setFormApi(formApi) {
    this.formApi = formApi;
  }

  /**
   * API route formatting helper
   * TODO: remove potential left forward slash
   */
  apiRoute(route) {
    return this.state.apiBase + route
  }

  /**
   * Runs when the component mounts.
   */
  componentDidMount() {
    fetch(this.apiRoute('posts'))
      .then(response => response.json())
      .then(data => this.setState({ posts: data }))
  }

  /**
   * Runs when the component updates.
   */
  componentDidUpdate() {
    this.watchSubmitting()
  }

  /**
   * Watch submitting state
   */
  watchSubmitting() {
    const { submits } = this.formApi.getState()

    submits === 0 || console.info(this.state.submitting
      ? msg('submission in progress')
      : msg('submission completed')
    )
  }

  /**
   * Handle submissions
   * Note: informed will not call onSubmit unless the form validates
   */
  handleSubmit() {
    const { values } = this.formApi.getState()

    this.setState({ submitting: true })

    fetch(this.apiRoute('posts'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ application: values }),
    }).then(response => console.info(response.ok 
      ? msg('submission successful')
      : msg('submission failed')
    )).then(() => this.setState({ submitting: false }))
  }

  /**
   * Render
   */
  render() {
    const Reset = withFormApi(({formApi}) => (
      <Button type='button' onClick={() => formApi.reset()}>Reset</Button>
    ))

    return (
      <Flex justifyContent='center' alignItems='center' height='100%'>
        <Form getApi={this.setFormApi} onSubmit={this.handleSubmit}>

          <Flex mx='0.5rem'>
            <Name 
              field='first_name' 
              label='First Name' 
              validate={hasValue}
              validateOnBlur
            />
            <Name
              field='last_name'
              label='Last Name'
              validate={hasValue}
              validateOnBlur
            />
          </Flex>

          <Flex mx='0.5rem'>
            <Submit disabled={this.state.submitting} />
            <Reset />
          </Flex>

        </Form>
      </Flex>
    )
  }
}

export default ApplicationForm
