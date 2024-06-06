import request from 'supertest';

import { getInstance, mockGetRepositories } from '../__mocks__/GithubClient';
import { app } from '../server';

jest.mock('../libs/GithubClient');

describe('GET /api/v1/repositories', () => {
  beforeEach(() => {
    getInstance.mockClear();
    mockGetRepositories.mockClear();

    getInstance.mockReturnValue({
      getRepositories: mockGetRepositories,
    });
    app.set('ghClient', getInstance());
  });

  it('should return repositories data', async () => {
    // Arrange
    const mockResponse = {
      total_count: 100,
      items: [
        {
          id: 1,
          name: 'repo1',
          full_name: 'user/repo1',
          html_url: 'https://github.com/user/repo1',
          description: 'A test repository',
          stargazers_count: 100,
          forks_count: 10,
          language: 'JavaScript',
          created_at: '2024-01-01T00:00:00Z',
          updated_at: '2024-01-01T00:00:00Z',
        },
      ],
    };

    mockGetRepositories.mockResolvedValue(mockResponse);

    // Act
    const res = await request(app).get('/api/v1/repositories').query({
      date: '2024-01-01',
      language: 'JavaScript',
      sort: 'stars',
      order: 'desc',
      page: 1,
      limit: 10,
    });

    // Assert
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      totalPages: 10,
      currentPage: 1,
      total: 100,
      repositories: mockResponse.items,
    });
  });

  it('should return 200 with empty result when no repositories are found', async () => {
    // Arrange
    const mockResponse = {
      total_count: 0,
      items: [],
    };

    mockGetRepositories.mockResolvedValue(mockResponse);

    // Act
    const res = await request(app).get('/api/v1/repositories').query({
      date: '2024-01-01',
      language: 'JavaScript',
      sort: 'stars',
      order: 'desc',
      page: 1,
      limit: 10,
    });

    // Assert
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      totalPages: 0,
      currentPage: 1,
      total: 0,
      repositories: [],
    });
  });

  it('should return 500 if GithubClient is not initialized', async () => {
    // Arrange
    app.set('ghClient', undefined);

    // Act
    const res = await request(app).get('/api/v1/repositories').query({
      date: '2024-01-01',
      language: 'JavaScript',
      sort: 'stars',
      order: 'desc',
      page: 1,
      limit: 10,
    });

    // Assert
    expect(res.status).toBe(500);
    expect(res.body.message).toBe('GithubClient not initialized');
  });

  it('should return 500 if GithubClient.getRepositories throws an error', async () => {
    // Arrange
    mockGetRepositories.mockRejectedValue(new Error('Internal Server Error'));

    // Act
    const res = await request(app).get('/api/v1/repositories').query({
      date: '2024-01-01',
      language: 'JavaScript',
      sort: 'stars',
      order: 'desc',
      page: 1,
      limit: 10,
    });

    // Assert
    expect(res.status).toBe(500);
    expect(res.body.message).toBe('Internal Server Error');
  });

  it('should return correct pagination details when valid query parameters are provided', async () => {
    // Arrange
    const mockResponse = {
      total_count: 50,
      items: [
        {
          id: 1,
          name: 'repo1',
          full_name: 'user/repo1',
          html_url: 'https://github.com/user/repo1',
          description: 'A test repository',
          stargazers_count: 100,
          forks_count: 10,
          language: 'JavaScript',
          created_at: '2024-01-01T00:00:00Z',
          updated_at: '2024-01-01T00:00:00Z',
        },
      ],
    };

    mockGetRepositories.mockResolvedValue(mockResponse);

    // Act
    const res = await request(app).get('/api/v1/repositories').query({
      date: '2024-01-01',
      language: 'JavaScript',
      sort: 'stars',
      order: 'desc',
      page: 1,
      limit: 5,
    });

    // Assert
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      totalPages: 10,
      currentPage: 1,
      total: 50,
      repositories: mockResponse.items,
    });
  });

  it('should return 200 with empty result when no repositories are found', async () => {
    // Arrange
    const mockResponse = {
      total_count: 0,
      items: [],
    };

    mockGetRepositories.mockResolvedValue(mockResponse);

    // Act
    const res = await request(app).get('/api/v1/repositories').query({
      date: '2024-01-01',
      language: 'JavaScript',
      sort: 'stars',
      order: 'desc',
      page: 1,
      limit: 10,
    });

    // Assert
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      totalPages: 0,
      currentPage: 1,
      total: 0,
      repositories: [],
    });
  });
});
