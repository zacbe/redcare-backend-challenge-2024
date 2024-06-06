declare global {
  namespace Express {
    interface Request {
      githubClient: GithubClient;
    }
  }

  interface QueryParams extends ParsedQs {
    date?: string;
    language?: string;
    sort?: string;
    order?: string;
    page?: string;
    limit?: string;
  }

  interface QueryGH {
    date: string;
    language: string;
    sort: string;
    order: string;
    page: number;
    limit: number;
  }

  interface GithubRepository {
    id: number;
    name: string;
    full_name: string;
    owner: {
      login: string;
    };
    html_url: string;
    description: string;
    stargazers_count: number;
    watchers_count: number;
    language: string;
    created_at: string;
    updated_at: string;
    pushed_at: string;
    [key: string]: any;
  }

  interface GithubApiResponse {
    total_count: number;
    incomplete_results: boolean;
    items: Repository[];
  }
}

export {};
