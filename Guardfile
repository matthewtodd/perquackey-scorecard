guard 'bundler' do
  watch 'Gemfile'
end

spec_location = 'spec/javascripts/%s_spec'

guard 'jasmine-headless-webkit' do
  watch(%r{^app/assets/javascripts/(.*)\.js$}) { |m| newest_js_file(spec_location % m[1]) }
  watch(%r{^spec/javascripts/(.*)_spec\..*})   { |m| newest_js_file(spec_location % m[1]) }
end

guard 'rspec', :version => 2 do
  watch(%r{^spec/.+_spec\.rb$})
  watch(%r{^lib/(.+)\.rb$})     { |m| "spec/lib/#{m[1]}_spec.rb" }
  watch('spec/spec_helper.rb')  { "spec" }
end

