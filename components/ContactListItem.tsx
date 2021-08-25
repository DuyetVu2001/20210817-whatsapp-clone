import { useNavigation } from '@react-navigation/native';
import { API, Auth, graphqlOperation } from 'aws-amplify';
import React from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import { createChatRoom, createChatRoomUser } from '../src/graphql/mutations';
import { User } from '../types';
import { Text, View } from './Themed';

export type ContactListItemProps = {
	user: User;
};

export default function ContactListItem(props: ContactListItemProps) {
	const { user } = props;
	const navigation = useNavigation();

	const handelPress = async () => {
		try {
			// 1. Create a new chat room
			const newChatRoomData: any = await API.graphql(
				graphqlOperation(createChatRoom, {
					input: {
						lastMessageID: 'ds1dfd2e-0e0a-4993-a99d-5349aa846394',
					},
				})
			);

			if (!newChatRoomData.data) {
				console.log('Failed to create chat room!');
				return;
			}

			const newChatRoom = newChatRoomData.data.createChatRoom;

			// 2. Add 'user' to the chat room
			await API.graphql(
				graphqlOperation(createChatRoomUser, {
					input: {
						userID: user.id,
						chatRoomID: newChatRoom.id,
					},
				})
			);

			// 3. Add authenticated user to the chat room
			const userInfo = await Auth.currentAuthenticatedUser();
			await API.graphql(
				graphqlOperation(createChatRoomUser, {
					input: {
						userID: userInfo.attributes.sub,
						chatRoomID: newChatRoom.id,
					},
				})
			);

			navigation.navigate('ChatRoom', {
				id: newChatRoom.id,
				name: 'Hardcoded',
			});
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<TouchableOpacity activeOpacity={0.5} onPress={handelPress}>
			<View style={styles.container}>
				<Image source={{ uri: user.imageUri }} style={styles.avatar} />

				<View style={styles.info}>
					<View style={styles.nameWrapper}>
						<Text style={styles.username}>{user.name}</Text>
					</View>

					<Text style={styles.content} numberOfLines={1}>
						{user.status}
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
