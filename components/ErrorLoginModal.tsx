import { Modal, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { router } from 'expo-router';
interface ModalProps {
    modalVisible: boolean;
    setModalVisible: React.Dispatch<React.SetStateAction<boolean>>; // Ensure correct typing
}

export default function ErrorLoginModal({ modalVisible, setModalVisible }: ModalProps) {
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            presentationStyle='overFullScreen'
            statusBarTranslucent={true}
        >
            <View style={styles.modalStyle}>
                <View style={styles.modalBox}>
                    <Text style={styles.updateTitle}>Error !</Text>
                    <Text style={styles.subtitle}>Invalid email or password. Please try again.</Text>
                    <TouchableOpacity style={styles.updateBtn}
                        onPress={() => setModalVisible(false)}
                    >
                        <Text style={styles.btnText}>OK</Text>
                    </TouchableOpacity>
                </View>
            </View>

        </Modal >
    )
}

const styles = StyleSheet.create({
    modalStyle: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.6)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalBox: {
        width: wp(88),
        height: Platform.OS === 'ios' ? hp(28) : hp(32),
        backgroundColor: "white",
        borderRadius: wp(5),
        alignItems: 'center',
    },
    updateTitle: {
        fontFamily: 'UrbanistBold',
        fontSize: hp(3),
        marginTop: hp(5),
        color: "red"
    },
    subtitle: {
        fontFamily: 'UrbanistMedium',
        fontSize: hp(2),
        textAlign: 'center',
        marginTop: hp(2),
        color: "gray",
        paddingHorizontal: wp(4)
    },
    updateBtn: {
        width: wp(40),
        height: hp(7),
        backgroundColor: "red",
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: wp(2),
        marginTop: hp(3)
    },
    btnText: {
        fontFamily: 'UrbanistSemiBold',
        fontSize: hp(2),
        color: 'white'
    },
})