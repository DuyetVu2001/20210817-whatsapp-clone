import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import ChatListItem from '../components/ChatListItem';
import { View } from '../components/Themed';
import ChatRooms from '../data/ChatRooms';

export default function ChatsScreen() {
	return (
		<View style={styles.container}>
			<FlatList
				showsVerticalScrollIndicator={false}
				style={styles.flatList}
				data={ChatRooms}
				renderItem={({ item }) => <ChatListItem chatRoom={item} />}
				keyExtractor={(item) => item.id}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {},

	flatList: {},
});
