import { createContext, useContext, useState } from 'react'

const AppContext = createContext(null)

export function AppProvider({ children }) {
  const [user, setUser] = useState({
    bodyShape: null,
    selectedBrand: null,
    savedLooks: [],
    preferences: {
      style: null,
      colors: [],
    },
  })

  const [avatar, setAvatar] = useState({
    loaded: false,
    customizations: {
      skin: '#f5d0c5',
      hair: '#2c1810',
      outfit: null,
    },
  })

  const updateBodyShape = (shape) => {
    setUser((prev) => ({ ...prev, bodyShape: shape }))
  }

  const selectBrand = (brand) => {
    setUser((prev) => ({ ...prev, selectedBrand: brand }))
  }

  const saveLook = (look) => {
    setUser((prev) => ({
      ...prev,
      savedLooks: [...prev.savedLooks, { ...look, id: Date.now() }],
    }))
  }

  const updateAvatar = (customizations) => {
    setAvatar((prev) => ({
      ...prev,
      customizations: { ...prev.customizations, ...customizations },
    }))
  }

  return (
    <AppContext.Provider
      value={{
        user,
        avatar,
        updateBodyShape,
        selectBrand,
        saveLook,
        updateAvatar,
        setAvatar,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useApp must be used within AppProvider')
  }
  return context
}

