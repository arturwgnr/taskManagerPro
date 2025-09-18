import { useState } from "react";
import { useTasks } from "../context/TaskProvider";

interface Task {
  id: string;
  title: string;
  priority: "high" | "medium" | "low";
  status: "pending" | "done";
}

export default function Tasks() {
  const { state, dispatch } = useTasks();

  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState<"high" | "medium" | "low">("high");

  function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) return;

    dispatch({
      type: "ADD_TASK",
      payload: {
        id: Date.now().toString(),
        title,
        priority,
        status: "pending",
      },
    });

    setTitle("");
    setPriority("high");
  }

  function handleToggle(id: string) {
    dispatch({ type: "TOGGLE_STATUS", payload: id });
  }

  function handleRemove(id: string) {
    dispatch({ type: "REMOVE_TASK", payload: id });
  }

const sortedTasks = [...state.tasks].sort((a, b) => {
  // 1. Done sempre no final
  if (a.status === "done" && b.status !== "done") return 1;
  if (a.status !== "done" && b.status === "done") return -1;

  // 2. Se ambos têm o mesmo status, ordenar por prioridade
  const order = { high: 1, medium: 2, low: 3 };
  return order[a.priority] - order[b.priority];
});
  return (
    <div className="tasks-container">
      {/* Formulário */}
      <form className="task-form" onSubmit={handleAdd}>
        <input
          type="text"
          placeholder="Task title..."
          className="task-input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <select
          className="task-select"
          value={priority}
          onChange={(e) => setPriority(e.target.value as Task["priority"])}
        >
          <option value="high">High Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="low">Low Priority</option>
        </select>

        <button type="submit" className="task-button">
          Add Task
        </button>
      </form>

      {/* Lista */}
      <ul className="task-list">
        {sortedTasks.map((t) => (
          <li
            key={t.id}
            className={`task-item ${t.status === "done" ? "task-done" : ""}`}
          >
            <div className="task-info">
              <span className="task-title">{t.title}</span>
              <span className="task-date">
                {new Date(parseInt(t.id)).toLocaleString()}
              </span>
            </div>

            <span className={`priority-tag ${t.priority}`}>
              {t.priority.charAt(0).toUpperCase() + t.priority.slice(1)}
            </span>

            <div className="task-actions">
              <button
                className={`task-toggle ${
                  t.status === "done" ? "toggle-done" : "toggle-pending"
                }`}
                onClick={() => handleToggle(t.id)}
              >
                {t.status === "done" ? "–" : "✓"}
              </button>
              <button
                className="task-remove"
                onClick={() => handleRemove(t.id)}
              >
                X
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
