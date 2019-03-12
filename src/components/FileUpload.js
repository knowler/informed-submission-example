import React from 'react'
import { asField } from 'informed'
import bytes from 'bytes'

const FileUpload = asField(({
    accept, maxSize, 
    fieldApi: { setValue, setError},
    fieldState: { value, error},
  }) => {
  /**
   * Handle file upload
   */
  const handleChange = event => {
    let file = event.target.files[0]

    /**
     * Deny files that are too large
     */
    if (maxSize && file.size > bytes.parse(maxSize)) {
      event.target.value = '';
      setError(`file too large. Must be less than ${maxSize}`)
      return false;
    }

    /**
     * Save the file as JSON (base64 data)
     * Note: Uses the File API; might need to polyfill.
     */
    let reader = new FileReader()
    reader.addEventListener('load', function (e) {
      setValue({
        name: file.name,
        data: e.target.result,
      })
    })
    reader.readAsDataURL(file)
  }

  /**
   * Render
   */
  return (
    <>
      <input type='file' accept={accept} onChange={handleChange} />
      {error ? <p><small>{error}</small></p> : null}
    </>
  )
})

export default FileUpload
