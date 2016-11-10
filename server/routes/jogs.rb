# frozen_string_literal: true
class Jogs < Cuba
  using Utils::Hash

  def jog_params
    req.params.slice("date", "duration", "distance")
  end

  define do
    user = vars[:user]

    on get, root do
      jogs = if req.params["date_from"] && req.params["date_to"]
               from = req.params["date_from"]
               to = req.params["date_to"]
               user.jogs_dataset.where("date BETWEEN ?::date AND ?::date", from, to)
             else
               jogs = user.jogs_dataset
             end

      jogs = jogs.order(Sequel.desc(:date)).all

      json serialize(jogs)
    end

    on post, root do
      jog = Jog.new(jog_params.merge(user_id: user.id))

      if jog.valid?
        jog.save
        json serialize(jog)
      else
        unprocessable_entity(errors: jog.errors.full_messages)
      end
    end

    on get, ":id" do |id|
      jog = user.jogs_dataset[id.to_i]

      if jog
        json serialize(jog)
      else
        not_found
      end
    end

    on (patch or put), ":id" do |id|
      jog = user.jogs_dataset[id.to_i]

      on jog do
        jog.set(jog_params)
        if jog.save(raise_on_failure: true)
          json serialize(jog)
        else
          unprocessable_entity(errors: jog.errors.full_messages)
        end
      end
    end

    on delete, ":id" do |id|
      jog = user.jogs_dataset[id.to_i]

      on jog do
        if jog.destroy
          no_content
        else
          server_error
        end
      end
    end
  end
end
