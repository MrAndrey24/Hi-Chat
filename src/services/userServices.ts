import { NewUserEntry, User } from "../models/user";
import userData from "./users.json"

const users: User[] = userData as User[];

export const getUser = (): User[] => users

export const addUser = (newUserEntry: NewUserEntry): User => {
    const newUser = {
        id: Math.max(...userData.map(user => user.id)) + 1,
        ...newUserEntry
    }

    userData.push(newUser);
    return newUser
}