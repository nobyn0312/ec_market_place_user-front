import navIcon from 'user-front/public/icons/navIcon.svg'

export type IconType = keyof typeof ICON


export const ICON: Record<string, string> = {
  navIcon: navIcon.src,
}