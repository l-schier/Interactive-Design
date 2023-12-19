Feature: User Account

  Narrative:
    As a user, I want to get an account to receive all of the benefits that come with that.
    Acceptance Criteria: The user has an account which they can access.

  Scenario: Non-account users have no ability to comment, upvote, or downvote a post.
    Given that I’m on the website
    And I see the “sign up” button
    When I press “sign up”
    And I enter a username, email address, and a password
    Then the user enters those details and can press the “create account” button
    And they are returned to the log in page to log in to their new account
