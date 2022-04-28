# Task to parse given data from xlsx file and insert it into database

You can find more details about this task in the `docs/task` folder.

## Used technologies:

[NodeJS 16.x](https://nodejs.org/en/download/)

[docker v20.x](https://docs.docker.com/engine/install)

[docker-compose v2.2.x](https://docs.docker.com/compose/install)

## Folder structure

```
.
├── package.json        # Package.json for the whole repo
├── .env.example        # Contains sample content of .env and .env.ENVIRONMENT files
├── docker-compose.yml  # Configuration of docker services
├── docs/task/          # Contains information about task and sample data
├── scripts/            # Some helper scripts for build process
│── src/                # Main App specific TypeScript source code goes here
│── dist/               # Compiled JavaScript code goes here (DON'T WRITE CODE HERE)
```

## How to run the app

1. Install Dependencies (run script in root directory)

   ```bash
   npm install
   ```

2. Create environment configs

   ```bash
   cp .env.example .env
   ```

3. Compile TypeScript code

   ```bash
   npm run build
   ```

4. Run docker services (to have active database)

   ```bash
   docker-compose --env-file ./.env up -d
   ```

5. Run app

   ```bash
   node ./dist/app.js
   ```

## Getting start development process

1. Install Dependencies (run script in root directory)

   ```bash
   npm install
   ```

2. Create environment configs

   ```bash
   cp .env.example .env
   ```

3) Run docker services

   ```bash
   docker-compose --env-file ./.env up -d
   ```

4) Run TypeScript watcher

   ```bash
   npm run watch
   ```

---
### TODO
- [ ] Add tests
- [ ] Add error handling and logging mechanism
- [ ] Add more abstractions to support more data structures
- [ ] Optimize SQL queries
- [ ] Add mechanism to process big data using streams
---

If any issues, please contact [Levon](https://github.com/khlevon) :)
