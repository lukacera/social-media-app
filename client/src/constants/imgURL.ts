
export const getImgURL = (mongoAvatarURL: string) => {

    const imgURL = `https://res.cloudinary.com/dluypaeie/image/upload/${mongoAvatarURL}`;
    return imgURL

}