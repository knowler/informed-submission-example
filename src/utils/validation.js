export const hasValue = value => !value ? 'Required entry' : undefined

export const validateLength = (value, length) => !value || value.length < length 
  ? `Field must be at least ${length} character${length > 1 ? 's' : ''}`
  : undefined
