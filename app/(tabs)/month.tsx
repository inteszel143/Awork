import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { Calendar } from 'react-native-calendars';
import AddButton from '@/components/AddButton';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useIsFocused } from '@react-navigation/native';
import { useHomeCalendar } from '@/query/homeQuery';
import useUserStore from '@/store/useUserStore';
const Page = () => {

    const currentDate = new Date();
    const formattedCurrentDate = currentDate.toISOString().split('T')[0];
    const [selected, setSelected] = useState<string>("");
    const isFocused = useIsFocused();
    const { token } = useUserStore();
    const { data, isPending } = useHomeCalendar(isFocused, token);

    const getMarkedDates = (data: any) => {
        const markedDates: { [key: string]: any } = {};
        data.forEach((item: any) => {
            const date = item.date_time_start.split(' ')[0];
            markedDates[date] = {
                selected: true,
                marked: true,
                selectedColor: '#00B4D8',
            };
        });
        return markedDates;
    };
    const markedDates = getMarkedDates(data);
    return (
        <View style={styles.container}>
            <View >
                <AddButton />
            </View>
            <Calendar
                style={{
                    marginHorizontal: wp(2),
                    borderRadius: wp(4),
                    marginTop: hp(2),
                    marginBotton: hp(1),
                    overflow: 'hidden',
                    backgroundColor: "#FFFFFF",
                }}
                theme={{
                    backgroundColor: "#FFFFFF",
                    calendarBackground: "#FFFFFF",
                    textDisabledColor: 'gray',
                    dotColor: '#93C120',
                    selectedDotColor: '#93C120',
                    textSectionTitleColor: '#000',
                    arrowColor: '#0A5CA8',
                    monthTextColor: '#000',
                    dayTextColor: '#000',
                    textDayFontFamily: 'UrbanistMedium',
                    selectedDayTextColor: '#FFFFFF',
                    todayTextColor: '#0A5CA8',
                    textMonthFontFamily: 'UrbanistRegular',
                    textDayHeaderFontFamily: 'UrbanistMedium',
                    textDayFontSize: hp(1.8),
                    textMonthFontSize: hp(2.2),
                    textDayHeaderFontSize: hp(1.9),
                }}
                current={formattedCurrentDate}
                // minDate={formattedCurrentDate}
                pagingEnabled={true}
                // onDayPress={(day: any) => {
                //     setSelected(day.dateString);
                // }}
                markedDates={markedDates}



            />
        </View>
    )
}

export default Page

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})