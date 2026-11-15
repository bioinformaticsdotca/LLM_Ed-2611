Make sure the working directory is a Git repository. If it is not, initialize one. Ensure that a corresponding remote repository with the same name exists in the `mberjans` GitHub account. If it does not, create a private repository using `gh` in that account.

**Before writing any code**, thoroughly inspect the existing codebase for functions, classes, utilities, and patterns that can be reused or extended. If a codebase-retrieval tool is available, use it to search for relevant existing code.

If a task has already been completed or functional code already exists, mark its checkbox as `[x]` in `docs/checklist.md`. Replace malformed checkboxes such as `[x!]`, `[!x]`, or `[!]` with `[ ]`; treat them as incomplete and complete those tasks. Read `docs/checklist.md`, `docs/plan.md`, `docs/tickets.md`, and the latest `latest_changes/latest_changes_$date_$time.md` file, if one exists. If the `latest_changes` directory or its required file does not exist, create it.

For unchecked checklist tasks, create a to-do list of smaller subtasks, design unit tests, write the code, review and verify its quality, fix any imperfections, and run unit tests for one subtask of one task of one ticket at a time. If a test finds a bug, return to the coding step and fix it. Make up to 10 attempts to write, review, verify, test, and fix the work. Check whether the AI coder has software-engineer and code-reviewer subagents. If available, delegate coding tasks to the software-engineer subagent and code reviews to the code-reviewer subagent.

Do not skip a task because a required file or directory is missing; create it when necessary. When a task is complete, write a dated and timed Markdown report in `latest_changes/latest_changes_$date_$time.md` and record it in `docs/checklist.md`. Stage all changed files with a separate `git add` command, commit them with a separate `git commit` command and a suitable message, then push with a separate `git push` command. After completing a ticket, stage, commit, and push its changes before moving to the next ticket. Do not chain commands using `&`.

If you use Python, create and use a local virtual environment. Do not use Python list comprehensions. Avoid regular expressions for pattern matching; write a dedicated pattern-matching function instead. For Ruby on Rails projects, use Docker images for development rather than a local Ruby on Rails installation.

Continue until all bugs are fixed. Do not ask for confirmation before proceeding to the next ticket.

**Critical:** Do not add or remove tasks in `docs/checklist.md`. You may change their checkbox statuses or add comments indicating failures, but the task list itself must remain unchanged.
