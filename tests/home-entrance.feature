Feature: Homepage entrance choreography

  Scenario: The browser canvas starts in the site color scheme
    Given a visitor opens the homepage from a cold navigation
    When the document head is parsed before external stylesheets
    Then the document declares a dark color scheme
    And the browser canvas does not default to a light surface

  Scenario: The graph surface waits for the hero title
    Given a visitor opens the homepage with motion enabled
    When the terminal title is still typing
    Then the page background remains dark
    And the "An agent that knows your code" cream graph surface is not visible
    When the title has finished typing
    Then the graph surface fades in as one progressive page section
