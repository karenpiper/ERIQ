import { Router, Request, Response } from 'express';
import type { Project, ERIQInput } from '@eriq/shared';

export function projectsRouter(
  store: Map<string, Project>,
  createProject: (name: string, workflow: Project['workflow'], input: ERIQInput) => Project
) {
  const router = Router();

  router.get('/', (_req: Request, res: Response) => {
    const list = Array.from(store.values()).sort(
      (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    );
    res.json(list);
  });

  router.post('/', (req: Request, res: Response) => {
    const { name, workflow = 'preLaunch', input } = req.body;
    if (!input || typeof name !== 'string') {
      return res.status(400).json({ error: 'Missing name or input' });
    }
    const project = createProject(name, workflow, input as ERIQInput);
    res.status(201).json(project);
  });

  router.get('/:id', (req: Request, res: Response) => {
    const project = store.get(req.params.id);
    if (!project) return res.status(404).json({ error: 'Not found' });
    res.json(project);
  });

  return router;
}
