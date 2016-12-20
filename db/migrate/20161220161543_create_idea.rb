class CreateIdea < ActiveRecord::Migration[5.0]
  def change
    create_table :ideas do |t|
      t.string :title
      t.string :body
      t.string :quality, default: "swill"
    end
  end
end
