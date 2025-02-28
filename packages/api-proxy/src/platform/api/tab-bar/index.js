import { getEnvObj, envError } from '../../../common/js'

const ENV_OBJ = getEnvObj()

const setTabBarItem = ENV_OBJ.setTabBarItem || envError('setTabBarItem')

const setTabBarStyle = ENV_OBJ.setTabBarStyle || envError('setTabBarStyle')

const showTabBar = ENV_OBJ.showTabBar || envError('showTabBar')

const hideTabBar = ENV_OBJ.hideTabBar || envError('hideTabBar')

export {
  setTabBarItem,
  setTabBarStyle,
  showTabBar,
  hideTabBar
}
