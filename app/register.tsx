import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import RegisterSuccessModal from '@/components/RegisterSuccessModal';

const Page = () => {

    const [showPassword, setShowPassword] = useState<boolean>(true);
    const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(true);
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");

    //errros
    const [emailError, setEmailError] = useState<boolean>(false);
    const [passwordError, setPasswordError] = useState<boolean>(false);
    const [confirmPasswordError, setConfirmPasswordError] = useState<boolean>(false);


    const [showModal, setShowModal] = useState(false);

    const toggleCheckPassword = () => {
        setShowPassword(!showPassword);
    };
    const toggleCheckConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const onSubmit = async () => {
        if (!email) {
            setEmailError(true);
            return;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setEmailError(true);
            return;
        }
        if (!password) {
            setPasswordError(true);
            return;
        }
        if (password !== confirmPassword) {
            setConfirmPasswordError(true);
            return;
        }


        



    };



    return (
        <View style={styles.container}>
            {showModal && <RegisterSuccessModal modalVisible={showModal} setModalVisible={setShowModal} />}
            <Image
                source={require('@/assets/images/icon.png')}
                resizeMode='contain'
                style={styles.imageStyle}
            />

            <View style={[styles.textField, { marginTop: hp(5), borderColor: emailError ? "red" : "#FFFFFF" }]}>
                <View style={styles.innerField}>
                    <Ionicons name='mail' size={hp(2.5)} color={'#9E9E9E'} />
                    <TextInput
                        placeholder='Email'
                        placeholderTextColor={'#9E9E9E'}
                        autoCapitalize="none"
                        autoComplete='email'
                        onFocus={() => {
                            setEmailError(false)
                        }}
                        onChangeText={(text) => setEmail(text)}
                        autoCorrect={false}
                        keyboardType="email-address"
                        style={styles.textInputStyle}
                    />
                </View>
            </View>
            <View style={[styles.textField, { borderColor: passwordError ? "red" : "#FFFFFF" }]}>
                <View style={styles.innerField}>
                    <Ionicons name='lock-closed' size={hp(2.5)} color={'#9E9E9E'} />
                    <TextInput
                        placeholder='Password'
                        placeholderTextColor={'#9E9E9E'}
                        secureTextEntry={true}
                        onFocus={() => {
                            setPasswordError(false)
                        }}
                        onChangeText={(text) => setPassword(text)}
                        style={styles.textInputStyle}
                    />
                    <TouchableOpacity onPress={toggleCheckPassword}>
                        <Ionicons name={showPassword ? 'eye-off' : 'eye'} size={hp(2.5)} color={'#9E9E9E'} />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={[styles.textField, { borderColor: confirmPasswordError ? "red" : "#FFFFFF" }]}>
                <View style={styles.innerField}>
                    <Ionicons name='lock-closed' size={hp(2.5)} color={'#9E9E9E'} />
                    <TextInput
                        placeholder='Confirm Password'
                        placeholderTextColor={'#9E9E9E'}
                        secureTextEntry={true}
                        onFocus={() => {
                            setConfirmPasswordError(false)
                        }}
                        onChangeText={(text) => setConfirmPassword(text)}
                        style={styles.textInputStyle}
                    />
                    <TouchableOpacity onPress={toggleCheckConfirmPassword}>
                        <Ionicons name={showPassword ? 'eye-off' : 'eye'} size={hp(2.5)} color={'#9E9E9E'} />
                    </TouchableOpacity>
                </View>
            </View>


            <TouchableOpacity style={styles.btnStyle} onPress={onSubmit}>
                <Text style={styles.btnText}>Register</Text>
            </TouchableOpacity>


            <View style={styles.footer}>
                <TouchableOpacity onPress={() => router.back()}
                    style={styles.footerBtn}
                >
                    <Text style={styles.footerText}>Login Account</Text>
                </TouchableOpacity>
                <Text>|</Text>
                <TouchableOpacity
                    style={styles.footerBtn}
                >
                    <Text style={styles.footerText}>Forgot Password</Text>
                </TouchableOpacity>
            </View>



        </View>
    )
}

export default Page

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center'
    },
    imageStyle: {
        width: wp(80),
        height: hp(22),
    },
    textField: {
        width: wp(90),
        height: hp(7.5),
        borderRadius: wp(4),
        justifyContent: 'center',
        paddingHorizontal: wp(5),
        marginTop: hp(2.5),
        borderWidth: 1,
        backgroundColor: "#F8F8F8"
    },
    innerField: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: wp(4)
    },
    textInputStyle: {
        flex: 1,
        fontFamily: 'UrbanistMedium',
        fontSize: hp(1.9),
    },
    btnStyle: {
        width: wp(90),
        height: hp(7),
        backgroundColor: "#00B4D8",
        borderRadius: wp(10),
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: hp(4)
    },
    footer: {
        marginTop: hp(4),
        flexDirection: 'row',
        alignItems: 'center',
        gap: wp(4)
    },
    footerText: {
        fontFamily: 'UrbanistSemiBold',
        fontSize: hp(1.8),
    },
    footerBtn: {
        paddingVertical: hp(1),
    },
    btnText: {
        fontFamily: 'UrbanistBold',
        fontSize: hp(2),
        color: "#FFFFFF"
    }
})