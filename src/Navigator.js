import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { registerRootComponent } from 'expo'

import Auth from './screens/Auth'
import Home from './screens/Home'

const mainRoutes = {
	Auth: {
		name: 'Auth',
		screen: Auth
	},
	Home: {
		name: 'Home',
		screen: Home
	}
}

const RootSwitch = createSwitchNavigator(mainRoutes, {
	initialRouteName: 'Auth'
})


const AppContainer = createAppContainer(RootSwitch)
registerRootComponent(AppContainer)

export default AppContainer