import { withNaming } from '@bem-react/classname'

export const prefixClassName: Function = withNaming({
  e: '__',
  m: '__',
  v: '__'
})
