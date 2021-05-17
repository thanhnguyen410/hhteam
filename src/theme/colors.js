import tinycolor from 'tinycolor2'

export const GRAY_BACKGROUND = '#E2E2E2'

export const PRIMARY = '#1da57a'
export const WARNING = '#ff0000'

export const GRAY_COLOR_1 = '#d8dce5'
export const GRAY_COLOR_2 = '#BDBDBD'
export const GRAY_COLOR_3 = '#BDBDBD'
export const WHITE1 = '#FFFFFF'

// Color utils
export const darken = (color, value) => tinycolor(color).darken(value).toString()
export const lighten = (color, value) => tinycolor(color).lighten(value).toString()
export const alpha = (color, value) => tinycolor(color).setAlpha(value).toRgbString()
export const isLight = (color) => tinycolor(color).isLight()
