# Development Guide — Exam Duty Scheduler

## 1. Project Overview
Exam Duty Scheduler is a browser-based application for setting up exam dates and rooms, managing teachers, generating exam invigilation assignments, and viewing duty statistics.

## 2. Technologies
- HTML — page structure and forms
- CSS — layout, colors, cards, tables, and responsive styling
- JavaScript — teacher/date/room management, schedule generation, statistics, and browser storage
- Local Storage — saves the current data in the browser

## 3. Project Files
The project currently includes these source files:
- `index.html` — main application page
- `styles.css` — application styling
- `data.js` — shared data and Local Storage loading/saving
- `scheduler.js` — exam-duty assignment logic
- `ui.js` — page interactions and rendering
- `utils.js` — helper functions such as date formatting and teacher initials
- `exam_duty_scheduler (1).html` — standalone HTML version supplied with the project

If using the modular version (`index.html`), place the JavaScript files in a folder named `js` so the paths in `index.html` can resolve as `./js/data.js`, `./js/ui.js`, `./js/scheduler.js`, and `./js/utils.js`.

## 4. Run the Application
1. Keep the HTML, CSS, and JavaScript files in the project folder using the structure described above.
2. Open the standalone `exam_duty_scheduler (1).html` file in a modern browser to try the self-contained version.
3. For the modular version, use a local development server (for example, the Live Server extension in Visual Studio Code) because JavaScript modules may be blocked when opened directly using a `file://` URL.
4. Test adding exam dates, rooms, and teachers before generating a schedule.

## 5. Git Development Workflow
Use a separate `dev` branch for ongoing development and a feature branch for each feature.

Example commands:

```bash
git init
git add .
git commit -m "Initial commit: Exam Duty Scheduler"
git branch -M main
git switch -c dev
git push -u origin dev
```

Create a feature branch from `dev` when starting a change:

```bash
git switch dev
git switch -c feature/teacher-management
```

After making and testing changes:

```bash
git add .
git commit -m "Add teacher management improvements"
git push -u origin feature/teacher-management
```

Then open a Pull Request on GitHub from `feature/teacher-management` into `dev`. Review and merge it. When `dev` is ready, open a Pull Request from `dev` into `main`.

## 6. Suggested Commit Messages
- `docs: add development guide`
- `feat: improve teacher management`
- `feat: add schedule statistics`
- `fix: correct schedule generation`
- `style: improve responsive layout`

## 7. Before Committing
- Check that the application opens.
- Test adding and removing teachers, dates, and rooms.
- Test schedule generation with enough available teachers.
- Check the statistics view.
- Confirm all required files are included in Git.
- Do not commit secrets, private credentials, or personal data.
