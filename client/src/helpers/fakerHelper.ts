import { faker } from '@faker-js/faker';
import { userType } from '../../../server/types/userType';

interface Post {
    username: string,
    userAvatar: string,
    url: string,
    createdAt: string,
}
export function createRandomUser(): userType {
    return {
        name: faker.person.firstName(),
        surname: faker.person.lastName(),
        age: Math.floor(Math.random() * 50),
        username: faker.internet.userName(),
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
export const USERS: userType[] = faker.helpers.multiple(createRandomUser, {
    count: 5,
});
export const usersAllProfiles: userType[] = faker.helpers.multiple(createRandomUser, {
    count: 20,
});
