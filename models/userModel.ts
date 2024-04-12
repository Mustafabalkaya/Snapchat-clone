import mongoose, { Document, Model } from "mongoose";

export interface IUser {
    username: string;
    fullName: string;
    email: string;
    avatar?: string;
}

export interface IUserDocument extends IUser, Document {
    createdAt: Date;
    updatedAt: Date;
}

const userSchema = new mongoose.Schema<IUserDocument>(
    {
        username: {
            type: String,
            required: true,
            unique: true,
        },
        fullName: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        avatar: {
            type: String,
            default: "",
        },
    },
    {
        timestamps: true,
    }
);

const User: Model<IUserDocument> = mongoose.models?.User || mongoose.model<IUserDocument>("User", userSchema);

export default User;

// Kullanıcı oluşturma işlemi
const newUser = new User({
    username: "Mustafabalkaya",
    fullName: "Mustafa Balkaya", // Geçerli bir tam isim değeri girilmelidir
    email: "balkayamustafa99@gmail.com",
    avatar: "https://avatars.githubusercontent.com/u/106041095?v=4",
});

newUser.save()
    .then((user) => {
        console.log("Kullanıcı oluşturuldu:", user);
    })
    .catch((error) => {
        console.error("Kullanıcı oluşturulurken hata oluştu:", error);
});
