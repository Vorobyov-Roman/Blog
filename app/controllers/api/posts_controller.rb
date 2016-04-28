class Api::PostsController < ApplicationController
  respond_to :json

  def index
    posts = Post.all

    render json: posts
  end

  def create
    user = current_user

    # user.create_post(post_params)

    render json: { auth: current_user }
  end

private
  def post_params
    params.require(:post).permit(:title, :text)
  end
end