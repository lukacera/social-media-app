import { faker } from '@faker-js/faker';

interface User {
    userId: string,
    username: string,
    email: string,
    avatar: string,
    password: string
}

interface Post {
    username: string,
    userAvatar: string,
    url: string,
    createdAt: string,
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
export function createPost(): Post {
    return {
        userAvatar: faker.image.avatar(),
        url: faker.image.urlPicsumPhotos(),
        createdAt: faker.date.recent().toLocaleString(),
        username: faker.internet.userName()
    }
}

export const POSTS: Post[] = faker.helpers.multiple(createPost, {
    count: 10
})
export const USERS: User[] = faker.helpers.multiple(createRandomUser, {
    count: 5,
});