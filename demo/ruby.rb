# 1. Modules and Mixins
module Themeable
  def current_palette
    { primary: '#1a3a4a', accent: '#5a1d1d' }
  end
end

# 2. Class with Attributes and Symbols
class Developer
  include Themeable

  attr_accessor :username, :id

  # Constant definition
  VERSION = '2.4.0'

  def initialize(username, id)
    @username = username
    @id = id
    @active = true # Instance variable
  end

  # 3. Predicate Methods and Conditionals
  def active?
    @active && !@id.nil?
  end

  # 4. Blocks, Procs, and Lambdas
  def process_tags(tags)
    # Testing 'each' block with do/end
    tags.each do |tag|
      yield(tag.upcase) if block_given?
    end
  end

  # 5. Complex Logic and Regex
  def validate_token(token)
    return false unless token.is_a?(String)

    # Testing Regex literals and match operator
    token =~ /^[a-z0-9_]+$/i ? true : false
  end
end

# 6. Execution and Standard Library
dev = Developer.new('Dev_Ruby', 101)

# Testing symbol-heavy Hash syntax (Ruby 1.9+)
config = {
  theme: :dark,
  font: 'Monospace',
  retries: 3
}

begin
  puts "User: #{dev.username} | Status: #{dev.active? ? 'Online' : 'Offline'}"

  # Testing block parameters and array methods
  processed = %w[red blue].map(&:capitalize)

  dev.process_tags(processed) { |t| puts "Tag: #{t}" }

rescue StandardError => e
  warn "Error occurred: #{e.message}"
ensure
  puts 'Theme test completed.'
end
