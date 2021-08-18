import moment from 'moment';
import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { ChatRoom } from '../types';
import { Text, View } from './Themed';

export type ChatListItemProps = {
	chatRoom: ChatRoom;
};

export default function ChatListItem(props: ChatListItemProps) {
	const { chatRoom } = props;
	const user = chatRoom.users[1];

	return (
		<View style={styles.container}>
			<Image source={{ uri: user.imageUri }} style={styles.avatar} />

			<View style={styles.info}>
				<View style={styles.nameWrapper}>
					<Text style={styles.username}>{user.name}</Text>
					<Text style={styles.time}>
						{moment(chatRoom.lastMessage.createAt).format('DD-MM-YYYY')}
					</Text>
				</View>

				<Text style={styles.content} numberOfLines={1}>
					{chatRoom.lastMessage.content}
				</Text>
			</View>
		</View>
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
		color: 'grey',
	},
});
