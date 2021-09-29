import AsyncStorage from "@react-native-async-storage/async-storage";

export const getToken = async () => {
    try {
        const value = await AsyncStorage.getItem("@auth_token");
        if(value !== null) {
            return value;
        };
    } catch(error) {
        return null;
    };
};

export const setToken = async (token) => {
    try {
        await AsyncStorage.setItem("@auth_token", token);
    } catch(error) {
        return null;
    };
};

export const removeToken = async ({ navigation }) => {
    try {
        await AsyncStorage.removeItem("@auth_token");
        return navigation.navigate("Login");
    } catch(error) {
        return null;
    };
};