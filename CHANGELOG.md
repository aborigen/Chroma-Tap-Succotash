# Changelog

All notable changes to the Chroma Tap project will be documented in this file.

## [1.0.0] - 2024-05-24

### Added
- **Core Gameplay**: Implementation of the rhythm-based color matching engine.
- **Yandex Games SDK**: Full integration with the Yandex Games environment, including SDK initialization and player data placeholders.
- **Synthesized Audio**: Custom Web Audio API utility (`audio-utils.ts`) providing real-time sound effects for success, failure, and game start without external assets.
- **Static Export**: Configured Next.js for static HTML export (`output: 'export'`) to support non-Node.js hosting environments.
- **Release Automation**: Added `scripts/build-release.sh` and `npm run release` command to automatically build and package the game into a `release.zip` for Yandex Games Console upload.
- **Responsive UI**: Built with Tailwind CSS and ShadCN UI components, optimized for both desktop and mobile web views.
- **Deployment Config**: Added `firebase.json` for easy deployment to Firebase Hosting.

### Fixed
- Improved animation performance by using `requestAnimationFrame` for the game loop.
- Resolved hydration mismatches by ensuring randomized game states are initialized on the client side.
