#!/usr/bin/env ruby
# frozen_string_literal: true

`git clone --depth=1 git@github.com:ca-cwds/acceptance_testing.git`
`rm -rf acceptance_testing/.git`
Dir.chdir('acceptance_testing') do
  `git clone --depth=1 git@github.com:ca-cwds/integrated-test-environment.git bubble`
  `rm -rf bubble/.git`
  Dir.chdir('bubble') do
    puts "Using this intake image ==> #{ENV['INTAKE_IMAGE_VERSION'] || \
      'No image provided ¯\_(ツ)_/¯'}"
    `docker-compose -p acceptance_bubble_#{ENV['BUILD_NUMBER']} -f docker-compose.bubble.yml \
      build acceptance_testing`
    exec("docker-compose -p acceptance_bubble_#{ENV['BUILD_NUMBER']} -f \
          docker-compose.bubble.yml up --exit-code-from acceptance_testing acceptance_testing")
  end
end
