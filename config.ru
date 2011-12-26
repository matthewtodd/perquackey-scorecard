require 'perquackey'
require 'rack'
require 'sprockets'

map '/api' do
  run Perquackey::Server.new
end

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
