require 'pry'
require 'sinatra/reloader'
require './lib/mood.rb'
require './lib/piece.rb'
require './lib/user.rb'
require './lib/connection.rb'
# require './lib/database.yml'
# require './environments.rb'
require './lib/event.rb'
require './lib/favorite.rb'
require 'sinatra'
require 'mustache'
require 'HTTParty'

##### SESSION STUFF ##########

configure do
	enable :sessions
	set :session_secret, 'secret'
end

get '/' do 
	login_page = File.read('./views/login.html')
end

# create a new user 
post '/users' do 
	new_user = User.create(params)
	redirect('/')
end

# login 
post '/login' do
	current_user = User.find_by(username: params[:username])
	if current_user && current_user["password"] == params["password"]
		session["user_id"] = current_user["id"]
		redirect('/welcome')
	else
		redirect('/')
	end
end

######### DISPLAY PIECES FOR VIDEO DB  ##########
get '/welcome' do
	index = File.read('./views/index.html')
	moods = Mood.all.to_a
	rendered = Mustache.render(index, {block: moods})
end

get '/moods' do
	moods = Mood.all.to_json
end

get '/moods/:id' do
	pieces = Piece.where(mood_id: params[:id]).to_json
end

# API CALL EVENTS, CONDITIONAL TO CHECK IF EVENT EXISTS.
# 	IF DOESN'T EXIST, ADD TO EVENTS TABLE

get '/events' do 
	response = HTTParty.get('http://api.nytimes.com/svc/events/v2/listings.json?&filters=category:Classical&limit=5&api-key=bf3013d600013e74c7e448bff56e2f1f:18:70373815')
	results = response['results']
	results.each do |event|
		if Event.find_by(event_api_id: event['event_id']) == nil
			event = Event.create({event_name: event['event_name'], venue_name: event['venue_name'], neighborhood: event['neighborhood'], street_address: event['street_address'], telephone: event['telephone'], web_description: event['web_description'], postal_code: event['postal_code'], venue_detail_url: event['venue_detail_url'], date_time_description: event['date_time_description'], event_api_id: event['event_id']})
		end
	end
	return "yeup"
end

get '/eventsdb' do 
	events = Event.limit(5).to_json
end

# ADD EVENT TO FAVS ##

post '/favorites' do 
	user_id = session["user_id"]
	new_favorite = Favorite.create({user_id: user_id, event_id: params["event_id"]})
end

## GET ALL MY FAV EVENTS

get '/favorites/user' do 
	user = User.find(session['user_id'])
	events = user.events.to_json
end

delete '/favorites/:id' do 
	user_id = session["user_id"]
	find_fav = Favorite.where(:user_id => user_id, :event_id => params[:id])
	Favorite.destroy(find_fav)
end



































