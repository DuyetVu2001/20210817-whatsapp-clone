import React from 'react';
import { FlatList } from 'react-native';
import ChatListItem from '../components/ChatListItem';
import { View } from '../components/Themed';
import ChatRooms from '../data/ChatRooms';

export default function ChatsScreen() {
	return (
		<View>
			<FlatList
				showsVerticalScrollIndicator={false}
				data={ChatRooms}
				renderItem={({ item }) => <ChatListItem chatRoom={item} />}
				keyExtractor={(item) => item.id}
			/>
		</View>
	);
}
