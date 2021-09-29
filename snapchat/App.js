/* ----------------------------------------------------------------------------- */
/* Dependencies */
/* ----------------------------------------------------------------------------- */
import React, { useState } from "react";
import { StyleSheet, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { getToken } from "./utilities/Token";
/* ----------------------------------------------------------------------------- */
/* Components */
/* ----------------------------------------------------------------------------- */
import Home from "./components/Home/Home";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import Profile from "./components/Profile/Profile";
import Snap from "./components/Snap/Snap";
import SnapDetail from "./components/SnapDetail/SnapDetail";

const Stack = createStackNavigator();

const App = () => {
	const [token, saveToken] = useState(null);
	setInterval(() => { return getToken().then((response) => { return response; }).then((response) => { return saveToken(response); }); }, 500);
	var logged = (token !== null && token !== undefined) ? true : false;
	return(<NavigationContainer>
		<Stack.Navigator initialRouteName="Home">
			<Stack.Screen name="Home" component={Home} options={({ navigation }) => screenOptions(navigation, "Accueil", logged)}></Stack.Screen>
			<Stack.Screen name="Register" component={Register} options={({ navigation }) => screenOptions(navigation, "Inscription", logged)}></Stack.Screen>
			<Stack.Screen name="Login" component={Login} options={({ navigation }) => screenOptions(navigation, "Connexion", logged)}></Stack.Screen>
			<Stack.Screen name="Profile" component={Profile} options={({ navigation }) => screenOptions(navigation, "Profil", logged)}></Stack.Screen>
			<Stack.Screen name="Snap" component={Snap} options={({ navigation }) => screenOptions(navigation, "Snap", logged)}></Stack.Screen>
			<Stack.Screen name="SnapDetail" component={SnapDetail} options={({ navigation }) => screenOptionsSpecial(navigation, "SnapDetail", logged)}></Stack.Screen>
		</Stack.Navigator>
	</NavigationContainer>);
};

const screenOptions = (navigation, title, logged) => ({
	title: title,
	headerRight: () => {
		if(logged && title) {
			return <Text style={[styles.button, styles.rightButton]} onPress={() => { return navigation.navigate((title === "Accueil") ? "Profile" : (title === "Profil") ? "Snap" : "Home"); }}>{(title === "Accueil") ? "Profil" : (title === "Profil") ? "Snap" : "Accueil"}</Text>
		} else {
			return <Text style={[styles.button, styles.rightButton]} onPress={() => { return navigation.navigate((title === "Accueil") ? "Login" : (title === "Connexion") ? "Register" : "Home"); }}>{(title === "Accueil") ? "Connexion" : (title === "Connexion") ? "Inscription" : "Accueil"}</Text>
		};
	},
	headerLeft: () => {
		if(logged) {
			return <Text style={[styles.button, styles.leftButton]} onPress={() => { return navigation.navigate((title === "Accueil") ? "Snap" : (title === "Snap") ? "Profile" : "Home"); }}>{(title === "Accueil") ? "Snap" : (title === "Snap") ? "Profil" : "Accueil"}</Text>
		} else {
			return <Text style={[styles.button, styles.leftButton]} onPress={() => { return navigation.navigate((title === "Accueil") ? "Register" : (title === "Inscription") ? "Login" : "Home"); }}>{(title === "Accueil") ? "Inscription" : (title === "Inscription") ? "Connexion" : "Accueil"}</Text>
		};
	},
	headerStyle: {
		backgroundColor: "#009FFC"
	},
	headerTitleStyle: {
		textAlign: "center",
		color: "#FFFFFF"
	}
});

const screenOptionsSpecial = (navigation, title, logged) => ({
	title: title,
	headerRight: () => {
		return <Text style={[styles.button, styles.rightButton]} onPress={() => { return navigation.navigate("Home"); }}>{"Accueil"}</Text>
	},
	headerLeft: () => {
		return <Text style={[styles.button, styles.leftButton]} onPress={() => { return navigation.navigate("Home"); }}>{"Accueil"}</Text>
	},
	headerStyle: {
		backgroundColor: "#009FFC"
	},
	headerTitleStyle: {
		textAlign: "center",
		color: "#FFFFFF"
	}
});

const styles = StyleSheet.create({
	button: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		width: 110,
		marginRight: "auto",
		marginLeft: "auto",
		paddingTop: 5,
		paddingRight: 10,
		paddingBottom: 5,
		paddingLeft: 10,
		textAlign: "center",
		color: "#FFFFFF",
		borderRadius: 5,
		backgroundColor: "#009FFC",
		elevation: 5
	},
	rightButton: {
		marginRight: 10
	},
	leftButton: {
		marginLeft: 10
	}
});

export default App;