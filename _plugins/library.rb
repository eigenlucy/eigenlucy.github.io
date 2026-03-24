require 'pdf-reader'

module Jekyll
  class LibraryGenerator < Generator
    safe true
    priority :low

    LIBRARY_DIR = "assets/library"

    def generate(site)
      lib_path = File.join(site.source, LIBRARY_DIR)
      return unless File.directory?(lib_path)

      # Load manual overrides: _data/library.yml
      # Each entry keyed by filename, e.g.:
      #   "somefile.pdf":
      #     title: "Custom Title"
      #     hidden: true
      overrides = site.data["library_overrides"] || {}

      items = []

      Dir.glob(File.join(lib_path, "**/*")).sort.each do |filepath|
        next if File.directory?(filepath)

        filename = File.basename(filepath)
        relpath = filepath.sub(site.source + "/", "")
        ext = File.extname(filename).downcase

        override = overrides[filename] || {}
        next if override["hidden"]

        title = override["title"] || extract_title(filepath, ext, filename)

        items << {
          "title"    => title,
          "filename" => filename,
          "path"     => "/" + relpath,
          "ext"      => ext.delete("."),
          "size"     => format_size(File.size(filepath))
        }
      end

      # Sort by title, case-insensitive
      items.sort_by! { |i| i["title"].downcase }

      site.data["library"] = items
    end

    private

    def extract_title(filepath, ext, filename)
      if ext == ".pdf"
        pdf_title(filepath) || humanize(filename)
      else
        humanize(filename)
      end
    end

    def pdf_title(filepath)
      reader = PDF::Reader.new(filepath)
      info = reader.info || {}
      title = info[:Title]
      # Return nil if title is blank or just the filename
      title && !title.strip.empty? ? title.strip : nil
    rescue => e
      Jekyll.logger.warn "Library:", "Could not read PDF metadata for #{filepath}: #{e.message}"
      nil
    end

    def humanize(filename)
      File.basename(filename, File.extname(filename))
        .gsub(/[-_]/, " ")
        .gsub(/([a-z])([A-Z])/, '\1 \2')
        .strip
    end

    def format_size(bytes)
      if bytes >= 1_048_576
        "#{(bytes / 1_048_576.0).round(1)} MB"
      elsif bytes >= 1024
        "#{(bytes / 1024.0).round(0)} KB"
      else
        "#{bytes} B"
      end
    end
  end
end
