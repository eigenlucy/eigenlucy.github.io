require 'httparty'
require 'json'
require 'jekyll'

module HackadayPosts
  class HackadayPostsGenerator < Jekyll::Generator
    safe true
    priority :high

    BASE_URL = 'https://api.hackaday.io/v1'

    def generate(site)
      config = site.config['hackaday_source']
      return unless config

      api_key = ENV['HACKADAY_API_KEY'] || config['api_key']
      return unless api_key && !api_key.empty?

      project_ids = config['projects'] || []

      # If no explicit projects listed, try to discover all from user_id
      if project_ids.empty? && config['user_id']
        p "Fetching Hackaday.io projects for user #{config['user_id']}..."
        project_ids = fetch_user_project_ids(config['user_id'], api_key)
      end

      return if project_ids.empty?

      project_ids.each do |pid|
        project = fetch_json("#{BASE_URL}/projects/#{pid}?api_key=#{api_key}")
        next unless project
        next if project['code'] # skip error responses

        add_project_post(site, project, pid)

        # Also pull project logs if any exist
        log_count = project['logs'] || 0
        if log_count > 0
          project_name = project['name'] || "Hackaday Project"
          logs_data = fetch_json("#{BASE_URL}/projects/#{pid}/logs?api_key=#{api_key}&sortby=newest&per_page=50")
          logs = extract_list(logs_data, 'logs')
          logs.each { |log| add_log_post(site, log, project_name, pid) }
        end
      end
    end

    private

    def fetch_json(url)
      response = HTTParty.get(url)
      return nil unless response.success?
      JSON.parse(response.body)
    rescue => e
      p "Hackaday API error: #{e.message}"
      nil
    end

    def fetch_user_project_ids(user_id, api_key)
      data = fetch_json("#{BASE_URL}/users/#{user_id}/projects?api_key=#{api_key}&per_page=50")
      projects = extract_list(data, 'projects')
      projects.map { |p| p['id'] }.compact
    end

    def extract_list(data, key)
      return [] unless data
      return data if data.is_a?(Array)
      data[key] || data['list'] || []
    end

    def add_project_post(site, project, project_id)
      title = project['name'] || 'Untitled'
      summary = project['summary'] || ''
      description = project['description'] || summary
      url = project['url'] || "https://hackaday.io/project/#{project_id}"
      created = project['created']

      p "Fetching Hackaday.io project: #{title}"

      slug = title.downcase.strip.gsub(' ', '-').gsub(/[^\w-]/, '')
      path = site.in_source_dir("_posts/#{slug}.md")

      doc = Jekyll::Document.new(
        path, { site: site, collection: site.collections['posts'] }
      )

      doc.data['external_source'] = 'hackaday.io'
      doc.data['feed_content'] = description
      doc.data['title'] = title
      doc.data['description'] = summary
      doc.data['date'] = parse_date(created)
      doc.data['redirect'] = url

      site.collections['posts'].docs << doc
    end

    def add_log_post(site, log, project_name, project_id)
      title = log['title'] || 'Untitled'
      body = log['body'] || log['content'] || ''
      created = log['created'] || log['date'] || log['published']
      log_id = log['id']
      url = log['url'] || "https://hackaday.io/project/#{project_id}/log/#{log_id}"

      p "  ...log: #{title}"

      slug = title.downcase.strip.gsub(' ', '-').gsub(/[^\w-]/, '')
      path = site.in_source_dir("_posts/#{slug}.md")

      doc = Jekyll::Document.new(
        path, { site: site, collection: site.collections['posts'] }
      )

      doc.data['external_source'] = 'hackaday.io'
      doc.data['feed_content'] = body
      doc.data['title'] = title
      doc.data['description'] = "#{project_name} — Hackaday.io"
      doc.data['date'] = parse_date(created)
      doc.data['redirect'] = url

      site.collections['posts'].docs << doc
    end

    def parse_date(date_str)
      return DateTime.now unless date_str
      # Hackaday API returns Unix timestamps (integers)
      if date_str.is_a?(Integer) || date_str.to_s =~ /^\d+$/
        Time.at(date_str.to_i).to_datetime
      else
        DateTime.parse(date_str.to_s)
      end
    rescue
      DateTime.now
    end
  end
end
