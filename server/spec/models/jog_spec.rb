# frozen_string_literal: true
require_relative "../helper"

RSpec.describe Jog do
  context "validations" do
    it "validates user_id is present" do
      jog = build_jog(user_id: nil)

      expect(jog.valid?).to be_falsey
      expect(jog.errors[:user_id]).to include "can't be empty"
    end

    it "validates date is present" do
      jog = build_jog(date: nil)

      expect(jog.valid?).to be_falsey
      expect(jog.errors[:date]).to include "can't be empty"
    end

    it "validates date format" do
      jog = build_jog(date: "123")

      expect(jog.valid?).to be_falsey
      expect(jog.errors[:date]).to include "has an invalid format"
    end

    it "validates distance is present" do
      jog = build_jog(distance: nil)

      expect(jog.valid?).to be_falsey
      expect(jog.errors[:distance]).to include "can't be empty"
    end

    it "validates distance is greater than 0" do
      jog = build_jog(distance: 0)

      expect(jog.valid?).to be_falsey
      expect(jog.errors[:distance]).to include "has to be greater than 0"
    end

    it "validates duration is present" do
      jog = build_jog(duration: nil)

      expect(jog.valid?).to be_falsey
      expect(jog.errors[:duration]).to include "can't be empty"
    end

    it "validates duration is greater than 0" do
      jog = build_jog(duration: 0)

      expect(jog.valid?).to be_falsey
      expect(jog.errors[:duration]).to include "has to be greater than 0"
    end
  end

  it "calculates average speed" do
    jog = build_jog(distance: 1000, duration: 600)

    expect(jog.average_speed).to eq 1000 / 600.to_f
  end
end
