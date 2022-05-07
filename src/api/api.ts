import axios from 'axios';
import { PostType } from '../features/posts/postsSlice';

const instance = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com/',
});


export const postsAPI = {
    async getPosts() {
        const response = await instance.get<PostType[]>(`posts`);
        return response.data;
    }
}