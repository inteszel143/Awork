import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { AntDesign, Feather } from '@expo/vector-icons'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import AddEventModal from './AddEventModal';
export default function AddButton() {

    const [openModal, setOpenModal] = useState<boolean>(false);
    const handleOpenModal = () => {
        setOpenModal(!openModal);
    }


    return (
        <View style={{ alignItems: 'flex-end', paddingRight: wp(4) }}>
            {openModal && <AddEventModal modalVisible={openModal} setModalVisible={setOpenModal} />}
            <TouchableOpacity style={styles.btnStyle}
                onPress={handleOpenModal}
            >
                <View style={styles.innerRow}>
                    <Feather name='plus' color={'#FFFFFF'} size={hp(2.5)} />
                    <Text style={styles.fontStyle}>New Schedule</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    btnStyle: {
        width: wp(45),
        height: hp(6.5),
        backgroundColor: "#00B4D8",
        marginTop: hp(2),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: wp(1.5),

    },
    innerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: wp(2)
    },
    fontStyle: {
        fontFamily: 'UrbanistBold',
        fontSize: hp(2),
        color: "#FFFFFF",
    }
})