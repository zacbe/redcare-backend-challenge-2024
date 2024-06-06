import { NextFunction, Request, Response } from 'express';
import createError from 'http-errors';

export default async function handler(req: Request, res: Response, next: NextFunction): Promise<void> {
  const query = req.query as QueryParams;

  const date = query.date;
  const language = query.language;
  const sort = query.sort || 'stars';
  const order = query.order || 'desc';
  const page = parseInt(query.page || '1', 10);
  const limit = parseInt(query.limit || '10', 10);

  try {
    const githubClient = req.app.get('ghClient');
    if (!githubClient) throw new Error('GithubClient not initialized');

    const { items, total_count } = await githubClient.getRepositories({ date, language, sort, order, page, limit });
    res.status(200).json({
      totalPages: Math.ceil(total_count / limit),
      currentPage: page,
      total: total_count,
      repositories: items,
    });
  } catch (e: any) {
    next(createError(e?.response?.status || 500, e.message));
  }
}
