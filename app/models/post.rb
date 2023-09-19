class Post < ApplicationRecord
  validates :title, :body, presence: true
  validates :title, length: {minimum: 3}
  validates :body, length: {minimum: 6, maximum: 100}
end
