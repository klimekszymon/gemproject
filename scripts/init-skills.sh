# Run this from the directory containing your skill folders
for d in */; do gemini skills link "$d" --scope workspace; done