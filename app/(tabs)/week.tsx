import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { Agenda, Calendar } from 'react-native-calendars';
import AddButton from '@/components/AddButton';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useIsFocused } from '@react-navigation/native';
import { useHomeCalendar } from '@/query/homeQuery';
import useUserStore from '@/store/useUserStore';
import { transformData } from '@/utils/validate';
interface AgendaItem {
    name: string;
    height: number;
}

interface AgendaItems {
    [key: string]: AgendaItem[];
}

const Page = () => {
    const isFocused = useIsFocused();
    const { token } = useUserStore();
    const { data, isPending } = useHomeCalendar(isFocused, token);
    const transformedData = transformData(data);


    const renderItem = (item: any) => {
        return (
            <Pressable style={{ margin: 10, padding: 20, backgroundColor: 'lightblue' }}>
                <Text>{item.name}</Text>
            </Pressable>
        );
    };

    return (
        <View style={styles.container}>
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
})