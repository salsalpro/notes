export const getTheme = () => {
    return localStorage.getItem('theme') || 'light'
}

export const setTheme = (theme) => {
    return localStorage.setItem('theme', theme)
}