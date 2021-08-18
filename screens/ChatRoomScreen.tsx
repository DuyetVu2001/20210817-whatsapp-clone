import { useRoute } from '@react-navigation/native';
import React from 'react';
import { FlatList, ImageBackground } from 'react-native';
import ChatMessage from '../components/ChatMessage';
import { View } from '../components/Themed';
import Chats from '../data/Chats';

export default function ChatRoomScreen() {
	const route = useRoute();

	return (
		<View>
			<ImageBackground
				source={require('../assets/images/bg.png')}
				style={{ width: '100%', height: '100%' }}
			>
				<FlatList
					showsVerticalScrollIndicator={false}
					data={Chats.messages}
					renderItem={({ item }) => <ChatMessage message={item} />}
					keyExtractor={(item) => item.id}
					inverted
				/>
			</ImageBackground>
		</View>
	);
}
