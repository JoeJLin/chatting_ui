export const setUser = (user) => ({
        type: 'INIT',
        username: user.username,
        isNameChecked: user.isNameChecked
});

export const updateMessage = message => ({
        type: 'UPDATE_MESSAGE',
        message
});

export const newMessage = message => ({
        type: 'NEW_MESSAGE',
        message
})