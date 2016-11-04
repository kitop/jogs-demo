# frozen_string_literal: true
class Admin < Cuba
  class Jogs < Cuba
    using Utils::Hash

    def jog_params
      attributes = ["user_id", "date", "distance", "duration"]
      req.params.slice(*attributes)
    end

    define do
      on get, root do
        jogs = if req.params["date_from"] && req.params["date_to"]
                from = req.params["date_from"]
                to = req.params["date_to"]
                Jog.where("date BETWEEN ?::date AND ?::date", from, to)
               else
                 Jog
               end

        jogs = jogs.order(Sequel.desc(:date)).all

        json serialize(jogs)
      end

      on post, root do
        jog = Jog.new(jog_params)

        if jog.valid?
          jog.save
          json serialize(jog)
        else
          unprocessable_entity(errors: jog.errors.full_messages)
        end
      end

      on get, ":id" do |id|
        jog = Jog[id.to_i]

        if jog
          json serialize(jog)
        else
          not_found
        end
      end

      on (patch or put), ":id" do |id|
        jog = Jog[id.to_i]

        on jog do
          if jog.update(jog_params)
            json serialize(jog)
          else
            unprocessable_entity(errors: jog.errors.full_messages)
          end
        end
      end

      on delete, ":id" do |id|
        jog = Jog[id.to_i]

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
end
