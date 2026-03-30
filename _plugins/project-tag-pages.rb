# Generate tag archive pages for tags that only appear in projects/collections,
# not in posts. jekyll-archives only creates pages for post tags, so project-only
# tags like "solar" would otherwise have no page.

module Jekyll
  class ProjectTagPage < Page
    def initialize(site, base, tag)
      @site = site
      @base = base
      @dir = File.join("blog", "tag", Utils.slugify(tag))
      @name = "index.html"

      self.process(@name)
      self.read_yaml(File.join(base, "_layouts"), "archive-tag.liquid")
      self.data["title"] = tag
      self.data["tag"] = tag
      self.data["posts"] = []
    end
  end

  class ProjectTagPageGenerator < Generator
    safe true
    priority :low  # run after jekyll-archives

    def generate(site)
      return unless site.layouts.key?("archive-tag")

      # Collect tags from all collections (projects, etc.) excluding posts
      collection_tags = Set.new
      site.collections.each do |name, collection|
        next if name == "posts"
        collection.docs.each do |doc|
          tags = doc.data["tags"]
          next unless tags.is_a?(Array)
          tags.each { |t| collection_tags.add(t) }
        end
      end

      # Also collect tags from gallery data
      if site.data["gallery"].is_a?(Array)
        site.data["gallery"].each do |item|
          tags = item["tags"]
          next unless tags.is_a?(Array)
          tags.each { |t| collection_tags.add(t) }
        end
      end

      # Include all tags from hierarchy (parents and children) so every tag
      # in the hierarchy gets a page even if nothing is tagged with it yet
      if site.data["tag_hierarchy"].is_a?(Hash)
        site.data["tag_hierarchy"].each do |parent, children|
          collection_tags.add(parent)
          children.each { |child| collection_tags.add(child) } if children.is_a?(Array)
        end
      end

      # Find which tags already have pages (from jekyll-archives)
      # Compare using slugified names so "electrical engineering" matches "electrical-engineering"
      existing_slugs = Set.new
      site.pages.each do |page|
        if page.dir =~ %r{^/blog/tag/(.+)/$}
          existing_slugs.add($1)
        end
      end

      # Generate pages for missing tags (compare slugified versions)
      collection_tags.each do |tag|
        slug = Utils.slugify(tag)
        next if existing_slugs.include?(slug)
        existing_slugs.add(slug) # prevent duplicates from different casings
        site.pages << ProjectTagPage.new(site, site.source, tag)
      end
    end
  end
end
