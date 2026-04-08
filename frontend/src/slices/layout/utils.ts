/**
 * Changes the body attribute
 */
const changeHTMLAttribute = (attribute: string, value: string) => {
  if (document.documentElement)
    document.documentElement.setAttribute(attribute, value)
  return true
}

const removeAttribute = (attribute: string) => {
  if (document.documentElement)
    document.documentElement.removeAttribute(attribute)
}

// get previous theme data - only in development mode
const getPreviousStorageData = (key: string): string | null => {
  // Only use localStorage in development mode
  if (process.env.NODE_ENV !== 'development') {
    return null
  }

  try {
    const value = localStorage.getItem(key)
    return value ? value : null
  } catch (error) {
    console.error('Error accessing localStorage', error)
    return null
  }
}

// set new theme data - only in development mode
const setNewThemeData = (key: string, value: string) => {
  // Only persist to localStorage in development mode
  if (process.env.NODE_ENV !== 'development') {
    return
  }

  try {
    localStorage.setItem(key, value)
  } catch (error) {
    console.error('Error accessing localStorage', error)
  }
}

const appendDarkModeClass = (
  existingClass: string,
  darkModeClass: string
): string => {
  // Check if the class is already present to avoid duplicates
  return !existingClass.includes(darkModeClass)
    ? `${existingClass} ${darkModeClass}`
    : existingClass
}

// remove existing theme data
const removeThemeData = (existingItem: string) => {
  try {
    localStorage.removeItem(existingItem)
  } catch (error) {
    console.error('Error accessing localStorage', error)
  }
}

export {
  changeHTMLAttribute,
  getPreviousStorageData,
  setNewThemeData,
  appendDarkModeClass,
  removeAttribute,
  removeThemeData,
}
