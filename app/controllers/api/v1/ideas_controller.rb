class Api::V1::IdeasController < ApplicationController

  def index
    @ideas = Idea.all
    render json: @ideas
  end

  def create
    @idea = Idea.new(idea_params)
    if @idea.save
      render json: @idea
    else
      render json: @idea.errors.full_messages
    end
  end

  def update
    idea = Idea.find(params[:id])
    if idea.update_attributes(idea_params)
      render json: idea
    else
      render json: idea.errors.full_messages
    end
  end

  def destroy
    render json: {}, status: 204 if Idea.find(params[:id]).destroy
  end

  def idea_params
    params.require(:idea).permit(:title, :body, :quality)
  end
end
