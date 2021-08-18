import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import { User } from '../types';
import { Text, View } from './Themed';

export type ContactListItemProps = {
	user: User;
};

export default function ContactListItem(props: ContactListItemProps) {
	const { user } = props;
	const navigation = useNavigation();

	const handelPress = () => {};

	return (
		<TouchableOpacity activeOpacity={0.5} onPress={handelPress}>
			<View style={styles.container}>
				<Image source={{ uri: user.imageUri }} style={styles.avatar} />

				<View style={styles.info}>
					<View style={styles.nameWrapper}>
						<Text style={styles.username}>{user.name}</Text>
					</View>

					<Text style={styles.content} numberOfLines={1}>
						status
					</Text>
				</View>
			</View>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingHorizontal: 16,
		marginVertical: 8,
	},

	avatar: {
		width: 60,
		height: 60,
		borderRadius: 60,
	},

	info: {
		flex: 1,
		marginLeft: 12,
	},

	nameWrapper: {
		flexDirection: 'row',
		justifyContent: 'space-between',
	},

	username: {
		fontSize: 18,
		fontWeight: 'bold',
	},

	content: {
		fontSize: 16,
		color: 'gray',
		marginTop: 4,
	},
});
