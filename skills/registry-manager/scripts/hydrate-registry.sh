#!/bin/bash

# hydrate-registry.sh
# 
# Bulk-links all skills in the project's skills/ directory
# to the workspace .gemini folder.

# 1. Parse arguments for non-interactive mode
FORCE_YES=false
while [[ "$#" -gt 0 ]]; do
    case $1 in
        -y|--yes) FORCE_YES=true ;;
        *) echo "Unknown parameter: $1"; exit 1 ;;
    esac
    shift
done

# 2. Get the absolute path to the 'scripts' folder
SCRIPT_DIR=$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" &> /dev/null && pwd)

# 3. Define the project root (three levels up from scripts)
ROOT_DIR=$(cd "$SCRIPT_DIR/../../.." && pwd)

# 4. Define the skills directory
SKILLS_DIR="$ROOT_DIR/skills"

# 5. Move to the project root before linking
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
        
        if [ "$FORCE_YES" = true ]; then
            # Pass --consent to skip manual confirmation
            gemini skills link "$d" --scope workspace --consent
        else
            gemini skills link "$d" --scope workspace
        fi
    fi
done

echo "✅ Done! Skills registered in $ROOT_DIR/.gemini"
