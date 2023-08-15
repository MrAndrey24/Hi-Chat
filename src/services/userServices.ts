import { User, UserModel } from "../models/user";





export const userLogin = async (email: string, password: string): Promise<string | null> => {
    try{
        const user = await UserModel.findOne({ email: email, password: password });
        if(user){
            return user.name;
        }
        return null;
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