import { faker } from '@faker-js/faker';

interface User {
    userId: string,
    username: string,
    email: string,
    avatar: string,
    password: string
}
interface randomImage {
    url: string,
    height: number,
    width: number
}
export function createRandomUser(): User {
    return {
        userId: faker.string.uuid(),
        username: faker.internet.userName(),
        email: faker.internet.email(),
        avatar: faker.image.avatar(),
        password: faker.internet.password()
    }
}
export function createRandomImage(): randomImage {
    return {
        url: faker.image.urlPicsumPhotos(),
        height: 1,
        width: 1
    }
}
export const POSTS: randomImage[] = faker.helpers.multiple(createRandomImage, {
    count: 10
})
export const USERS: User[] = faker.helpers.multiple(createRandomUser, {
    count: 5,
});