/* ----------------------------------------------------------------------------- */
/* Dependencies */
/* ----------------------------------------------------------------------------- */
import React, { useEffect, useState } from "react";
import { StyleSheet, View, FlatList, Image, Text } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { uploadEquipImg } from "../../utilities/Upload";
import { FontAwesome5 } from "@expo/vector-icons";
import { getToken } from "../../utilities/Token";
import mime from "mime";

const Snap = () => {
	const [image, setImage] = useState(null);
	const [token, saveToken] = useState(null);
	const [list, setList] = useState(null);
	setInterval(() => { return getToken().then((response) => { return response; }).then((response) => { return saveToken(response); }); }, 500);
	useEffect(() => {
		(async () => {
			if(Platform.OS !== "web") {
				const { status_library } = await ImagePicker.requestMediaLibraryPermissionsAsync();
				const { status_camera } = await ImagePicker.requestCameraPermissionsAsync();
				// if(status_library !== "granted") {
				// 	alert("Désolé, nous avons besoin des permissions sur votre librairie et votre caméra pour faire fonctionner l'app.");
				// };
			};
		})();
	}, []);
	const pickImage = async () => {
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.All,
			allowsEditing: true,
			aspect: [4, 3],
			quality: 1,
		});
		if(!result.cancelled) {
			setImage(result.uri);
			showUsers();
		};
	};
	const takePicture = async () => {
		let result = await ImagePicker.launchCameraAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.All,
			allowsEditing: true,
			aspect: [4, 3],
			quality: 1,
		});
		if(!result.cancelled) {
			setImage(result.uri);
			showUsers();
		};
	};
	const sendSnap = (user) => {
		const newImageUri =  "file:///" + image.split("file:/").join("");
		const formData = new FormData();
		formData.append("image", {
			uri : newImageUri,
			type: mime.getType(newImageUri),
			name: newImageUri.split("/").pop()
		});
		formData.append("duration", 10);
		formData.append("to", user);
		uploadEquipImg(formData, token);
	}
	const showUsers = () => {
		const requestOptions = {
			method: "GET",
			headers: {
				"token": token
			}
		};
		fetch("http://149.91.89.133:6088/all", requestOptions).then((response) => { return response.json(); }).then((json) => { return setList(json.data) });
	};
	return (<View style={styles.container}>
		<View style={styles.snapContainer}>
			{image && <Image source={{ uri: image }} style={{ width: "100%", height: "100%" }}></Image>}
			{(list != null) ? <FlatList style={styles.list} data={list} renderItem={({item}) => { return <Text key={item.email} style={styles.item} onPress={() => { return sendSnap(item.email); }}>{item.email}</Text>; }} keyExtractor={(item, index) => { return index.toString(); }}/> : null }
		</View>
		<View style={styles.bottomBar}>
			<Text style={styles.button} onPress={ pickImage }>
				<FontAwesome5 style={styles.icon} name="images"></FontAwesome5>
			</Text>
			<Text style={styles.button} onPress={ takePicture }>
				<FontAwesome5 style={styles.icon} name="camera"></FontAwesome5>
			</Text>
		</View>
	</View>);
};

const styles = StyleSheet.create({
	container: {
		display: "flex",
		width: "100%",
		height: "100%"
	},
	snapContainer: {
		display: "flex",
		flex: 1,
		marginBottom: 20
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
		marginTop: "auto",
		marginBottom: 20
	},
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
	icon: {
		fontSize: 20
	}
});

export default Snap;