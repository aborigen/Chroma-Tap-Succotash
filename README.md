# Chroma Tap | Hyper Casual Rhythm Game

This is a NextJS rhythm game built in Firebase Studio, optimized for Yandex Games.

## Getting Started

To run the development server:
```bash
npm run dev
```

## How to build for Yandex Games
To create a static build and automatically package it into a zip file:
```bash
npm run release
```
This will generate `release.zip` in your root folder.

## Git Concepts
- **Fast-Forward (FF)**: When merging, Git simply moves the branch pointer forward instead of creating a "Merge Commit". This happens if the main branch hasn't changed since you started your work.
- **Merge Commit**: A special commit that has two parents, created when two branches have diverged and are joined back together.

## How to push to GitHub

1. **Initialize Git**:
   ```bash
   git init
   ```

2. **Add Files**:
   ```bash
   git add .
   ```

3. **Commit Changes**:
   ```bash
   git commit -m "Initial commit: Chroma Tap Game"
   ```

4. **Create a Repository on GitHub**:
   Go to [github.com/new](https://github.com/new) and create a new repository.

5. **Link and Push**:
   Replace `<username>` and `<repo-name>` with your details:
   ```bash
   git remote add origin https://github.com/<username>/<repo-name>.git
   git branch -M main
   git push -u origin main
   ```

## Building for Static Hosting (Manual)
```bash
npm run build
```
The static export will be located in the `out` directory.