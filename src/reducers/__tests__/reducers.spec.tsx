import messagesReducer from '../../reducers/messagesReducer';
import { Message, AnyMessagesACtion, AnyUsersAction, User } from '../../types/commonTypes';
import getTimeInHHMMFormat from '../../utils/getCurrentTime';
import { describe, test, expect, vi, beforeEach } from 'vitest';
import usersReducer from '../usersReducer';
// vi.mock('../utils/getCurrentTime'); // Mocking the time function


vi.mock('../../utils/getCurrentTime', () => ({
    default: vi.fn(), 
  }));
describe('messagesReducer', () => {
    let initialMessages: Array<Array<Message>>;

    beforeEach(() => {
        initialMessages = [
            [{ messageTime: '10:00', sentMessage: 'Hello' }],
            [{ messageTime: '11:00', sentMessage: 'Hi there' }],
        ];

        (getTimeInHHMMFormat as jest.Mock).mockReturnValue('12:00'); 
    });

    test('should add a message for ADD_MESSAGE action', () => {
        const action: AnyMessagesACtion = {
            type: 'ADD_MESSAGE',
            activeUserId: 0,
            lastMessage: 'New message',
        };

        const updatedMessages = messagesReducer(initialMessages, action);

        expect(updatedMessages[0]).toHaveLength(2);
        expect(updatedMessages[0][1]).toEqual({
            messageTime: '12:00',
            sentMessage: 'New message',
        });
    });

    test('should delete a message for DELETE_MESSAGE action', () => {
        const action: AnyMessagesACtion = {
            type: 'DELETE_MESSAGE',
            activeUserId: 1,
            messageId: 0,
        };

        const updatedMessages = messagesReducer(initialMessages, action);

        expect(updatedMessages[1]).toHaveLength(0); // Message should be deleted
    });

    test('should edit a message for EDIT_MESSAGE action', () => {
        const action: AnyMessagesACtion = {
            type: 'EDIT_MESSAGE',
            activeUserId: 0,
            messageId: 0,
            newMessage: 'Updated message',
        };

        const updatedMessages = messagesReducer(initialMessages, action);

        expect(updatedMessages[0][0].sentMessage).toBe('Updated message');
    });

    test('should add a new user for ADD_USER action', () => {
        const action: AnyMessagesACtion = {
            type: 'ADD_USER',
        };

        const updatedMessages = messagesReducer(initialMessages, action);

        expect(updatedMessages).toHaveLength(3); 
        expect(updatedMessages[2]).toEqual([]); 
    });

    test('should remove a user for REMOVE_USER action', () => {
        const action: AnyMessagesACtion = {
            type: 'REMOVE_USER',
            userId: 0,
        };

        const updatedMessages = messagesReducer(initialMessages, action);

        expect(updatedMessages).toHaveLength(1); 
        expect(updatedMessages[0][0].sentMessage).toBe('Hi there'); 
    });

    test('should replace messages for LOCAL_MESSAGES action', () => {
        const newMessages: Array<Array<Message>> = [
            [{ messageTime: '14:00', sentMessage: 'New local message' }],
        ];

        const action: AnyMessagesACtion = {
            type: 'LOCAL_MESSAGES',
            messages: newMessages,
        };

        const updatedMessages = messagesReducer(initialMessages, action);

        expect(updatedMessages).toBe(newMessages); 
    });

});






describe('usersReducer', () => {
    let initialUsers: Array<User>;

    beforeEach(() => {
        initialUsers = [
            { id: 'user_id_1', name: 'Alice', profileImg: 'https://example.com/alice.jpg', lastMessage: 'Hello!' },
            { id: 'user_id_2', name: 'Bob', profileImg: 'https://example.com/bob.jpg', lastMessage: 'Hi there!' },
        ];
    });

    test('should set the last message for SET_LAST_MESSAGE action', () => {
        const action: AnyUsersAction = {
            type: 'SET_LAST_MESSAGE',
            activeUserId: 1,
            lastMessage: 'Goodbye!',
        };

        const updatedUsers = usersReducer(initialUsers, action);

        expect(updatedUsers[1].lastMessage).toBe('Goodbye!');
        expect(updatedUsers[0].lastMessage).toBe('Hello!'); 
    });

    test('should add a new user for ADD_USER action', () => {
        const action: AnyUsersAction = {
            type: 'ADD_USER',
            userName: 'Charlie',
        };

        const updatedUsers = usersReducer(initialUsers, action);

        expect(updatedUsers).toHaveLength(3);
        expect(updatedUsers[2]).toEqual({
            id: "user_id_", 
            name: 'Charlie',
            profileImg: "https://fastly.picsum.photos/id/297/200/300.jpg?hmac=SF0Y51mRP7i6CoLBIuliqQwDIUJNyf63_r3xhamVSLE",
            lastMessage: "",
        });
    });

    test('should remove a user for REMOVE_USER action', () => {
        const action: AnyUsersAction = {
            type: 'REMOVE_USER',
            userId: 0,
        };

        const updatedUsers = usersReducer(initialUsers, action);

        expect(updatedUsers).toHaveLength(1);
        expect(updatedUsers[0].name).toBe('Bob'); 
    });

    test('should replace users for LOCAL_USERS action', () => {
        const action: AnyUsersAction = {
            type: 'LOCAL_USERS',
            users: [
                { id: 'user_id_3', name: 'David', profileImg: 'https://example.com/david.jpg', lastMessage: '' },
            ],
        };

        const updatedUsers = usersReducer(initialUsers, action);

        expect(updatedUsers).toHaveLength(1);
        expect(updatedUsers[0].name).toBe('David');
    });

});
