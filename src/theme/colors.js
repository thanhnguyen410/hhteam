import tinycolor from 'tinycolor2'

export const GRAY_BACKGROUND = '#E2E2E2'

export const PRIMARY = '#D06C96'

// Color utils
export const darken = (color, value) => tinycolor(color).darken(value).toString()
export const lighten = (color, value) => tinycolor(color).lighten(value).toString()
export const alpha = (color, value) => tinycolor(color).setAlpha(value).toRgbString()
export const isLight = (color) => tinycolor(color).isLight()
