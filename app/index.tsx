import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { loginUser } from '@/apis/auth';
import ErrorLoginModal from '@/components/ErrorLoginModal';
import useUserStore from '@/store/useUserStore';
const Page = () => {
    const { setToken, setUserId, setEmails } = useUserStore();
    const [showPassword, setShowPassword] = useState<boolean>(true);
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [showModal, setShowModal] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    //errros
    const [emailError, setEmailError] = useState<boolean>(false);
    const [passwordError, setPasswordError] = useState<boolean>(false);

    const toggleCheckPassword = () => {
        setShowPassword(!showPassword);
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
        setLoading(true);
        try {
            const result = await loginUser(email as string, password as string);
            setToken(result?.data?.token);
            setUserId(result?.data?.user?.id);
            setEmails(result?.data?.user?.email);
            setTimeout(() => {
                router.push('/(tabs)');
                setLoading(false);
            }, 2000);
        } catch (error) {
            console.log(error);
            setShowModal(true);
            setLoading(false);
        }
    }


    return (
        <View style={styles.container}>
            {showModal && <ErrorLoginModal modalVisible={showModal} setModalVisible={setShowModal} />}

            <ScrollView>

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


                <View style={[styles.textField, { borderColor: passwordError ? 'red' : '#FFFFFF' }]}>
                    <View style={styles.innerField}>
                        <Ionicons name='lock-closed' size={hp(2.5)} color={'#9E9E9E'} />
                        <TextInput
                            placeholder='Password'
                            onChangeText={(text) => setPassword(text)}
                            autoCapitalize="none"
                            onFocus={() => {
                                setPasswordError(false)
                            }}
                            secureTextEntry={showPassword}
                            placeholderTextColor={'#9E9E9E'}
                            style={styles.textInputStyle}
                        />


                        <TouchableOpacity onPress={toggleCheckPassword}>
                            <Ionicons name={showPassword ? 'eye-off' : 'eye'} size={hp(2.5)} color={'#9E9E9E'} />
                        </TouchableOpacity>
                    </View>
                </View>


                <TouchableOpacity style={styles.btnStyle} onPress={onSubmit}>
                    {loading ? <ActivityIndicator size={'small'} color={'white'} /> : <Text style={styles.btnText}>Login</Text>}
                </TouchableOpacity>


                <View style={styles.footer}>
                    <TouchableOpacity onPress={() => router.push('/register')}
                        style={styles.footerBtn}
                    >
                        <Text style={styles.footerText}>Create Account</Text>
                    </TouchableOpacity>
                    <Text>|</Text>
                    <TouchableOpacity
                        style={styles.footerBtn}
                    >
                        <Text style={styles.footerText}>Forgot Password</Text>
                    </TouchableOpacity>
                </View>

            </ScrollView>

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
        height: hp(20),
        marginTop: hp(14),
        alignSelf: 'center'
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
        gap: wp(4),
        alignSelf: 'center'
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
    },
    errorViewStyle: {
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10
    },
    errorStyle: {
        fontFamily: 'UrbanistRegular',
        fontSize: hp(1.8),
        color: "#ED4337"
    },
})