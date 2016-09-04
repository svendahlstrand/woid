require 'json'
require 'sinatra'
require 'sinatra-index'
require 'sinatra/reloader' if development?

register Sinatra::Index
use_static_index 'index.html'

get '/images.json' do
  content_type :json

  image_file_names = Dir.entries("#{settings.public_folder}/images")

  image_file_names.keep_if do |file|
    file =~ /jpg|jpeg|png|gif$/
  end

  image_file_names.map do |file|
    "./images/#{file}"
  end.to_json
end
