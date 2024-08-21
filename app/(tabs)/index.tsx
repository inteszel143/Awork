import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Calendar } from 'react-native-calendars';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { StatusBar } from 'expo-status-bar';
import AddButton from '@/components/AddButton';
import useUserStore from '@/store/useUserStore';
import { useHomeCalendar } from '@/query/homeQuery';
import { useIsFocused } from '@react-navigation/native';
import { deleteEvent, getHomeCalendar } from '@/apis/home';
import { filterBySelectedDate } from '@/utils/validate';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { convertDateToLongFormat } from '@/utils/format';
import { useQueryClient } from '@tanstack/react-query';
import EditModal from '@/components/EditModal';
const Page = () => {
  const queryClient = useQueryClient();
  const currentDate = new Date();
  const formattedCurrentDate = currentDate.toISOString().split('T')[0];
  const [selected, setSelected] = useState<string>("");
  const isFocused = useIsFocused();
  const { token } = useUserStore();
  const { data, isPending } = useHomeCalendar(isFocused, token);
  const filteredData = filterBySelectedDate(data, selected);
  const [items, setItems] = useState<any>();

  const [showModal, setShowModal] = useState<boolean>(false);

  const handleDeleteEvent = async (id: any) => {
    try {
      const result = await deleteEvent(id, token);
      queryClient.invalidateQueries({ queryKey: ['home-calendar'] });
      // console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style='light' />
      {showModal && <EditModal modalVisible={showModal} setModalVisible={setShowModal} item={items} />}
      <View>
        <AddButton />
      </View>


      <Calendar
        style={{
          marginHorizontal: wp(4),
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
        onDayPress={(day: any) => {
          setSelected(day.dateString);
        }}
        markedDates={{
          [formattedCurrentDate]: {
            marked: true,
            dotColor: '#0A5CA8',
          },
          [selected]: { selected: true, disableTouchEvent: true, selectedDotColor: 'orange' }
        }}

      />


      {
        filteredData == 0 ?
          <View style={styles.eventCard}>
            <Text style={styles.fontStyle}>No event found</Text>
          </View>
          :
          <View>
            <FlatList
              style={{
                height: hp(34)
              }}
              data={filteredData}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => (
                <TouchableOpacity style={styles.btnStyle}
                  onPress={() => {
                    setShowModal(true);
                    setItems(item);
                  }}
                >
                  <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <View>
                      <Text style={styles.title}>{item?.title}</Text>
                      <Text style={styles.sub}>{item?.description}</Text>
                      <Text style={styles.dateTimeStyle}>{convertDateToLongFormat(item?.date_time_start)}</Text>
                    </View>
                    <TouchableOpacity
                      onPress={() => handleDeleteEvent(item?.id)}
                    >
                      <MaterialCommunityIcons name='trash-can-outline' size={hp(2.6)} color={'red'} />
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
              )}

            />
          </View>
      }
    </View>
  )
}

export default Page

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#F8F8F8"
  },
  eventCard: {
    width: wp(94),
    backgroundColor: "#FFFFFF",
    height: hp(20),
    marginTop: hp(2),
    alignSelf: 'center',
    borderRadius: wp(4),
    alignItems: 'center',
    justifyContent: 'center'
  },
  fontStyle: {
    fontFamily: "UrbanistSemiBold",
    fontSize: hp(2),
    color: "#616161"
  },
  titleStyle: {
    fontFamily: "UrbanistBold",
    fontSize: hp(2),
  },
  btnStyle: {
    width: wp(92),
    paddingVertical: hp(2),
    backgroundColor: '#FFFFFF',
    marginTop: hp(1.2),
    borderRadius: wp(2),
    alignSelf: 'center',
    paddingHorizontal: wp(6)
  },
  title: {
    fontFamily: 'UrbanistMedium',
    fontSize: hp(1.9)
  },
  sub: {
    width: wp(70),
    flex: 1,
    fontFamily: 'UrbanistRegular',
    fontSize: hp(1.8),
    color: '#616161',
    marginTop: hp(1)
  },
  dateTimeStyle: {
    marginTop: hp(1.5),
    fontFamily: 'UrbanistMedium',
    fontSize: hp(1.7)
  }

})