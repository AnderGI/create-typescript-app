#!/bin/bash
set -e

# Resolve the absolute path of this script
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PID_FILE="$SCRIPT_DIR/.backoffice_backend_app_id"

# Compute the project root by going 4 levels up from backend/
ROOT_DIR="$(cd "$SCRIPT_DIR/../../../.." && pwd)"

# Entry point TypeScript file
START_FILE_PATH="$ROOT_DIR/src/apps/backoffice/backend/start.ts"

echo "📁 Starting app from: $START_FILE_PATH"
echo "📦 Project root: $ROOT_DIR"

# Launch the TypeScript app in the background using tsx
tsx "$START_FILE_PATH" &

TSX_PID="$!"
sleep 1  # Allow tsx to spawn the Node process

# Try to get the actual Node process PID (child of tsx)
MAIN_PID=$(pgrep -P "$TSX_PID" node || echo "$TSX_PID")

# Save the PID to file for later cleanup
echo "$MAIN_PID" > "$PID_FILE"
echo "✅ Saved PID in $PID_FILE: $MAIN_PID"
