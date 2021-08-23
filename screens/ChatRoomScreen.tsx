import { useRoute } from '@react-navigation/native';
import React from 'react';
import { FlatList, ImageBackground, Text } from 'react-native';
import ChatMessage from '../components/ChatMessage';
import InputBox from '../components/InputBox';
import Chats from '../data/Chats';

export default function ChatRoomScreen() {
	const route: any = useRoute();

	return (
		<ImageBackground
			source={require('../assets/images/bg.png')}
			style={{ width: '100%', height: '100%' }}
		>
			<FlatList
				showsVerticalScrollIndicator={false}
				data={Chats.messages}
				renderItem={({ item }: any) => <ChatMessage message={item} />}
				keyExtractor={(item) => item.id}
				inverted
			/>

			<InputBox chatRoomID={route.params.id} />
		</ImageBackground>
	);
}
