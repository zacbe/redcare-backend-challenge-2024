const mockGetRepositories = jest.fn();

const mockGithubClient = {
  getRepositories: mockGetRepositories,
};

const getInstance = jest.fn().mockReturnValue(mockGithubClient);

export { getInstance, mockGetRepositories };
export default { getInstance };
