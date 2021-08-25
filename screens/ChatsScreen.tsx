import { API, Auth, graphqlOperation } from 'aws-amplify';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { FlatList, View } from 'react-native';
import ChatListItem from '../components/ChatListItem';
import NewMessageButton from '../components/NewMessageButton';
import { getUser } from './queries';

export default function ChatsScreen() {
	const [chatRooms, setChatRooms] = useState([]);

	useEffect(() => {
		const fetchChatRooms = async () => {
			try {
				const userInfo: any = await Auth.currentAuthenticatedUser();
				const userData: any = await API.graphql(
					graphqlOperation(getUser, { id: userInfo.attributes.sub })
				);

				setChatRooms(userData.data.getUser.chatRoomUsers.items);
			} catch (error) {
				console.error(error);
			}
		};

		fetchChatRooms();
	}, []);

	return (
		<View style={{ position: 'relative' }}>
			<FlatList
				showsVerticalScrollIndicator={false}
				data={chatRooms}
				renderItem={({ item }) => <ChatListItem chatRoom={item.chatRoom} />}
				keyExtractor={(item: any) => item.id}
				style={{ backgroundColor: 'white', height: '100%' }}
			/>

			<NewMessageButton />
		</View>
	);
}
