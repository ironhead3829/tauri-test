
import { useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import "./App.css";

export default function App() {
  const [name, setName] = useState("");
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);

  async function increment() {
    setLoading(true);

    try {
      const result = await invoke<number>("increment");
      setCount(result);
    } catch (error) {
      console.error("Increment failed:", error);
    } finally {
      setLoading(false);
    }
  }

  async function decrement() {
    setLoading(true);

    try {
      const result = await invoke<number>("decrement");
      setCount(result);
    } catch (error) {
      console.error("Decrement failed:", error);
    } finally {
      setLoading(false);
    }
  }


  async function reset() {
    setLoading(true);

    try {
      const result = await invoke<number>("reset");
      setCount(result);
    } catch (error) {
      console.error("Reset failed:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-slate-950 text-slate-100">
      {/* Header */}
      <header className="shrink-0 border-b border-slate-800 bg-slate-900/70">
        <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-6 py-3">
          <div>
            <h1 className="text-xl font-bold tracking-tight text-white">
              Tauri Playground
            </h1>
            <p className="mt-1 text-xs text-slate-400">
              React + TypeScript + Rust
            </p>
          </div>

          <span className="rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-300">
            Development
          </span>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto flex min-h-0 w-full max-w-5xl flex-1 flex-col gap-4 overflow-y-auto px-6 py-5">
        <div>
          <h2 className="text-3xl font-semibold tracking-tight text-white">
            Welcome to your workspace
          </h2>
          <p className="mt-2 text-slate-400">
            A simple desktop application for testing Tauri commands
            and React components.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {/* Name Input */}
          <section className="rounded-xl border border-slate-800 bg-slate-900 p-4">
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-white">
                User Profile
              </h3>
              <p className="mt-1 text-sm text-slate-400">
                Test React state and text input.
              </p>
            </div>

            <label
              htmlFor="name"
              className="mb-2 block text-sm font-medium text-slate-300"
            >
              Your Name
            </label>

            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name..."
              className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            />

            <div className="mt-6 rounded-xl border border-slate-800 bg-slate-950 p-5">
              <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
                Live Preview
              </p>
              <p className="mt-2 text-xl font-semibold text-blue-300">
                Hello, {name || "World"}!
              </p>
            </div>
          </section>

          {/* Rust Counter */}
          <section className="rounded-xl border border-slate-800 bg-slate-900 p-4">
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-white">
                Rust Counter
              </h3>
              <p className="mt-1 text-sm text-slate-400">
                Test frontend-to-backend communication.
              </p>
            </div>

            <div className="flex items-center justify-center rounded-xl border border-slate-800 bg-slate-950 py-4">
              <span className="text-4xl font-bold tabular-nums tracking-tight text-white">
                {count}
              </span>
            </div>

            <div className="mt-6 flex gap-3">
              <button
                onClick={increment}
                disabled={loading}
                className="flex-1 cursor-pointer rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-500 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
              >
                ++ Increment
              </button>

              <button
                onClick={decrement}
                disabled={loading}
                className="flex-1 cursor-pointer rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-500 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
              >
                -- Decrement
              </button>

              <button
                onClick={reset}
                disabled={loading}
                className="cursor-pointer rounded-lg border border-slate-700 bg-slate-800 px-5 py-3 text-sm font-semibold text-slate-200 transition hover:bg-slate-700 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
              >
                Reset
              </button>
            </div>
          </section>
        </div>

      </main>
      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-900 px-6 py-3">
        <p className="text-center text-xs text-slate-500">
          Built with Tauri 2, React, TypeScript, and Tailwind CSS
        </p>
      </footer>
    </div>
  );
}
