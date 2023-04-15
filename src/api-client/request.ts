import { Octokit } from 'octokit';
import { RequestMethod } from '@octokit/types';

export const client = new Octokit({
  auth: import.meta.env.ACCESS_TOKEN,
});

export const request = async <T>({ url, method = 'GET' }: { url: string; method?: RequestMethod }): Promise<T> => {
  try {
    const response = await client.request<T>({ url, method });

    return response.data as T;
  } catch (error) {
    console.error({ error });
    throw error;
  }
};
