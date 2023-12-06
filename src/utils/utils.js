/* eslint-disable no-useless-escape */
export const removeSpecialCharacter = (str) =>
  // eslint-disable-next-line no-useless-escape
  str.replace(
    /!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g,
    ''
  )

export const generateNameId = ({ name, id }) => {
  return removeSpecialCharacter(name).replace(/\s/g, '-') + `-i,${id}`
}

export const getIdFromNameId = (nameId) => {
  const array = nameId.split('-i,')
  return array[array.length - 1]
}

export const setFilmToLS = (film) => {
  localStorage.setItem('film', JSON.stringify(film))
}
export const getFilmFromLS = () => {

 const result =  localStorage.getItem('film')
 if(result){
  return JSON.parse(result)
 }
 return null
}
