import { StyleSheet } from 'react-native';
import { DefaultTheme } from 'react-native-paper';

const globalStyles = StyleSheet.create({
    app: {
        flex: 10,
        padding: 20,
        height: "100%",
        width: "100%",
        backgroundColor: "#FFFFFF"
    },
    container: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    input: {
        marginBottom: 15
    },
    button: {
        marginVertical: 10,
        padding: 10,
        borderRadius: 5
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    }
});

export default globalStyles;
