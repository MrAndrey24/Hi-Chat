import { User, UserModel } from "../models/user";

export const getUser = async (): Promise<User[]> => {
    try{
        const users = await UserModel.find();
        return users
    }catch(error){
        throw new Error("Error getting user: " + error);
    }
}

export const getUserById = async (id: string): Promise<User | null> => {
    try{
        const user = await UserModel.findById(id);
        return user
    }catch(error){
        throw new Error("Error getting user: " + error);
    }
}

export const addUser = async (newUser: User): Promise<User> => {
    try{
        const createdUser = new UserModel(newUser)
        const savedUser = await createdUser.save()
        return savedUser
    }catch(e){
        throw new Error("Error adding user: " + e)
    }
}

export const updateUser = async (userId: string, updatedUser: Partial<User>): Promise<User | null> => {
    try{
        const updateUser = UserModel.findByIdAndUpdate(userId, updatedUser, {new: true})
        return updateUser
    }catch(error){
        throw new Error("Error updating user: " + error)
    }
}