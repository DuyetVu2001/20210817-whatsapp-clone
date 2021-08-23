import moment from 'moment';
import React from 'react';
import { StyleSheet } from 'react-native';
import { Message } from '../types';
import { Text, View } from './Themed';

export type ChatMessageProps = {
	message: Message;
	myID: any;
};

export default function ChatMessage(props: ChatMessageProps) {
	const { message, myID } = props;

	const isMyMessage: boolean = message.user.id == myID;
	const styleContainer: Object = !isMyMessage && {
		alignSelf: 'flex-start',
		backgroundColor: 'white',
	};

	return (
		<View style={[styles.container, styleContainer]}>
			{!isMyMessage && <Text style={styles.name}>{message.user.name}</Text>}
			<Text style={styles.content}>{message.content}</Text>
			<Text style={styles.time}>{moment(message.createAt).fromNow()}</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		alignSelf: 'flex-end',
		maxWidth: '80%',
		borderRadius: 6,

		marginVertical: 6,
		marginHorizontal: 12,
		paddingVertical: 6,
		paddingHorizontal: 12,

		backgroundColor: '#DCF8C5',
	},

	name: {
		fontSize: 16,
		color: 'salmon',
	},

	content: {
		fontSize: 18,
		marginTop: 4,
	},

	time: {
		alignSelf: 'flex-end',
		color: 'darkgrey',
		marginTop: 4,
		fontSize: 12,
	},
});
