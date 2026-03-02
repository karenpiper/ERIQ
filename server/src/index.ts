import express from 'express';
import cors from 'cors';
import { calculateERIQ } from '@eriq/shared';
import type { Project, ERIQInput } from '@eriq/shared';
import { projectsRouter } from './routes/projects.js';

const app = express();
app.use(cors());
app.use(express.json({ limit: '2mb' }));

const store = new Map<string, Project>();

function createProject(name: string, workflow: Project['workflow'], input: ERIQInput): Project {
  const id = `proj_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
  const now = new Date().toISOString();
  const result = calculateERIQ(input);
  const project: Project = {
    id,
    name,
    createdAt: now,
    updatedAt: now,
    input,
    result,
    workflow,
  };
  store.set(id, project);
  return project;
}

app.use('/api/projects', projectsRouter(store, createProject));

const PORT = process.env.PORT ?? 3000;
app.listen(PORT, () => {
  console.log(`ERIQ API at http://localhost:${PORT}`);
});
