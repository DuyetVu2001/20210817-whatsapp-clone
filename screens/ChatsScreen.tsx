import React from 'react';
import { FlatList, View } from 'react-native';
import ChatListItem from '../components/ChatListItem';
import NewMessageButton from '../components/NewMessageButton';
import ChatRooms from '../data/ChatRooms';

export default function ChatsScreen() {
	return (
		<View style={{ position: 'relative' }}>
			<FlatList
				showsVerticalScrollIndicator={false}
				data={ChatRooms}
				renderItem={({ item }) => <ChatListItem chatRoom={item} />}
				keyExtractor={(item) => item.id}
				style={{ backgroundColor: 'white', height: '100%' }}
			/>

			<NewMessageButton />
		</View>
	);
}
