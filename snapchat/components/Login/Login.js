/* ----------------------------------------------------------------------------- */
/* Dependencies */
/* ----------------------------------------------------------------------------- */
import React, { useState } from "react";
import { StyleSheet, View, Text, TextInput } from "react-native";
import { setToken, getToken } from "../../utilities/Token";

const Login = ({ navigation }) => {
	const [email, setEmail] = useState(null);
	const [password, setPassword] = useState(null);
	const methods = {
		logUser: () => {
			const requestOptions = {
				method: "POST",
				headers: {
					Accept: "application/json",
    				"Content-Type": "application/json"
				},
				body: JSON.stringify({ email: email, password: password })
			};
			fetch("http://149.91.89.133:6088/connection", requestOptions).then((response) => { return response.json(); }).then((json) => { return methods.next(json); }).catch((error) => { console.log(error); });
		},
		next(fetchResponse) {
			if(fetchResponse.status === 200) {
				if(setToken(fetchResponse.data.token)) {
				    getToken().then((response) => { return response; });
				};
				return navigation.navigate("Profile");
			} else {
				return alert("Échec lors de la tentative de connexion ! Message : " + fetchResponse.message);
			};
		}
	};
	return(<View nativeID="loginContainer" style={styles.container}>
		<View nativeID="loginForm" style={styles.loginForm}>
			<TextInput style={styles.input} onChangeText={(value) => { return setEmail(value); }} placeholder="Adresse email"></TextInput>
			<TextInput style={styles.input} onChangeText={(value) => { return setPassword(value); }} placeholder="Mot de passe" secureTextEntry></TextInput>
			<Text style={styles.button} onPress={() => { return methods.logUser(); }}>Se Connecter</Text>
		</View>
		<View nativeID="notRegistered" style={styles.notRegistered}>
			<Text>Vous n'avez pas de compte ?</Text>
			<Text>Cliquez ci-dessous pour vous inscrire !</Text>
			<Text style={styles.button} onPress={() => { return navigation.navigate("Register"); }}>S'Inscrire</Text>
		</View>
	</View>);
};

const styles = StyleSheet.create({
	container: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		width: "100%",
		height: "100%"
	},
	loginForm: {
		display: "flex",
		flexDirection: "column",
		width: "50%",
		paddingBottom: 10,
		borderRadius: 5,
		backgroundColor: "#009FFC",
		elevation: 5
	},
	input: {
		marginTop: 10,
		marginRight: 10,
		marginLeft: 10,
		paddingRight: 10,
		paddingLeft: 10,
		color: "#2B2B2B",
		borderRadius: 5,
		backgroundColor: "#FFFFFF",
		elevation: 5
	},
	notRegistered: {
		display: "flex",
		alignItems: "center",
		marginTop: 20
	},
	button: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		marginTop: 10,
		marginRight: "auto",
		marginLeft: "auto",
		paddingTop: 5,
		paddingRight: 10,
		paddingBottom: 5,
		paddingLeft: 10,
		color: "#FFFFFF",
		borderRadius: 5,
		backgroundColor: "#009FFC",
		elevation: 5
	}
});

export default Login;