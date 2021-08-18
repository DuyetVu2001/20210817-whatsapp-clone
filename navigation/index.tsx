import {
	Entypo,
	FontAwesome,
	Ionicons,
	MaterialIcons,
} from '@expo/vector-icons';
import {
	DarkTheme,
	DefaultTheme,
	NavigationContainer,
} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { ColorSchemeName, View } from 'react-native';
import Colors from '../constants/Colors';
import ChatRoomScreen from '../screens/ChatRoomScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
import { RootStackParamList } from '../types';
import LinkingConfiguration from './LinkingConfiguration';
import MainTabNavigator from './MainTabNavigator';

export default function Navigation({
	colorScheme,
}: {
	colorScheme: ColorSchemeName;
}) {
	return (
		<NavigationContainer
			linking={LinkingConfiguration}
			theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
		>
			<RootNavigator />
		</NavigationContainer>
	);
}

const Stack = createStackNavigator<RootStackParamList>();

function RootNavigator() {
	return (
		<Stack.Navigator
			screenOptions={{
				headerStyle: {
					backgroundColor: Colors.light.tint,
					shadowOpacity: 0,
					elevation: 0,
				},
				headerTintColor: Colors.dark.text,
				headerTitleAlign: 'left',
				headerTitleStyle: {
					fontSize: 20,
				},
			}}
		>
			<Stack.Screen
				name="Root"
				component={MainTabNavigator}
				options={{
					title: 'Whatsapp',
					headerRight: () => (
						<View
							style={{
								flexDirection: 'row',
								justifyContent: 'space-between',
								width: 60,
								marginRight: 8,
							}}
						>
							<Ionicons name="search" size={24} color={Colors.dark.text} />
							<Entypo
								name="dots-three-vertical"
								size={24}
								color={Colors.dark.text}
							/>
						</View>
					),
				}}
			/>
			<Stack.Screen
				name="ChatRoom"
				component={ChatRoomScreen}
				options={({ route }) => ({
					title: route.params.name,
					headerRight: () => (
						<View
							style={{
								flexDirection: 'row',
								justifyContent: 'space-between',
								marginRight: 6,
								width: 120,
							}}
						>
							<FontAwesome
								name="video-camera"
								size={24}
								color={Colors.dark.text}
							/>
							<MaterialIcons
								style={{ marginLeft: 4 }}
								name="call"
								size={24}
								color={Colors.dark.text}
							/>
							<Entypo
								name="dots-three-vertical"
								size={24}
								color={Colors.dark.text}
							/>
						</View>
					),
				})}
			/>
			<Stack.Screen
				name="NotFound"
				component={NotFoundScreen}
				options={{ title: 'Oops!' }}
			/>
		</Stack.Navigator>
	);
}
