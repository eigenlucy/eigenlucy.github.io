#!/bin/bash
#
# process_gallery.sh (v3 - YAML handling only)
#
# This script manages the Jekyll gallery data file.
# WebP conversion is now handled by Jekyll's imagemagick plugin.
# This script only ensures an entry for every media file exists in _data/gallery.yml.

# --- CONFIGURATION ---
SOURCE_IMG_DIR="assets/img/Gallery"
SOURCE_VIDEO_DIR="assets/video"
DATA_FILE="_data/gallery.yml"
# ---------------------

echo "Note: WebP conversion is now handled by Jekyll's imagemagick plugin."
echo ""
echo "Scanning for new media to add to $DATA_FILE..."

# Function to add a new entry to the YAML file if it doesn't exist
# This version uses simple grep and echo, removing the yq dependency for writing.
add_media_entry() {
  MEDIA_FILE=$1
  MEDIA_TYPE=$2
  
  # Check if the file is already listed in the data file
  if grep -q "file: $MEDIA_FILE" "$DATA_FILE"; then
    # echo "Skipping $MEDIA_FILE, already in data file."
    return
  fi

  echo "-> Found new $MEDIA_TYPE: $MEDIA_FILE. Adding to $DATA_FILE."
  # Append a new, well-formed YAML entry
  echo "- file: "$MEDIA_FILE"" >> "$DATA_FILE"
  echo "  type: "$MEDIA_TYPE"" >> "$DATA_FILE"
  echo "  caption: """ >> "$DATA_FILE"
  echo "  tags: []" >> "$DATA_FILE"
}

# Scan for images
for IMG in "$SOURCE_IMG_DIR"/*.{jpg,jpeg,png,JPG,JPEG,PNG,gif}; do
  if [ -f "$IMG" ]; then
    add_media_entry "$(basename "$IMG")" "image"
  fi
done

# Scan for videos
for VID in "$SOURCE_VIDEO_DIR"/*.{mp4,mov,MOV,MP4,webm}; do
  if [ -f "$VID" ]; then
    add_media_entry "$(basename "$VID")" "video"
  fi
done

echo "Data file update complete."
