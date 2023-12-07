Feature: User Login

  Scenario: Invalid Users can't login
    Given I'm on the website and see the login button
    When I press the "Login" button
    Then I see the "Login" page
    When I enter a valid Username
    And I enter a valid Password
    And I press the "Login" button on the form
    Then I should be returned to the website's home page
