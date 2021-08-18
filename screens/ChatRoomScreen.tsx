import { useRoute } from '@react-navigation/native';
import React from 'react';
import { StyleSheet } from 'react-native';
import { Text, View } from '../components/Themed';

export default function ChatRoomScreen() {
	const route = useRoute();

	console.log(route.params);

	return (
		<View style={styles.container}>
			<Text>Chat room</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {},
});
