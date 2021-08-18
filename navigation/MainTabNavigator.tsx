import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import TabOneScreen from '../screens/TabOneScreen';
import TabTwoScreen from '../screens/TabTwoScreen';
import { MainTabParamList, TabOneParamList, TabTwoParamList } from '../types';

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
				component={TabOneNavigator}
				options={{
					tabBarIcon: ({ color }) => (
						<FontAwesome name="camera" size={18} color={color} />
					),
					tabBarLabel: () => null,
				}}
			/>
			<MainTab.Screen name="Chats" component={TabTwoNavigator} />
			<MainTab.Screen name="Status" component={TabOneNavigator} />
			<MainTab.Screen name="Calls" component={TabTwoNavigator} />
		</MainTab.Navigator>
	);
}

function TabBarIcon(props: {
	name: React.ComponentProps<typeof Ionicons>['name'];
	color: string;
}) {
	return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}

const TabOneStack = createStackNavigator<TabOneParamList>();

function TabOneNavigator() {
	return (
		<TabOneStack.Navigator>
			<TabOneStack.Screen
				name="TabOneScreen"
				component={TabOneScreen}
				options={{ headerTitle: 'Tab One Title' }}
			/>
		</TabOneStack.Navigator>
	);
}

const TabTwoStack = createStackNavigator<TabTwoParamList>();

function TabTwoNavigator() {
	return (
		<TabTwoStack.Navigator>
			<TabTwoStack.Screen
				name="TabTwoScreen"
				component={TabTwoScreen}
				options={{ headerTitle: 'Tab Two Title' }}
			/>
		</TabTwoStack.Navigator>
	);
}
