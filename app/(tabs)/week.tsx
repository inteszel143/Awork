import { Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { Agenda, Calendar } from 'react-native-calendars';
import AddButton from '@/components/AddButton';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useIsFocused } from '@react-navigation/native';
import { useHomeCalendar } from '@/query/homeQuery';
import useUserStore from '@/store/useUserStore';
import { transformData } from '@/utils/validate';
import EditModal from '@/components/EditModal';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { deleteEvent } from '@/apis/home';
import { useQueryClient } from '@tanstack/react-query';
interface AgendaItem {
    name: string;
    height: number;
}

interface AgendaItems {
    [key: string]: AgendaItem[];
}

const Page = () => {
    const queryClient = useQueryClient();
    const isFocused = useIsFocused();
    const { token } = useUserStore();
    const { data, isPending } = useHomeCalendar(isFocused, token);
    const transformedData = transformData(data);
    const [items, setItems] = useState<any>();
    const [showEditModal, setShowEditModal] = useState<boolean>(false);

    const handleDeleteEvent = async (id: any) => {
        try {
            const result = await deleteEvent(id, token);
            queryClient.invalidateQueries({ queryKey: ['home-calendar'] });
            // console.log(result);
        } catch (error) {
            console.log(error);
        }
    };


    const renderItem = (item: any) => {
        return (
            <View style={styles.cardStyle}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Text style={styles.title}>{item.name}</Text>
                    <TouchableOpacity
                        onPress={() => handleDeleteEvent(item?.id)}
                    >
                        <MaterialCommunityIcons name='trash-can-outline' size={hp(2.5)} color={'red'} />
                    </TouchableOpacity>
                </View>
            </View>
        );
    };

    return (
        <View style={styles.container}>

            {/* {showEditModal && <EditModal modalVisible={showEditModal} setModalVisible={setShowEditModal} item={items} />} */}

            <View style={{ marginBottom: hp(2) }}>
                <AddButton />
            </View>
            <Agenda
                items={transformedData}
                renderItem={renderItem}
                renderEmptyData={() => <View style={styles.eventCard}><Text style={styles.fontStyle}>No event found!</Text></View>}
            />
        </View>
    )
}

export default Page

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    eventCard: {
        width: wp(96),
        backgroundColor: "#FFFFFF",
        height: hp(30),
        marginTop: hp(2),
        alignSelf: 'center',
        borderRadius: wp(2),
        alignItems: 'center',
        justifyContent: 'center'
    },
    fontStyle: {
        fontFamily: "UrbanistSemiBold",
        fontSize: hp(1.9),
        color: "#616161"
    },
    title: {
        fontFamily: "UrbanistRegular",
        fontSize: hp(1.8),
    },
    cardStyle: {
        margin: 10, padding: 20,
        backgroundColor: 'lightblue'
    }
})