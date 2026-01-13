#!/bin/bash

# Define directories
INCOMING_DIR="_incoming"
DOCS_DIR="docs"

echo "Starting Deploy Express extraction..."

# Ensure docs directory exists
if [ ! -d "$DOCS_DIR" ]; then
    echo "Creating $DOCS_DIR directory..."
    mkdir -p "$DOCS_DIR"
fi

# Function to extract zip file
extract_zip() {
    local zip_file="$1"
    if [ -f "$INCOMING_DIR/$zip_file" ]; then
        echo "Found $zip_file. Extracting..."
        unzip -o -q "$INCOMING_DIR/$zip_file" -d .
        if [ $? -eq 0 ]; then
            echo "Successfully extracted $zip_file."
        else
            echo "Error extracting $zip_file."
        fi
    else
        echo "MISSING: $zip_file not found in $INCOMING_DIR."
    fi
}

# Function to move file
move_file() {
    local filename="$1"
    local dest="$2"
    if [ -f "$INCOMING_DIR/$filename" ]; then
        echo "Found $filename. Moving to $dest..."
        mv "$INCOMING_DIR/$filename" "$dest/"
        echo "Moved $filename to $dest."
    else
        echo "MISSING: $filename not found in $INCOMING_DIR."
    fi
}

# 1. Extract ZIPs
extract_zip "TRYONYOU_PILOT_COMPLETE.zip"
extract_zip "TRYONYOU_COMPLETE_PROJECT.zip"
extract_zip "TRYONYOU_4_ESPECIFICACIONES.zip"

# 2. Move Documents
move_file "tryonyou notas proyecto.pdf" "$DOCS_DIR"
move_file "ESTRUCTURA DEL PROYECTO.txt" "$DOCS_DIR"

echo "Extraction process complete."
