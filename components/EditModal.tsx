import { Modal, Platform, StyleSheet, Text, TouchableOpacity, View, TextInput, ScrollView, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import DatePicker from 'react-native-date-picker';
import { Ionicons } from '@expo/vector-icons';
import { addEvent, updateEvents } from '@/apis/home';
import useUserStore from '@/store/useUserStore';
import { convertToISOString, formatDate } from '@/utils/format';
import { useQueryClient } from '@tanstack/react-query';
import { useCalendarById } from '@/query/homeQuery';
import { useIsFocused } from '@react-navigation/native';
interface ModalProps {
    modalVisible: boolean;
    item: any;
    setModalVisible: React.Dispatch<React.SetStateAction<boolean>>; // Ensure correct typing
}
export default function EditModal({ modalVisible, setModalVisible, item }: ModalProps) {
    const { token, userId } = useUserStore();
    const isFocused = useIsFocused();
    const queryClient = useQueryClient();
    const [loading, setLoading] = useState<boolean>(false);
    // const { data, isPending } = useCalendarById(item?.id, token, isFocused);
    const convert = convertToISOString(item?.date_time_start);
    const [date, setDate] = useState(new Date(convert));
    const [open, setOpen] = useState(false)
    const [title, setTitle] = useState<string>(item?.title);
    const [desc, setDesc] = useState<string>(item?.description);
    const formattedDate = date.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });
    const format = formatDate(date);
    const addOneDay = (dateString: any) => {
        const date = new Date(dateString);
        date.setDate(date.getDate() + 1);
        return date.toISOString();
    };
    const tomorrow = formatDate(addOneDay(date));

    const data = {
        "user_id": userId,
        "title": title as string,
        "description": desc as string,
        "date_time_start": format,
        "date_time_end": tomorrow,
        "is_private": true
    };

    const onSubmit = async () => {
        setLoading(true);
        try {
            const result = await updateEvents(item?.id, data, token);
            queryClient.invalidateQueries({ queryKey: ['home-calendar'] });
            setTimeout(() => {
                setModalVisible(false);
                setLoading(false);
            }, 1500)
        } catch (error) {
            console.log(error)
            setLoading(false);
        }
    };


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
                    <TouchableOpacity style={styles.closeBtn} onPress={() => setModalVisible(false)}>
                        <Ionicons name='close' size={hp(3)} />
                    </TouchableOpacity>
                    <Text style={styles.updateTitle}>Edit events</Text>
                    <ScrollView>
                        <View>
                            <Text style={styles.titleEvents}>Title Event</Text>
                            <View style={styles.textField}>
                                <TextInput
                                    placeholder='Enter here...'
                                    defaultValue={item?.title}
                                    onChangeText={(text) => setTitle(text)}
                                    style={styles.textInputStyle}
                                />
                            </View>
                        </View>

                        <View>
                            <Text style={styles.titleEvents}>Description Event</Text>
                            <View style={[styles.textField, { height: hp(9) }]}>
                                <TextInput
                                    placeholder='Enter here...'
                                    defaultValue={item?.description}
                                    multiline={true}
                                    onChangeText={(text) => setDesc(text)}
                                    numberOfLines={3}
                                    style={[styles.textInputStyle, { textAlignVertical: 'top', paddingTop: hp(2) }]}
                                />
                            </View>
                        </View>



                        <View>
                            <Text style={styles.titleEvents}>Date Event</Text>
                            <View style={[styles.textField]}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Text style={{ fontFamily: "UrbanistMedium", fontSize: hp(1.9), flex: 1, }}>{formattedDate}</Text>
                                    <DatePicker
                                        modal
                                        open={open}
                                        mode='date'
                                        date={date}
                                        onConfirm={(date) => {
                                            setOpen(false)
                                            setDate(date)
                                        }}
                                        onCancel={() => {
                                            setOpen(false)
                                        }}
                                    />
                                    <TouchableOpacity onPress={() => setOpen(true)} >
                                        <Ionicons name='calendar-outline' size={hp(2.5)} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>



                        <TouchableOpacity style={[styles.saveBtn, { backgroundColor: !title && !desc ? '#DADADA' : '#00B4D8', }]}
                            disabled={!title && !desc ? true : false}
                            onPress={onSubmit}
                        >
                            {loading ? <ActivityIndicator size={'small'} color={'white'} /> : <Text style={styles.btnText}>Update</Text>}
                        </TouchableOpacity>


                    </ScrollView>

                </View>
            </View>

        </Modal>
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
        width: wp(92),
        height: Platform.OS === 'ios' ? hp(74) : hp(75),
        backgroundColor: "white",
        borderRadius: wp(5),
        alignItems: 'center',
        // justifyContent: 'center',
        // paddingHorizontal: Platform.OS === 'ios' ? wp(6) : wp(8),
    },
    updateTitle: {
        fontFamily: 'UrbanistBold',
        fontSize: hp(2.5),
        marginTop: hp(5)
    },
    subtitle: {
        fontFamily: 'UrbanistMedium',
        fontSize: hp(1.8),
        textAlign: 'center',
        marginTop: hp(2),
        color: "gray",
        paddingHorizontal: wp(1)
    },
    updateBtn: {
        width: wp(80),
        height: hp(7),
        backgroundColor: "#0a5ca8",
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: wp(2),
        marginTop: hp(6)
    },
    btnText: {
        fontFamily: 'UrbanistSemiBold',
        fontSize: hp(2),
        color: 'white'
    },

    textField: {
        width: wp(80),
        height: hp(7),
        borderRadius: wp(2),
        justifyContent: "center",
        paddingHorizontal: wp(5),
        marginTop: hp(2.5),
        backgroundColor: "#F8f8f8",
    },
    textInputStyle: {
        flex: 1,
        fontFamily: "UrbanistMedium",
        paddingVertical: hp(1),
        fontSize: hp(2),
    },
    titleEvents: {
        fontFamily: 'UrbanistBold',
        fontSize: hp(2),
        marginTop: hp(4)
    },
    closeBtn: {
        width: wp(10),
        height: wp(10),
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        top: hp(1),
        right: wp(3),
    },
    saveBtn: {
        width: wp(80),
        height: hp(7),
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: hp(4),
        borderRadius: wp(2)
    }
})