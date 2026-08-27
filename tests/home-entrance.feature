Feature: Homepage entrance choreography

  Scenario: The homepage presents git-agent as the autonomous Git handoff
    Given a visitor is evaluating how git-agent fits into an agent workflow
    When the homepage and Git Agent command detail are read
    Then the primary workflow is the bare `git-agent --intent` command
    And the copy says git-agent discovers, stages, splits, validates, and commits changes
    And the copy does not require a manual `git add` step for the default workflow

  Scenario: The installation guide documents the current Pi package
    Given a visitor follows the coding-agent installation guide
    When the guide explains Pi integration
    Then it names the `pi-git-agent` package at version 0.7.3
    And it uses the package's native `/git-agent` menu
    And it points Pi at the package root `index.ts` entrypoint

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

  Scenario: The co-change graph reads one relationship at a time
    Given the graph is visible and motion is enabled
    When git-agent scans the code history
    Then one signal travels from the hub file to one coupled file
    And each file name and coupling score scrolls into place after its signal arrives
    And the next relationship waits until the first signal has finished
    And the completed graph stays still with all relationship data visible
    And reduced-motion visitors see the same static graph without a loop

  Scenario: Narrow command cards keep title glyphs fully visible
    Given a visitor views a command card on a narrow screen
    When the card title renders the second line with descending letters
    Then the title line-height leaves room for the complete glyphs
    And the description below the title remains visible

  Scenario: Each command card expresses its own operation
    Given a visitor hovers or keyboard-focuses a command card with motion enabled
    When the card graphic acknowledges the interaction
    Then init's dots bloom outward from the repository core
    And commit's dot rows settle into an atomic stack
    And related's diagonal dot bands carry a coupling wave
    And status's central dots perform a finite health pulse
    And skills's dot columns resolve from left to right
    And config's offset dot cells snap into alignment
    And init is cropped as a circular seed
    And commit uses a horizontal ledger block
    And related is cropped as a diamond
    And status uses a capsule
    And skills uses a hexagonal index
    And config uses a chamfered square
    And each exterior contour is a clip of the existing dots
    And the graphic adds no rings, lines, labels, or other overlay elements
    And every card sequence finishes without an infinite loop
    And reduced-motion visitors see the same static card graphics
