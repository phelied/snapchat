/* ----------------------------------------------------------------------------- */
/* Dependencies */
/* ----------------------------------------------------------------------------- */
import React from "react";
import { StyleSheet, View, Image, Text } from "react-native";
import { ProgressBar, Colors } from "react-native-paper";

class SnapDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            snap: null,
            progress: 0,
            count: 0
        };
    }
    componentDidMount() {
        const requestOptions = {
            method: "GET",
            headers: {
                "token": this.props.route.params.token
            }
        };
        fetch("http://149.91.89.133:6088/snap/" + this.props.route.params.snap._id, requestOptions).then((response) => { return response.json(); }).then((response) => {
            this.setState({ snap: response.data });
            if(response.data != null) {
                const progress = setInterval(() => {
                    if(this.state.count < response.data.duration) {
                        this.setState({ count: this.state.count + 1 });
                        this.setState({ progress: this.state.progress + (1 / response.data.duration) });
                    } else {
                        const requestOptions = {
                            method: "POST",
                            headers: {
                                Accept: "application/json",
                                "Content-Type": "application/json",
                                "token": this.props.route.params.token
                            },
                            body: JSON.stringify({ id: response.data._id })
                        };
                        fetch("http://149.91.89.133:6088/seen", requestOptions).then((response) => { return response.json(); }).then((response) => { return alert("Le snap est à présent supprimé ! Veuillez rafraîchir vos snaps !"); }).catch((error) => { return console.log(error); });
                        clearInterval(progress);
                        return this.props.navigation.navigate("Home");
                    };
                }, 1000);
            };
        }).catch((error) => { return console.log(error); });
    }
    render() {
        return(<View nativeID="snapDetailContainer">
            {(this.state.snap != null) ? <Image source={{ uri: "http://149.91.89.133:6088" + this.state.snap.image.link }} style={{ width: "100%", height: "100%" }}></Image> : null}
            {(this.state.snap != null) ? <View style={styles.progressBarContainer}><ProgressBar style={styles.progressBar} progress={this.state.progress} color={Colors.red800}></ProgressBar></View> : null}
        </View>);
    }
};

const styles = StyleSheet.create({
	progressBarContainer: {
        display: "flex",
        width: "100%",
        height: 30,
        paddingTop: 12.5,
        paddingRight: 20,
        paddingLeft: 20,
		position: "absolute",
        bottom: 0,
        backgroundColor: "#00000080"
	},
    progressBar: {
        opacity: 0.5,
        backgroundColor: "#009FFC"
    }
});

export default SnapDetail;