# frozen_string_literal: true
class Jogs < Cuba
  using Utils::Hash

  def jog_params
    req.params.slice("date", "duration", "distance")
  end

  define do
    on get, root do
      jogs = current_user.jogs

      json serialize(jogs)
    end

    on post, root do
      jog = Jog.new(jog_params.merge(user_id: current_user.id))

      if jog.valid?
        jog.save
        json serialize(jog)
      else
        unprocessable_entity(errors: jog.errors.full_messages)
      end
    end

    on get, ":id" do |id|
      jog = current_user.jogs_dataset[id.to_i]

      if jog
        json serialize(jog)
      else
        not_found
      end
    end

    on (patch or put), ":id" do |id|
      jog = current_user.jogs_dataset[id.to_i]

      if jog.update(jog_params)
        json serialize(jog)
      else
        unprocessable_entity(errors: jog.errors.full_messages)
      end
    end

    on delete, ":id" do |id|
      jog = current_user.jogs_dataset[id.to_i]

      if jog.destroy
        no_content
      else
        server_error
      end
    end
  end
end
