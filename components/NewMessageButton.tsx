import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import Colors from '../constants/Colors';

export default function NewMessageButton() {
	const navigation = useNavigation();

	const handlePress = () => {
		navigation.navigate('Contacts');
	};

	return (
		<TouchableOpacity
			style={styles.container}
			activeOpacity={0.8}
			onPress={handlePress}
		>
			<MaterialIcons name="message" size={28} color="white" />
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	container: {
		position: 'absolute',
		bottom: 16,
		right: 16,

		justifyContent: 'center',
		alignItems: 'center',
		width: 62,
		height: 62,
		borderRadius: 36,

		backgroundColor: Colors.light.tint,
	},
});
