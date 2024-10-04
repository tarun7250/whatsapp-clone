import messagesReducer from '../../reducers/messagesReducer';
import { Message, AnyMessagesACtion, AnyUsersAction, User } from '../../types/commonTypes';
import getTimeInHHMMFormat from '../../utils/getCurrentTime';
import { describe, test, expect, vi, beforeEach } from 'vitest';
import usersReducer from '../usersReducer';
// vi.mock('../utils/getCurrentTime'); // Mocking the time function


// Correctly mock the time function
vi.mock('../../utils/getCurrentTime', () => ({
    default: vi.fn(), // mock the default export of the module
  }));
describe('messagesReducer', () => {
    let initialMessages: Array<Array<Message>>;

    beforeEach(() => {
        initialMessages = [
            [{ messageTime: '10:00', sentMessage: 'Hello' }],
            [{ messageTime: '11:00', sentMessage: 'Hi there' }],
        ];

        (getTimeInHHMMFormat as jest.Mock).mockReturnValue('12:00'); // Mock current time
    });

    test('should add a message for ADDMESSAGE action', () => {
        const action: AnyMessagesACtion = {
            type: 'ADDMESSAGE',
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

    test('should delete a message for DELETEMESSAGE action', () => {
        const action: AnyMessagesACtion = {
            type: 'DELETEMESSAGE',
            activeUserId: 1,
            messageId: 0,
        };

        const updatedMessages = messagesReducer(initialMessages, action);

        expect(updatedMessages[1]).toHaveLength(0); // Message should be deleted
    });

    test('should edit a message for EDITMESSAGE action', () => {
        const action: AnyMessagesACtion = {
            type: 'EDITMESSAGE',
            activeUserId: 0,
            messageId: 0,
            newMessage: 'Updated message',
        };

        const updatedMessages = messagesReducer(initialMessages, action);

        expect(updatedMessages[0][0].sentMessage).toBe('Updated message');
    });

    test('should add a new user for ADDUSER action', () => {
        const action: AnyMessagesACtion = {
            type: 'ADDUSER',
        };

        const updatedMessages = messagesReducer(initialMessages, action);

        expect(updatedMessages).toHaveLength(3); // New user should be added
        expect(updatedMessages[2]).toEqual([]); // New user's message list should be empty
    });

    test('should remove a user for REMOVEUSER action', () => {
        const action: AnyMessagesACtion = {
            type: 'REMOVEUSER',
            userId: 0,
        };

        const updatedMessages = messagesReducer(initialMessages, action);

        expect(updatedMessages).toHaveLength(1); // User should be removed
        expect(updatedMessages[0][0].sentMessage).toBe('Hi there'); // Remaining user's message
    });

    test('should replace messages for LOCALMESSAGES action', () => {
        const newMessages: Array<Array<Message>> = [
            [{ messageTime: '14:00', sentMessage: 'New local message' }],
        ];

        const action: AnyMessagesACtion = {
            type: 'LOCALMESSAGES',
            messages: newMessages,
        };

        const updatedMessages = messagesReducer(initialMessages, action);

        expect(updatedMessages).toBe(newMessages); // Messages should be replaced with local ones
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

    test('should set the last message for SETLASTMESSAGE action', () => {
        const action: AnyUsersAction = {
            type: 'SETLASTMESSAGE',
            activeUserId: 1,
            lastMessage: 'Goodbye!',
        };

        const updatedUsers = usersReducer(initialUsers, action);

        expect(updatedUsers[1].lastMessage).toBe('Goodbye!');
        expect(updatedUsers[0].lastMessage).toBe('Hello!'); // Ensure other users are unaffected
    });

    test('should add a new user for ADDUSER action', () => {
        const action: AnyUsersAction = {
            type: 'ADDUSER',
            userName: 'Charlie',
        };

        const updatedUsers = usersReducer(initialUsers, action);

        expect(updatedUsers).toHaveLength(3);
        expect(updatedUsers[2]).toEqual({
            id: "user_id_", // Check if id format is as expected
            name: 'Charlie',
            profileImg: "https://fastly.picsum.photos/id/297/200/300.jpg?hmac=SF0Y51mRP7i6CoLBIuliqQwDIUJNyf63_r3xhamVSLE",
            lastMessage: "",
        });
    });

    test('should remove a user for REMOVEUSER action', () => {
        const action: AnyUsersAction = {
            type: 'REMOVEUSER',
            userId: 0,
        };

        const updatedUsers = usersReducer(initialUsers, action);

        expect(updatedUsers).toHaveLength(1);
        expect(updatedUsers[0].name).toBe('Bob'); // Ensure 'Alice' is removed
    });

    test('should replace users for LOCALUSERS action', () => {
        const action: AnyUsersAction = {
            type: 'LOCALUSERS',
            users: [
                { id: 'user_id_3', name: 'David', profileImg: 'https://example.com/david.jpg', lastMessage: '' },
            ],
        };

        const updatedUsers = usersReducer(initialUsers, action);

        expect(updatedUsers).toHaveLength(1);
        expect(updatedUsers[0].name).toBe('David'); // Ensure users are replaced
    });

});
