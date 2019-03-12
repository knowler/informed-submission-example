import React, { Component } from 'react'
import { Form, Text, withFormApi } from 'informed'
import { fetch } from 'whatwg-fetch'

import FileUpload from '@components/FileUpload'
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
      <button type='button' onClick={() => formApi.reset()}>Reset</button>
    ))

    return (
      <Form getApi={this.setFormApi} onSubmit={this.handleSubmit}>

        <label>
          What is your name? <Text field='name' validate={hasValue} />
        </label>

        <br />

        <label>
          Upload testimony <FileUpload field='testimony' maxSize='2MB' />
        </label>

        <br />

        <button type='submit' disabled={this.state.submitting}>Submit</button>
        <Reset />

      </Form>
    )
  }
}

export default ApplicationForm
