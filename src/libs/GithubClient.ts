import axios from 'axios';

import { env } from '../utils/envConfig';

export class GithubClient {
  private static instance: GithubClient;
  private static readonly BASE_URL = env.GITHUB_API_URL;

  private constructor() {}

  public static getInstance(): GithubClient {
    if (!GithubClient.instance) {
      GithubClient.instance = new GithubClient();
    }
    return GithubClient.instance;
  }

  public async getRepositories(query: QueryGH): Promise<GithubApiResponse> {
    const { date, language, sort = 'stars', order = 'desc', page = 1, limit = 10 } = query;

    const qParts = [];
    if (date) qParts.push(`created:>${date}`);
    if (language) qParts.push(`language:${language}`);

    const q = qParts.join(' ');
    const params = {
      q,
      sort,
      order,
      page,
      per_page: limit,
    };
    const url = `${GithubClient.BASE_URL}/repositories`;

    const response = await axios.get(url, { params });
    return response.data;
  }
}
