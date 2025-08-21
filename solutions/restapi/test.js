const users = [
    {
        id: 1,
        name: "John Doe",
        email: "john@example.com"
    },
    {
        id: 2,
        name: "Jane Smith",
        email: "jane@example.com"
    }
];
function findUserById(id) {
    return users.find(user => user.id === id);
}

function deleteUserById(id) {
    const index = users.findIndex(user => user.id === id);
    if (index !== -1) {
        users.splice(index, 1);
        return true;
    }
    return false;
}

