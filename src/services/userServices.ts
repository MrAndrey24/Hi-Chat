import { NewUserEntry, User } from "../models/user";
import userData from "./users.json"

const users: User[] = userData as User[];

export const getUser = (): User[] => users

export const getUserById = (id: number): User | null => {
    const user = users.find(user => user.id === id);
    return user ? user : null
}

export const addUser = (newUserEntry: NewUserEntry): User => {
    const newUser = {
        id: Math.max(...userData.map(user => user.id)) + 1,
        ...newUserEntry
    }

    userData.push(newUser);
    return newUser
}

export const updateUser = (userId: number, updatedUser: Partial<User>): User | null => {
    const userIndex = users.findIndex(user => user.id === userId);
    if(userIndex !== -1) {
        const originalUser = userData[userIndex];
        const updatedUserData = { ...originalUser, ...updatedUser}
        userData[userIndex] = updatedUserData
        return updatedUserData
    }

    return null
}