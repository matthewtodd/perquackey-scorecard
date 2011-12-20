Feature: Scoring
  Scenario: Capturing some words
    Given I am on the page
    When I type in "pot"
    And I type in "pat"
    Then I see these words:
      |  3  |
      | pot |
      | pat |
    And I see that my score is 70
