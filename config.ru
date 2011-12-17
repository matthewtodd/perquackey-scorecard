require 'rack'
require 'sprockets'

map '/assets' do
  environment = Sprockets::Environment.new
  environment.append_path 'app/assets/javascripts'
  environment.append_path 'vendor/assets/javascripts'
  run environment
end

map '/' do
  use Rack::Static, :urls => { '/' => 'index.html' }, :root => 'public'
  run Rack::Directory.new('public')
end
