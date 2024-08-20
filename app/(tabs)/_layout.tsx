import { Tabs } from 'expo-router';
import React from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Ionicons } from '@expo/vector-icons';
import { Platform } from 'react-native';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  function TabBarIcon(props: {
    name: React.ComponentProps<typeof Ionicons>["name"];
    color: string;
  }) {
    return (
      <Ionicons
        size={Platform.OS === "android" ? 24 : 27}
        style={{ marginBottom: -3 }}
        {...props}
      />
    );
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#FFFFFF",
        tabBarInactiveTintColor: "#DADADA",
        headerShadowVisible: false,
        // tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        // headerShown: false,
        tabBarLabelStyle: {
          fontFamily: 'UrbanistSemiBold',
          marginBottom: 2
        },
        tabBarStyle: {
          backgroundColor: '#00B4D8',
        }
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Default',
          headerTitle: "Default View",
          headerTitleStyle: {
            fontFamily: "UrbanistBold",
            color: "#FFFFFF",
          },
          headerStyle: {
            backgroundColor: '#00B4D8',
          },
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "calendar-clear" : "calendar-clear-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name='week'
        options={{
          title: "Weekly",
          headerTitle: "Week View",
          headerTitleStyle: {
            fontFamily: "UrbanistBold",
            color: "#FFFFFF",
          },
          headerStyle: {
            backgroundColor: '#00B4D8',
          },
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "calendar" : "calendar-outline"}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name='month'
        options={{
          title: "Monthly",
          headerTitle: "Month View",
          headerTitleStyle: {
            fontFamily: "UrbanistBold",
            color: "#FFFFFF",
          },
          headerStyle: {
            backgroundColor: '#00B4D8',
          },
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "calendar-number" : "calendar-number-outline"}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
