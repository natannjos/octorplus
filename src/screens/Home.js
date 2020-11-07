import React from 'react'
import { Component } from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'

import axios from 'axios'

export default class Home extends Component {
	render()	{
		const navigationParams = this.props.navigation.state.params

		return (
					<View style={styles.container}>
	
						<Text style={styles.title}>
							Home
						</Text>
						{
						navigationParams.user ? 
						
						<View style={styles.content}>
							<Text>
								Nome: {navigationParams.user.name}
							</Text>
							<Text>
								Email: {navigationParams.user.email}
							</Text>
							<Text>
								Nome de Familia: {navigationParams.user.familyName}
							</Text>
							<Text>
								Nome dado: {navigationParams.user.givenName}
							</Text>
							<Text>
								ID: {navigationParams.user.id}
							</Text>
							<Image style={styles.logo} source={{ uri: `${navigationParams.user.photoUrl}`}}/>
						</View>
						: null}
	
					</View>
			)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	logo: {
    width: 66,
    height: 58,
	},
	title: {
		fontSize: 60
	},
	content: {
		alignItems: 'center',
		justifyContent: 'center'
	}
})