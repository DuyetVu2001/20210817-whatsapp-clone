import { useNavigation } from '@react-navigation/native';
import { Auth } from 'aws-amplify';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import { ChatRoom } from '../types';
import { Text, View } from './Themed';

export type ChatListItemProps = {
	chatRoom: ChatRoom;
};

export default function ChatListItem(props: ChatListItemProps) {
	const { chatRoom } = props;
	const [otherUser, setOtherUser] = useState(null);

	const navigation = useNavigation();

	useEffect(() => {
		const getOtherUser = async () => {
			const userInfo: any = await Auth.currentAuthenticatedUser();

			userInfo.attributes.sub === chatRoom.chatRoomUsers.items[0].user.id
				? setOtherUser(chatRoom.chatRoomUsers.items[1].user)
				: setOtherUser(chatRoom.chatRoomUsers.items[0].user);
		};

		getOtherUser();
	}, []);

	const handelPress = () => {
		navigation.navigate('ChatRoom', {
			id: chatRoom.id,
			name: otherUser.name,
		});
	};

	if (!otherUser) return null;

	return (
		<TouchableOpacity activeOpacity={0.5} onPress={handelPress}>
			<View style={styles.container}>
				<Image source={{ uri: otherUser.imageUri }} style={styles.avatar} />

				<View style={styles.info}>
					<View style={styles.nameWrapper}>
						<Text style={styles.username}>{otherUser.name}</Text>
						<Text style={styles.time}>
							1-1-2021
							{/* {moment(chatRoom.lastMessage.createAt).format('DD-MM-YYYY')} */}
						</Text>
					</View>

					<Text style={styles.content} numberOfLines={1}>
						nothing...
						{/* {chatRoom.lastMessage.content} */}
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

	time: {
		fontSize: 13,
		color: 'grey',
	},
});
