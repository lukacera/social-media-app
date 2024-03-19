export const getAvatarURL = (mongoAvatarURL: string) => {

    const avatarURL = `http://localhost:3000/${mongoAvatarURL}`;
    return avatarURL

}