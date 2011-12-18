guard 'bundler' do
  watch 'Gemfile'
end

spec_location = 'spec/javascripts/%s_spec'

guard 'jasmine-headless-webkit' do
  watch(%r{^app/assets/javascripts/(.*)\.js$}) { |m| newest_js_file(spec_location % m[1]) }
  watch(%r{^spec/javascripts/(.*)_spec\..*})   { |m| newest_js_file(spec_location % m[1]) }
end
