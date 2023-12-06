/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
import { createContext, useState } from 'react'
import { getFilmFromLS } from 'utils/utils'

export const getInitialAppContext = () => ({
  film: getFilmFromLS(),
  setFilm: () => null
})

const initialAppContext = getInitialAppContext()
console.log("initialAppContext",initialAppContext)
export const AppContext = createContext(initialAppContext)

export const AppProvider = ({ children, defaultValue = initialAppContext }) => {
  const [film, setFilm] = useState(defaultValue.film)
  console.log(film + "APP")
  return (
    <AppContext.Provider
      value={{
        film,
        setFilm
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
