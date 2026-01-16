import { createContext, useContext, ReactNode } from 'react';
import { useTasks } from '@/hooks/useTasks';
import { DerivedTask, Metrics, Task } from '@/types';

/**
 * Payload coming from TaskForm / TaskTable / App
 * createdAt & completedAt are generated inside useTasks
 */
type TaskFormPayload = Omit<Task, 'id' | 'createdAt' | 'completedAt'> & { id?: string };

interface TasksContextValue {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  derivedSorted: DerivedTask[];
  metrics: Metrics;
  lastDeleted: Task | null;
  addTask: (task: TaskFormPayload) => void;
  updateTask: (id: string, patch: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  undoDelete: () => void;
  clearLastDeleted: () => void;
}

const TasksContext = createContext<TasksContextValue | undefined>(undefined);

export function TasksProvider({ children }: { children: ReactNode }) {
  const value = useTasks();
  return <TasksContext.Provider value={value}>{children}</TasksContext.Provider>;
}

export function useTasksContext(): TasksContextValue {
  const ctx = useContext(TasksContext);
  if (!ctx) throw new Error('useTasksContext must be used within TasksProvider');
  return ctx;
}
