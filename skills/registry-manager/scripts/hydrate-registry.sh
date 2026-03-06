#!/bin/bash

# 1. Get the absolute path to the 'scripts' folder
SCRIPT_DIR=$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" &> /dev/null && pwd)

# 2. Define the skills directory (one level up from scripts)
SKILLS_DIR="$SCRIPT_DIR/../skills"

# 3. Move to the project root before linking
# This ensures .gemini is created in the root, not inside /scripts
cd "$SCRIPT_DIR/.." || exit

echo "🚀 Starting skill linking from: $SKILLS_DIR"

for d in "$SKILLS_DIR"/*/; do
    if [ -d "$d" ]; then
        SKILL_NAME=$(basename "$d")
        echo "🔗 Linking: $SKILL_NAME"
        # We use the absolute path "$d" to be safe
        gemini skills link "$d" --scope workspace
    fi
done

echo "✅ Done! Skills registered in $(pwd)/.gemini"