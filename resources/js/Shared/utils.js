export const prevented = (fn) => (e) => {
  e.preventDefault()
  fn(e)
}
