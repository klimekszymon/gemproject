#!/bin/bash

# hydrate-registry.sh
# 
# Bulk-links all skills in the project's skills/ directory
# to the workspace .gemini folder.

# 1. Get the absolute path to the 'scripts' folder
SCRIPT_DIR=$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" &> /dev/null && pwd)

# 2. Define the project root (three levels up from scripts)
ROOT_DIR=$(cd "$SCRIPT_DIR/../../.." && pwd)

# 3. Define the skills directory
SKILLS_DIR="$ROOT_DIR/skills"

# 4. Move to the project root before linking
cd "$ROOT_DIR" || exit

echo "🚀 Starting skill linking from: $SKILLS_DIR"

for d in "$SKILLS_DIR"/*/; do
    if [ -d "$d" ]; then
        # Skip if it's not a directory or doesn't contain a SKILL.md
        if [ ! -f "$d/SKILL.md" ]; then
            continue
        fi
        
        SKILL_NAME=$(basename "$d")
        echo "🔗 Linking: $SKILL_NAME"
        gemini skills link "$d" --scope workspace
    fi
done

echo "✅ Done! Skills registered in $ROOT_DIR/.gemini"
