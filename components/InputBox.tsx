import {
	Entypo,
	FontAwesome,
	FontAwesome5,
	MaterialIcons,
} from '@expo/vector-icons';
import { API, Auth, graphqlOperation } from 'aws-amplify';
import React, { useEffect, useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import Colors from '../constants/Colors';
import { createMessage } from '../src/graphql/mutations';

export default function InputBox(props: any) {
	const { chatRoomID } = props;

	const [message, setMessage] = useState('');
	const [myUserId, setMyUserId] = useState(null);

	useEffect(() => {
		const fetchUser = async () => {
			try {
				const userInfo: any = await Auth.currentAuthenticatedUser();
				setMyUserId(userInfo.attributes.sub);
			} catch (error) {
				console.error(error);
			}
		};
		fetchUser();
	}, []);

	const onMicrophonePress = () => {
		console.warn('Microphone press!');
	};

	const onSendPress = async () => {
		try {
			await API.graphql(
				graphqlOperation(createMessage, {
					input: {
						content: message,
						userID: myUserId,
						chatRoomID,
					},
				})
			);

			setMessage('');
		} catch (error) {
			console.error(error);
		}
	};

	const handlePress = () => {
		message ? onSendPress() : onMicrophonePress();
	};

	return (
		<View style={styles.container}>
			<View style={styles.inputWrapper}>
				<FontAwesome5 name="smile-beam" size={22} color="gray" />
				<TextInput
					style={styles.inputField}
					placeholder={'Type a message'}
					multiline
					value={message}
					onChangeText={setMessage}
				/>
				<Entypo
					style={{ marginRight: 16 }}
					name="attachment"
					size={22}
					color="gray"
				/>
				<FontAwesome name="camera" size={22} color="gray" />
			</View>
			<TouchableOpacity
				onPress={handlePress}
				style={styles.microphoneWrapper}
				activeOpacity={0.6}
			>
				{!message ? (
					<FontAwesome name="microphone" size={22} color="white" />
				) : (
					<MaterialIcons name="send" size={22} color="white" />
				)}
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',

		marginBottom: 6,
		marginTop: 12,
		marginHorizontal: 8,
	},

	inputWrapper: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',

		paddingVertical: 10,
		paddingHorizontal: 16,
		borderRadius: 36,
		backgroundColor: 'white',
	},

	inputField: {
		flex: 1,
		marginHorizontal: 8,
		fontSize: 18,
	},

	microphoneWrapper: {
		justifyContent: 'center',
		alignItems: 'center',

		width: 52,
		height: 52,
		marginLeft: 4,
		borderRadius: 36,

		backgroundColor: Colors.light.tint,
	},
});
