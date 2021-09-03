export const createAction = (type: symbol) => (payload = {}) => {
  return {
    type, 
    ...payload
  }
}