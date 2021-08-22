import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';

import { withAuthenticator } from 'aws-amplify-react-native';
import Amplify, { API, Auth, graphqlOperation } from 'aws-amplify';
import config from './src/aws-exports';
import { getUser } from './src/graphql/queries';
import { createUser } from './src/graphql/mutations';
Amplify.configure(config);

function App() {
	const isLoadingComplete = useCachedResources();
	const colorScheme = useColorScheme();

	const randomImages = [
		'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/1.jpg',
		'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/2.jpg',
		'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/3.jpg',
		'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/3.png',
		'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/4.jpg',
		'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/5.jpg',
		'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/6.png',
		'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/7.png',
		'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/8.png',
		'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/9.png',
	];

	const getRandomImages = () =>
		randomImages[Math.floor(Math.random() * randomImages.length)];

	useEffect(() => {
		const fetchUser = async () => {
			// Get authenticated user from Auth
			const userInfo = await Auth.currentAuthenticatedUser({
				bypassCache: true,
			});

			if (userInfo) {
				//get the user from backend with the user sub from auth
				const userData: any = await API.graphql(
					graphqlOperation(getUser, { id: userInfo.attributes.sub })
				);

				if (userData.data.getUser) {
					console.log('User is already exist!');
					return;
				}

				//if there is nothing user from db, then create one
				const newUser = {
					id: userInfo.attributes.sub,
					name: userInfo.username,
					imageUri: getRandomImages(),
					status: 'I am online',
				};

				await API.graphql(graphqlOperation(createUser, { input: newUser }));
			}
		};

		fetchUser();
	}, []);

	if (!isLoadingComplete) {
		return null;
	} else {
		return (
			<SafeAreaProvider>
				<Navigation colorScheme={colorScheme} />
				<StatusBar />
			</SafeAreaProvider>
		);
	}
}

export default withAuthenticator(App);
