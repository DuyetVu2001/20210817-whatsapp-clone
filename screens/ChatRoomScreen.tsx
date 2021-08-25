import { useRoute } from '@react-navigation/native';
import { API, Auth, graphqlOperation } from 'aws-amplify';
import React, { useEffect, useState } from 'react';
import { FlatList, ImageBackground } from 'react-native';
import ChatMessage from '../components/ChatMessage';
import InputBox from '../components/InputBox';
import { messagesByChatRoom } from '../src/graphql/queries';
import { onCreateMessage } from '../src/graphql/subscriptions';

export default function ChatRoomScreen() {
	const route: any = useRoute();
	const chatRoomID = route.params.id;

	const [messages, setMessages] = useState([]);
	const [myID, setMyID] = useState(null);

	useEffect(() => {
		const getMyID = async () => {
			try {
				const userInfo: any = await Auth.currentAuthenticatedUser();
				setMyID(userInfo.attributes.sub);
			} catch (error) {
				console.error(error);
			}
		};
		getMyID();
	}, []);

	useEffect(() => {
		const fetchMessages = async () => {
			try {
				const messagesData: any = await API.graphql(
					graphqlOperation(messagesByChatRoom, {
						chatRoomID,
						sortDirection: 'DESC',
					})
				);

				setMessages(messagesData.data.messagesByChatRoom.items);
			} catch (error) {
				console.error(error);
			}
		};

		fetchMessages();
	}, []);

	useEffect(() => {
		const subscription = API.graphql(
			graphqlOperation(onCreateMessage)
		).subscribe({
			next: (data) => {
				const newMessage = data.value.data.onCreateMessage;

				if (newMessage.chatRoomID !== chatRoomID) return;

				setMessages((state) => [newMessage, ...state]);
			},
		});

		return () => subscription.unsubscribe();
	});

	return (
		<ImageBackground
			source={require('../assets/images/bg.png')}
			style={{ width: '100%', height: '100%' }}
		>
			<FlatList
				showsVerticalScrollIndicator={false}
				data={messages}
				renderItem={({ item }: any) => (
					<ChatMessage myID={myID} message={item} />
				)}
				keyExtractor={(item: any) => item.id}
				inverted
			/>

			<InputBox chatRoomID={chatRoomID} />
		</ImageBackground>
	);
}
