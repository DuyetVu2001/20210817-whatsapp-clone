import React from 'react';
import { FlatList, View } from 'react-native';
import ContactListItem from '../components/ContactListItem';
import Users from '../data/Users';

export default function ContactsScreen() {
	return (
		<View style={{ position: 'relative' }}>
			<FlatList
				showsVerticalScrollIndicator={false}
				data={Users}
				renderItem={({ item }) => <ContactListItem user={item} />}
				keyExtractor={(item) => item.id}
				style={{ backgroundColor: 'white', height: '100%' }}
			/>
		</View>
	);
}
