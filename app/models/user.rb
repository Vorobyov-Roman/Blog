class User < ActiveRecord::Base
  validates :name,     presence: true,
                       uniqueness: { case_sensitive: false }
  validates :password, presence: true
  validates :email,    presence: true
end
