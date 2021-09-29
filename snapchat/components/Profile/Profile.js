/* ----------------------------------------------------------------------------- */
/* Dependencies */
/* ----------------------------------------------------------------------------- */
import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { removeToken } from "../../utilities/Token";


class Profile extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	logout(navigation) {
		return removeToken({ navigation });
	}
	render() {
		return(<View nativeID="profileContainer" style={styles.container}>
			<Text>Profile Page</Text>
			<Text style={styles.logout} onPress={() => { return this.logout(this.props.navigation); }}>Se Déconnecter</Text>
		</View>);
	}
};

const styles = StyleSheet.create({
	container: {
		display: "flex",
		width: "100%",
		height: "100%"
	},
	logout: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		width: 120,
		marginTop: "auto",
		marginRight: "auto",
		marginBottom: 20,
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
	}
});

export default Profile;