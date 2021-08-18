export type RootStackParamList = {
	Root: undefined;
	NotFound: undefined;
	ChatRoom: undefined;
};

export type MainTabParamList = {
	Camera: undefined;
	Chats: undefined;
	Status: undefined;
	Calls: undefined;
};

export type User = {
	id: string;
	name: string;
	imageUri: string;
	// status: string;
};

export type Message = {
	id: string;
	content: string;
	createAt: string;
	// user: User;
};

export type ChatRoom = {
	id: string;
	users: User[];
	lastMessage: Message;
};
