import plistlib, json

with open("cty.plist", "rb") as f:
    data = plistlib.load(f)

with open("cty.json", "w") as f:
    json.dump(data, f, indent=2)
