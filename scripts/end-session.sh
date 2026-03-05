#!/bin/bash

# 1. Ensure documentation directory exists
mkdir -p docs

# 2. Stage changes
echo "🔍 Analyzing changes..."
git add .
DIFF=$(git diff --cached)

if [ -z "$DIFF" ]; then
  echo "Brak zmian do zapisu."
  exit 0
fi

# 3. Use AI to generate the specialized context update
echo "🤖 AI is updating the persistent context..."

# We ask for a specific Markdown format for the log
SUMMARY=$(gemini "Analyze this git diff: $DIFF. Write a 3-bullet-point summary in English of what was achieved. Format as Markdown bullets.")
NEXT_STEPS=$(gemini "Based on these changes: $DIFF, what are the next 2 logical steps for this project? Format as Markdown checkboxes.")

# 4. Update the Persistent File
DATE=$(date +"%Y-%m-%d %H:%M")
{
  echo -e "\n---"
  echo -e "### Session: $DATE"
  echo -e "#### Achievements:"
  echo -e "$SUMMARY"
  echo -e "#### Next Steps:"
  echo -e "$NEXT_STEPS"
} >> docs/ai_context.md

# 5. Commit with AI-generated message
COMMIT_MSG=$(gemini "Generate a concise conventional commit message for these changes: $DIFF")
git commit -m "$COMMIT_MSG"

echo "✅ Session persisted to docs/ai_context.md and committed as: $COMMIT_MSG"
