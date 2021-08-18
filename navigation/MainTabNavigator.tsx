import { FontAwesome } from '@expo/vector-icons';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React from 'react';
import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import ChatsScreen from '../screens/ChatsScreen';
import { MainTabParamList } from '../types';

const MainTab = createMaterialTopTabNavigator<MainTabParamList>();

export default function MainTabNavigator() {
	const colorScheme = useColorScheme();

	return (
		<MainTab.Navigator
			initialRouteName="Chats"
			tabBarOptions={{
				activeTintColor: Colors[colorScheme].background,
				style: {
					backgroundColor: Colors[colorScheme].tint,
				},
				indicatorStyle: {
					backgroundColor: Colors[colorScheme].background,
					height: 3,
				},
				labelStyle: {
					fontWeight: 'bold',
				},
				showIcon: true,
			}}
		>
			<MainTab.Screen
				name="Camera"
				component={ChatsScreen}
				options={{
					tabBarIcon: ({ color }) => (
						<FontAwesome name="camera" size={18} color={color} />
					),
					tabBarLabel: () => null,
				}}
			/>
			<MainTab.Screen name="Chats" component={ChatsScreen} />
			<MainTab.Screen name="Status" component={ChatsScreen} />
			<MainTab.Screen name="Calls" component={ChatsScreen} />
		</MainTab.Navigator>
	);
}
