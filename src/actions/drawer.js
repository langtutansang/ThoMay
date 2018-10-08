import { DRAWER_OPEN, DRAWER_CLOSE } from '@constants/reducer'

export const drawerClose = () => ({
  type: DRAWER_CLOSE
})

export const drawerOpen = () => ({
  type: DRAWER_OPEN
})