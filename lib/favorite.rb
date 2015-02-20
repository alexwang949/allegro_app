require 'active_record'

class Favorite < ActiveRecord::Base
	belongs_to :user
	belongs_to :event
end