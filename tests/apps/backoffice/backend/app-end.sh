#!/bin/bash
set -euo pipefail

# Resolve the absolute path to this script
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PID_FILE="$SCRIPT_DIR/.backoffice_backend_app_id"

# Check if the PID file exists
if [[ ! -f "$PID_FILE" ]]; then
  echo "⚠️ PID file not found at $PID_FILE. The app may not have started or was already stopped."
  exit 0
fi

# Read the stored PID
MAIN_PID="$(cat "$PID_FILE")"

# Check if the process is running
if ! ps -p "$MAIN_PID" > /dev/null; then
  echo "⚠️ No process found with PID $MAIN_PID. Cleaning up..."
  rm -f "$PID_FILE"
  exit 0
fi

echo "🔢 Main PID detected: $MAIN_PID"
echo "🔍 Searching for child processes..."

# Recursively kill all subprocesses
kill_tree() {
  local parent_pid=$1
  local children
  children=$(ps --ppid "$parent_pid" -o pid= | xargs || true)

  for child_pid in $children; do
    kill_tree "$child_pid"
  done

  echo "❌ Killing PID $parent_pid"
  kill "$parent_pid" 2>/dev/null || true
}

kill_tree "$MAIN_PID"

# Remove the PID file
rm -f "$PID_FILE"
echo "✅ All processes successfully terminated."
