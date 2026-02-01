import json
import sys

# Force UTF-8 for stdout
sys.stdout.reconfigure(encoding='utf-8')

def load_json(path):
    with open(path, 'r', encoding='utf-8') as f:
        return json.load(f)

def get_all_keys(obj, prefix=""):
    keys = []
    if isinstance(obj, dict):
        for k, v in obj.items():
            new_key = f"{prefix}.{k}" if prefix else k
            keys.extend(get_all_keys(v, new_key))
    else:
        keys.append(prefix)
    return keys

def get_value(obj, path):
    parts = path.split('.')
    curr = obj
    for p in parts:
        if isinstance(curr, dict) and p in curr:
            curr = curr[p]
        else:
            return None
    return curr

def main():
    base_path = r"c:\Users\vfilip\projects\Wedding website\vaclav_cinzia_wedding\src\locales"
    en = load_json(f"{base_path}\\en.json")
    it = load_json(f"{base_path}\\it.json")
    de = load_json(f"{base_path}\\de.json")

    keys = get_all_keys(en)
    
    # Print in a format easy to parse mentally
    print(f"{'KEY':<50} | {'LANG':<5} | VALUE")
    print("-" * 100)
    
    for k in keys:
        val_en = get_value(en, k)
        val_it = get_value(it, k)
        val_de = get_value(de, k)
        
        # Check for obvious mismatches (skip simple ones like 'Home'='Home' if we want, but user wants thorough)
        # We will print ALL for the user to be sure, or at least the non-trivial ones.
        # To avoid output limit, let's focus on logic:
        # We will print the key, and then the 3 values on separate lines if they are long.
        
        print(f"[{k}]")
        print(f"  EN: {val_en}")
        print(f"  IT: {val_it}")
        print(f"  DE: {val_de}")
        print("")

if __name__ == "__main__":
    main()
