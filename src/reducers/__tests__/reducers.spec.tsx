import messagesReducer from '../../reducers/messagesReducer';
import { Message, AnyMessagesACtion, AnyUsersAction, User } from '../../types/commonTypes';
import getTimeInHHMMFormat from '../../utils/getCurrentTime';
import { describe, test, expect, vi, beforeEach } from 'vitest';
import usersReducer from '../usersReducer';
// vi.mock('../utils/getCurrentTime'); // Mocking the time function


vi.mock('../../utils/getCurrentTime', () => ({default: vi.fn()}));
describe('messagesReducer', () => {
    let initialMessages: Array<Array<Message>>;

    beforeEach(() => {
        initialMessages = [
            [{ messageTime: '10:00', sentMessage: 'message ' }],
            [{ messageTime: '11:00', sentMessage: 'new message' }],
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
        expect(updatedMessages[0][0].sentMessage).toBe('new message'); 
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
            { id: 'user_id_1', name: 'name1', profileImg: 'https://example.com/name1.jpg', lastMessage: 'message' },
            { id: 'user_id_2', name: 'name2', profileImg: 'https://example.com/name2.jpg', lastMessage: 'another message' },
        ];
    });

    test('should set the last message for SET_LAST_MESSAGE action', () => {
        const action: AnyUsersAction = {
            type: 'SET_LAST_MESSAGE',
            activeUserId: 1,
            lastMessage: 'last message',
        };

        const updatedUsers = usersReducer(initialUsers, action);

        expect(updatedUsers[1].lastMessage).toBe('last message');
        expect(updatedUsers[0].lastMessage).toBe('message'); 
    });

    test('should add a new user for ADD_USER action', () => {
        const action: AnyUsersAction = {
            type: 'ADD_USER',
            userName: 'name3',
        };

        const updatedUsers = usersReducer(initialUsers, action);

        expect(updatedUsers).toHaveLength(3);
        expect(updatedUsers[2]).toEqual({
            id: "user_id_", 
            name: 'name3',
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
        expect(updatedUsers[0].name).toBe('name2'); 
    });

    test('should replace users for LOCAL_USERS action', () => {
        const action: AnyUsersAction = {
            type: 'LOCAL_USERS',
            users: [
                { id: 'user_id_3', name: 'name4', profileImg: 'https://example.com/name4.jpg', lastMessage: '' },
            ],
        };

        const updatedUsers = usersReducer(initialUsers, action);

        expect(updatedUsers).toHaveLength(1);
        expect(updatedUsers[0].name).toBe('name4');
    });

});
