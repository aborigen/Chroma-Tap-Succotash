#!/bin/bash

# Exit on error
set -e

echo "🚀 Starting build process..."

# Run the next build (generates 'out' directory)
npm run build

# Check if 'out' directory exists
if [ -d "out" ]; then
  echo "📦 Creating release zip..."
  
  # Remove old zip if it exists
  rm -f release.zip
  
  # Move into 'out' to zip contents at the root level
  cd out && zip -r ../release.zip . && cd ..
  
  echo "✅ Success! 'release.zip' is ready for upload."
else
  echo "❌ Error: 'out' directory not found. Build failed."
  exit 1
fi