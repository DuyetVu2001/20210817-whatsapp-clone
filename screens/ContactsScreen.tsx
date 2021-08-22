import { API, graphqlOperation } from 'aws-amplify';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { FlatList, View } from 'react-native';
import ContactListItem from '../components/ContactListItem';
import { listUsers } from '../src/graphql/queries';

export default function ContactsScreen() {
	const [users, setUsers] = useState([]);

	useEffect(() => {
		const fetchUsers = async () => {
			try {
				const usersData: any = await API.graphql(graphqlOperation(listUsers));
				setUsers(usersData.data.listUsers.items);
			} catch (error) {
				console.error(error);
			}
		};

		fetchUsers();
	}, []);

	return (
		<View style={{ position: 'relative' }}>
			<FlatList
				showsVerticalScrollIndicator={false}
				data={users}
				renderItem={({ item }) => <ContactListItem user={item} />}
				keyExtractor={(item: any) => item.id}
				style={{ backgroundColor: 'white', height: '100%' }}
			/>
		</View>
	);
}
