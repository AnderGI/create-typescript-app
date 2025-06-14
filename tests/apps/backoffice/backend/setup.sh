#!/bin/bash

# Exit when a non-zero value is exited
set -e 


# BASH_SOURCE is a Bash internal array variable.
# It contains the script file paths, as they were specified when invoked (relative or absolute).
BASE_SCRIPT_DIRNAME="$(dirname "$BASH_SOURCE[0]")"

# Get the absolute path to the directory where the BDD scripts are located.
# BASE_SOURCE may be a relative or absolute path, depending on how the script was invoked.
SCRIPT_DIR="$(cd "$BASE_SCRIPT_DIRNAME" && pwd)"

# Execute app-end after app-start has been executed to finish all starting processes
trap "bash \"$SCRIPT_DIR/app-end.sh\"" EXIT

# Give execute permissions to all .sh files located in $SCRIPT_DIR
find "$SCRIPT_DIR" -type f -name "*.sh" -exec chmod +x {} \;

echo "🔄 Starting app..."
bash "$SCRIPT_DIR/app-start.sh"

echo
for feature_dir in "$SCRIPT_DIR/features"/*; do
  if [ -d "$feature_dir" ]; then
    echo "🚀 Running tests in $(basename "$feature_dir")"
    
    for script in "$feature_dir"/*.sh; do
      echo "▶️ Executing $(basename "$script")"
      bash "$script"
      echo
      sleep 0.25
    done
  fi
done