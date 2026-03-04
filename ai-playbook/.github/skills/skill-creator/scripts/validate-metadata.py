#!/usr/bin/env python3
import sys
import re
import yaml

def validate_metadata(skill_path):
    try:
        with open(f"{skill_path}/SKILL.md", "r") as f:
            content = f.read()
    except FileNotFoundError:
        print(f"ERROR: SKILL.md not found at {skill_path}", file=sys.stderr)
        return False

    if not content.startswith("---"):
        print("ERROR: Missing YAML frontmatter", file=sys.stderr)
        return False

    parts = content.split("---", 2)
    if len(parts) < 3:
        print("ERROR: Incomplete YAML frontmatter", file=sys.stderr)
        return False

    try:
        metadata = yaml.safe_load(parts[1])
    except yaml.YAMLError as e:
        print(f"ERROR: Invalid YAML - {e}", file=sys.stderr)
        return False

    errors = []

    if "name" not in metadata:
        errors.append("Missing 'name' field")
    elif not re.match(r"^[a-z0-9-]+$", metadata["name"]):
        errors.append(f"Invalid name format: '{metadata['name']}' (must be lowercase, numbers, hyphens only)")

    if "description" not in metadata:
        errors.append("Missing 'description' field")
    elif len(metadata["description"]) > 200:
        errors.append(f"Description too long: {len(metadata['description'])} characters (max 200)")
    elif re.search(r"\b(I|we|you|my|our|your)\b", metadata["description"], re.IGNORECASE):
        errors.append("Description contains first or second person pronouns")

    if errors:
        for error in errors:
            print(f"ERROR: {error}", file=sys.stderr)
        return False

    print("Metadata validation passed")
    return True

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: validate-metadata.py <skill-path>", file=sys.stderr)
        sys.exit(1)

    skill_path = sys.argv[1]
    success = validate_metadata(skill_path)
    sys.exit(0 if success else 1)
