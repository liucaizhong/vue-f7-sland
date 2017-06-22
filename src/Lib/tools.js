// common tool functions
export default {
  // judge whether the two objects are same
  //compare plain object
  isSameObject (a, b) {
    console.log('begin isSameObject')
    if(Object.keys(a).length !== Object.keys(b).length) {
      return false
    }
    for(let k in a) {
      if(b[k] === undefined) {
        return false
      }
      if(a[k] !== b[k]) {
        return false
      }
    }
    return true
  },
  // judge whether the object is empty strictly
  isEmptyObject (obj) {
    for(let k in obj) {
      if(obj[k] && obj[k] !== '') {
        return false
      }
    }
    return true
  }
}
