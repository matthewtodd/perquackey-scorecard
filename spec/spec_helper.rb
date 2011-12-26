require 'capybara/webkit'
require 'rack'
require 'turnip/capybara'

Capybara.app = Rack::Builder.parse_file('config.ru').first
Capybara.default_driver = :webkit
Capybara.configure do |config|
  config.server_boot_timeout = 120
end

step 'I am on the page' do
  visit '/'
end

step 'I type in :word' do |word|
  # I would love to just send "#{word}\n", but it seems the newline's being
  # turned into a space in the capybara-webkit socket protocol. (Otherwise,
  # capybara-webkit would happily trigger the proper keyUp event for me.) It
  # would be well worth digging further into capybara-webkit to see if I can
  # help fix this problem.
  fill_in 'word', :with => word
  # TODO don't find the view by its internal id.
  page.execute_script 'Ember.View.views.ember198.insertNewline()'
end

step 'I see these words:' do |expected|
  expected.rows.each.with_index do |row, row_index|
    row.each.with_index do |word, col_index|
      selector = 'tbody tr:nth(%d) td:nth(%d)' % [row_index.succ, col_index.succ]
      page.should have_selector(:css, selector, :text => word)
    end
  end
end

step 'I see that my score is :score' do |score|
  page.should have_content("Score: #{score}")
end
