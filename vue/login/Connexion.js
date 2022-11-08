import React, {useState} from "react";
import { Text, Animated, View, StyleSheet, Image, ImageBackground, TextInput, ToastAndroid } from "react-native";
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";

export default function Connexion({navigation}) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function onPressLogin() {
        if(email.length > 0 && password.length > 0) {
            if(email === 'Toto' && password === 'Toto') {
                navigation.navigate("FightPVE");
            } else {
                ToastAndroid.showWithGravity('Adresse mail ou mot de passe incorrect', ToastAndroid.LONG, ToastAndroid.CENTER);
            }
        } else {
            ToastAndroid.showWithGravity('Veuillez remplir tout les champs', ToastAndroid.LONG, ToastAndroid.CENTER);
        }
    }

    return(
        <View style={styles.container}>
                <ImageBackground source={require('./../../images/backgroundLogin.jpg')} style={styles.background}>
                    <View style={styles.screen}>
                        <Text style={styles.title}>CONNEXION</Text>
                        <View style={styles.form}>
                            <Text style={styles.textEmail}>Adresse mail: </Text>
                            <TextInput
                                style={styles.inputEmail}
                                value={email}
                                onChangeText={setEmail}
                                placeholder="Votre adresse mail"
                                keyboardType="email"
                            />
                            <Text style={styles.textPassword}>Mot de passe: </Text>
                            <TextInput
                                style={styles.inputPassword}
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry={true}
                                placeholder="Votre mot de passe"
                                keyboardType="password"
                            />
                            <Pressable onPress={() => onPressLogin()} style={styles.onPressLogin}>
                                <Text style={styles.textPressLogin}>S'identifier</Text>
                            </Pressable>
                            <View style={styles.register}>
                                <Text style={styles.registerText}>Inscrivez-vous</Text>
                            </View>
                        </View>
                        <Text style={styles.forgotPasswordText}>
                            Mot de passe oublié ?
                        </Text>
                    </View>
                </ImageBackground>
        </View>
    )

}

const styles = new StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    screen : {
        backgroundColor: 'rgba(40,40,40,0.63)',
        height: '100%',
        width: '100%'
    },

    background: {
        flex: 1,
        resizeMode: 'cover',
    },
    title: {
        marginTop: 120,
        color: 'white',
        fontSize: 42,
        fontWeight: 'bold',
        textAlign: 'center',
        borderRadius: 10,
        marginRight: 15,
        marginLeft: 15
    },
    form: {
        marginTop: 130,
        marginRight: 35,
        marginLeft: 35,
    },
    textEmail: {
        color: 'white'
    },
    textPassword: {
        marginTop: 35,
        color: 'white'
    },
    inputEmail: {
        marginTop: 5,
        padding: 8,
        backgroundColor: 'rgba(255,255,255,0.63)',
        color: 'black',
        borderRadius: 15
    },
    inputPassword: {
        marginTop: 5,
        padding: 8,
        backgroundColor: 'rgba(255,255,255,0.63)',
        color: 'black',
        borderRadius: 15
    },
    onPressLogin: {
        marginTop: 35,
        backgroundColor: 'rgba(10,10,10,0.63)',
        /*marginRight: 25,
        marginLeft: 25,*/
        padding: 10,
        borderRadius: 20
    },
    textPressLogin: {
        textAlign: 'center',
        fontSize: 15,
        color: 'white',
    },
    register: {
        marginTop: 12
    },
    registerText: {
        textAlign: 'right',
        color: 'white'
    },
    forgotPasswordText: {
        marginTop: 195,
        textAlign: 'center',
        color: 'white'
    }
});