/* ----------------------------------------------------------------------------- */
/* Dependencies */
/* ----------------------------------------------------------------------------- */
import React from "react";
import { StyleSheet, View, FlatList, ImageBackground, Text } from "react-native";
import { getToken } from "../../utilities/Token";

class Home extends React.Component {
	constructor(props) {
        super(props);
        this.state = {
			token: null,
			snaps: null
        };
	}
	componentDidMount() {
		setInterval(() => { return getToken().then((response) => { return response; }).then((response) => { return (response != undefined) ? this.setState({ token: response }) : this.setState({ token: null }); }); }, 500);
	}
	getSnaps() {
		const requestOptions = {
			method: "GET",
			headers: {
				"token": this.state.token
			}
		};
		fetch("http://149.91.89.133:6088/snaps", requestOptions).then((response) => { return response.json(); }).then((response) => { return (this.state.token != null) ? this.setState({ snaps: response.data }) : this.setState({ snaps: null }); }).catch((error) => { return console.log(error); });
	}
	render() {
		return(<View nativeID="homeContainer" style={styles.container}>
			<View nativeID="snapsContainer" style={styles.snapsContainer}>
				<ImageBackground source={require("../../assets/10.jpg")} style={styles.image}>
					{(this.state.token != null && this.state.snaps != null) ? <FlatList style={styles.list} data={this.state.snaps} renderItem={({item}) => { return <Text key={item.from} style={styles.item} onPress={() => { return this.props.navigation.navigate("SnapDetail", { snap: item, token: this.state.token }); }}>{item.from}</Text>; }} keyExtractor={(item, index) => index.toString()}/> : null }
				</ImageBackground>
			</View>
			<View style={styles.bottomBar}>
				{(this.state.token != null) ? <Text style={styles.button} onPress={() => { return this.getSnaps(); }}>Afficher/Rafraîchir les snaps reçus</Text> : null}
			</View>
		</View>);
	}
};

const styles = StyleSheet.create({
	container: {
		display: "flex",
		width: "100%",
		height: "100%"
	},
	snapsContainer: {
		display: "flex",
		flex: 1,
	},
	image: {
		flex: 1,
		resizeMode: "cover"
	},
	list: {
		height: "100%", 
		width: "100%",
		marginBottom: 30,
		paddingTop: 10,
		paddingBottom: 10,
		position: "absolute", 
		backgroundColor: "#00000080"
	},
	item: {
		display: "flex", 
		alignItems: "center",
		height: 30,
		paddingRight: 10,
		paddingLeft: 10,
		color: "#FFFFFF"
	},
	bottomBar: {
		display: "flex",
		flexDirection: "row",
	},
	button: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		width: 240,
		marginTop: 20,
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

export default Home;