import React from 'react'
import { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Alert, Button } from 'react-native'
import { SafeAreaView } from 'react-navigation'
import { showError } from '../common'

// my components
import AuthInput from '../components/AuthInput'

import axios from 'axios'
import { androidClientId } from '../../env'

import * as Google from 'expo-google-app-auth'; //https://docs.expo.io/versions/latest/sdk/google/

const initialState = {
	username: '',
	email: '',
	password: '',
	confirmPassword: '',
	stageNew: true,
}

export default class Auth extends Component {

	state = {
		...initialState
	}

	signinOrSignup = () => {
		if(this.state.stageNew)
			this.signup()
		else
			this.signin()
	}

	signup = async () => {
		try {
			await axios.post(`${server}/signup`, {
				name: this.state.name,
				email: this.state.email,
				password: this.state.password,
				confirmPassword: this.state.confirmPassword
			})

			showSuccess('usuário cadastrado!')
			this.setState({ stageNew: false })
		} catch (error) {
			showError(error)
		}
	}

	signin = async () => {
		try {
			const res = await axios.post(`${server}/signin`, {
				email: this.state.email,
				password: this.state.password
			})

			 axios.defaults.headers.common['Authorization'] = `bearer ${res.data.token}`
			if(this.state.email && this.state.password)
				this.props.navigation.navigate('Home')
			showError('Precia de login e senha')
		} catch (error) {
			showError(error)
		}
	}

	signInWithGoogleAsync = async () => {
		try {
			const result = await Google.logInAsync({
				androidClientId: androidClientId, 
				//iosClientId: YOUR_CLIENT_ID_HERE,
				scopes: ['profile', 'email'],
			});
		
		if (result.type === 'success') {
			axios.defaults.headers.common['Authorization'] = `bearer ${result.accessToken}`
			this.props.navigation.navigate({
				routeName:'Home', 
				params: {
					user: result.user
				}})
    } else {
      showError('Sua requisição foi cancelada!')
    }
		} catch (e) {
			showError('Ocorreu um erro em sua requisição')
		}
	}


	render() {
		return (
			<SafeAreaView style={styles.container}>
				<Text style={styles.title}>
					Octor Plus
				</Text>

				<View style={styles.formContainer}>
						<Text style={styles.subtitle}>
							{
								this.state.stageNew 
								? 'Crie sua conta'
								: 'Informe seus dados'
							}
						</Text>

						{this.state.stageNew &&
							<AuthInput placeholder='Nome'
								icon='user'
								value={this.state.name} 
								style={styles.input}
								onChangeText={ name => this.setState({ name }) }
							/>
						}

						<AuthInput 
							placeholder='Email' 
							value={this.state.email} 
							style={styles.input}
							icon='at'
							onChangeText={ email => this.setState({ email }) }
						/>

						<AuthInput placeholder='Senha'
							icon='lock'
							value={this.state.password} 
							style={styles.input}
							secureTextEntry={true}
							onChangeText={ password => this.setState({ password }) }
						/>

						{ this.state.stageNew && 
							<AuthInput placeholder='Confirme a senha'
							icon='lock'
							value={this.state.confirmPassword} 
							style={styles.input}
							secureTextEntry={true}
							onChangeText={ confirmPassword => this.setState({ confirmPassword }) }
						/>
						}

						<TouchableOpacity onPress={this.signinOrSignup}>
							<View style={styles.button}>
								<Text style={styles.buttonText}>
									{
										this.state.stageNew 
										? 'Cadastrar'
										: 'Entrar'
									}
								</Text>
							</View>
						</TouchableOpacity>

					</View>
					<View  style={{
						borderTopColor: 'white',
						borderTopWidth: 2,
						marginTop: 15
						}}
					>
						<TouchableOpacity style={{padding: 10}}
						onPress={
							() => this.setState({ stageNew: !this.state.stageNew })
						}> 
							<Text style={styles.buttonText} >
								{
									this.state.stageNew 
										? 'Já possui conta?'
										: 'Ainda não possui conta?'
								}
							</Text>
						</TouchableOpacity>

						<Button onPress={this.signInWithGoogleAsync} title='Acesse Google' />

					</View>
							
					 

			</SafeAreaView>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'grey'
	},
	title: {
		color: 'white',
		fontSize: 60,
		marginBottom: 10
	},
	formContainer: {
		backgroundColor: 'rgba(7,7,7,0.6)',
		padding: 20,
		width: '85%'
	},
	subtitle: {
		fontSize: 20,
		color: 'white',
		textAlign: 'center',
		marginBottom: 10
	},
	input: {
		marginTop: 10,
		backgroundColor: 'white',
		borderRadius: 30,
	},
	button: {
		backgroundColor: '#080',
		marginTop: 10,
		padding: 10,
		alignItems: 'center',
		borderRadius: 10
	},
	buttonText: {
		color: 'white',
		fontSize: 20
	}
})