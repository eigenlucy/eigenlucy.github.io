#!/bin/bash
#
# process_gallery.sh (v2 - Simplified YAML handling)
#
# This script intelligently processes media for the Jekyll gallery.
# It converts new images to WebP and ensures an entry for every media file
# exists in _data/gallery.yml.

# --- CONFIGURATION ---
SOURCE_IMG_DIR="assets/img/Gallery"
SOURCE_VIDEO_DIR="assets/video"
WEBP_DIR="assets/img/Gallery/webp"
DATA_FILE="_data/gallery.yml"
WIDTHS=(480 800 1400)
QUALITY=85
# ---------------------

# Ensure the output directory for webp images exists
mkdir -p "$WEBP_DIR"

echo "Processing new images..."
find "$SOURCE_IMG_DIR" -maxdepth 1 -type f \( -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.png" \) | while read -r IMG_PATH; do
  FILENAME_WITH_EXT=$(basename "$IMG_PATH")
  FILENAME="${FILENAME_WITH_EXT%.*}"
  
  if [ -f "$WEBP_DIR/$FILENAME-${WIDTHS[-1]}.webp" ]; then
    continue
  fi
  
  echo "-> Converting $FILENAME_WITH_EXT..."
  for WIDTH in "${WIDTHS[@]}"; do
    OUTPUT_PATH="$WEBP_DIR/$FILENAME-$WIDTH.webp"
    cwebp -q "$QUALITY" -resize "$WIDTH" 0 "$IMG_PATH" -o "$OUTPUT_PATH"
  done
done
echo "Image conversion complete."

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
