/* ----------------------------------------------------------------------------- */
/* Dependencies */
/* ----------------------------------------------------------------------------- */
import React, { useState } from "react";
import { StyleSheet, View, Text, TextInput } from "react-native";

const Register = ({ navigation }) => {
	const [email, setEmail] = useState(null);
	const [password, setPassword] = useState(null);
	const methods = {
		saveUser: () => {
			const requestOptions = {
				method: "POST",
				headers: {
					Accept: "application/json",
    				"Content-Type": "application/json"
				},
				body: JSON.stringify({ email: email, password: password })
			};
			fetch("http://149.91.89.133:6088/inscription", requestOptions).then((response) => { return response.json(); }).then((json) => { return methods.next(json); }).catch((error) => { console.log(error); });
		},
		next(fetchResponse) {
			if(fetchResponse.status === 200) {
				return navigation.navigate("Login");
			} else {
				return alert("Échec lors de la tentative d'inscription ! Message : " + fetchResponse.message);
			};
		}
	};
	return(<View nativeID="registerContainer" style={styles.container}>
		<View nativeID="registerForm" style={styles.registerForm}>
			<TextInput style={styles.input} onChangeText={(value) => { return setEmail(value); }} placeholder="Adresse email"></TextInput>
			<TextInput style={styles.input} onChangeText={(value) => { return setPassword(value); }} placeholder="Mot de passe" secureTextEntry></TextInput>
			<Text style={styles.button} onPress={() => { return methods.saveUser(); }}>S'Inscrire</Text>
		</View>
		<View nativeID="alreadyRegistered" style={styles.alreadyRegistered}>
			<Text>Déjà inscrit ?</Text>
			<Text>Cliquez ci-dessous pour vous connecter !</Text>
			<Text style={styles.button} onPress={() => { return navigation.navigate("Login"); }}>Se Connecter</Text>
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
	registerForm: {
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
	alreadyRegistered: {
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

export default Register;