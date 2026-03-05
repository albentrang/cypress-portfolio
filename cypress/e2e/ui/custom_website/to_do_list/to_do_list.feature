Feature: To Do List
  Background: Load the To Do List page
    Given I visit the To Do List page
    And I click the Reset button to clear any existing to do items

  Scenario: Check title
    When I load the To Do List page at the correct sub directory
    Then I should see the title of the web page as "To Do List"

  Scenario Outline: Check text
    When I see an element with the data-cy attribute "<dataCy>"
    Then I should see the expected text "<expText>" from that element
    Examples:
      | dataCy             | expText                          |
      | todo-nav-home-link | Home                             |
      | todo-nav-calc-link | Calculator                       |
      | todo-nav-text-link | Text to File                     |
      | todo-nav-lm-link   | Less or More                     |
      | todo-nav-todo-link | To Do List                       |
      | todo-header        | To Do List                       |
      | todo-tagline       | A simple to do list application! |

  Scenario: Check footer text
    When I see the footer element where the footer text has the data-cy attribute "todo-footer-text"
    Then I should see the expected text "© 2025 by Alben Trang" and the email address "albentrang@gmail.com"

  Scenario Outline: Check links
    When I see clickable text with the data-cy attribute "<dataCy>"
    Then I should expect the link to reference the correct URL "<url>" of the custom website or an external website
    Examples:
      | dataCy                    | url                                             |
      | todo-nav-home-link        | index.html                                      |
      | todo-nav-calc-link        | calculator.html                                 |
      | todo-nav-text-link        | text_to_file.html                               |
      | todo-nav-lm-link          | less_or_more.html                               |
      | todo-nav-todo-link        | to_do_list.html                                 |
      | todo-footer-linkedin-link | https://www.linkedin.com/in/albentrang/         |
      | todo-footer-github-link   | https://github.com/albentrang/cypress-portfolio |

  Scenario Outline: Check element hover effects
    When I hover over the element with the data-cy attribute "<dataCy>"
    And I see the element's background color change to these RGB values: <r>, <g>, <b>
    And I stop hovering over the element
    Then I should see the element's background color revert back to its original color
    Examples:
      | dataCy             | r   | g   | b   |
      | todo-nav-home-link | 233 | 150 | 122 |
      | todo-nav-calc-link | 233 | 150 | 122 |
      | todo-nav-text-link | 233 | 150 | 122 |
      | todo-nav-lm-link   | 233 | 150 | 122 |
      | todo-nav-todo-link | 233 | 150 | 122 |

  Scenario: Add an empty to do item
    When I add a to do item with an empty description
    Then I should see the task description input field display its placeholder text "Enter task description here"

  Scenario: Add a to do item
    When I add a to do item with the text "Buy groceries"
    Then I should see the new to do item with the text "Buy groceries" in the list of to do items
    And I should see the task number is 1

  Scenario: Add 20 to do items
    When I add 20 to do items with the text "Task <num>" where <num> is the task number from 1 to 20
    Then I should see all 20 new to do items with the correct text and task numbers in the list of to do items
    And I should see that the Add button is disabled after adding the 20th to do item

  Scenario: Delete a to do item and check that the task numbers update
    When I add tasks based on the fixture "delete_tasks.json"
    And I delete the task with the description "Task 2"
    Then I should see that "Task 2" is no longer in the list of to do items, and the task numbers should update accordingly with "Task 1" being number 1 and "Task 3" being number 2

  Scenario: Delete all to do items individually and check that the list is empty
    When I add tasks based on the fixture "delete_tasks.json"
    And I delete the task with the description "Task 1"
    And I delete the task with the description "Task 2"
    And I delete the task with the description "Task 3"
    Then I should see that there are no tasks displayed in the list of to do items
    And I should see that the Reset button is hidden when there are no tasks in the list

  Scenario: Search for tasks with the word "a"
    When I add tasks based on the fixture "search_tasks_desc.json"
    And I search for tasks with the keyword "a"
    Then I should see only the tasks that contain the word "a" in their description displayed in the list of to do items even if the word "A" is in a different case

  Scenario: Search for tasks with the word "Task"
    When I add tasks based on the fixture "search_tasks_desc.json"
    And I search for tasks with the keyword "Task"
    Then I should see only the tasks that contain the word "task" in their description displayed in the list of to do items even if the word "Task" is in a different case

  Scenario: Search for tasks with the word "aaaaaaaaaabbbbbbbbbbccccccccccddddddddddeeeeeeeeee"
    When I add tasks based on the fixture "search_tasks_desc.json"
    And I search for tasks with the keyword "aaaaaaaaaabbbbbbbbbbccccccccccddddddddddeeeeeeeeee"
    Then I should see only the tasks that contain the word "aaaaaaaaaabbbbbbbbbbccccccccccddddddddddeeeeeeeeee" in their description displayed in the list of to do items even if the word "Task" is in a different case

  Scenario: Search for tasks with the word "Nothing" and get no results
    When I add tasks based on the fixture "search_tasks_desc.json"
    And I search for tasks with the keyword "Nothing"
    Then I should see no tasks displayed in the list of to do items

  Scenario: Search for tasks with the word "aaaaaaaaaabbbbbbbbbbccccccccccddddddddddeeeeeeeeeef" and get no results
    When I add tasks based on the fixture "search_tasks_desc.json"
    And I search for tasks with the keyword "aaaaaaaaaabbbbbbbbbbccccccccccddddddddddeeeeeeeeeef"
    Then I should see no tasks displayed in the list of to do items

  Scenario: Add a to do item with tags
    When I add a to do item with the text "Finish project report" and the tags "#work #urgent"
    Then I should see the new to do item with the text "Finish project report" and the tags "#work #urgent" in the list of to do items

  Scenario: Add a to do item with one tag
    When I add a to do item with the text "Start project report" and the tags "#work"
    Then I should see the new to do item with the text "Start project report" and the tags "#work" in the list of to do items

  Scenario: Add a to do item with five tags
    When I add a to do item with the text "Start project report" and the tags "#work #urgent #important #todo #review"
    Then I should see the new to do item with the text "Start project report" and the tags "#work #urgent #important #todo #review" in the list of to do items
    And I should see that the Add Tag button is disabled after adding the 5th tag

  Scenario: Delete a tag from a to do item and check that the Add Tag button is enabled again
    When I add a to do item with the text "Start project report" and the tags "#work #urgent #important #todo #review"
    And I delete the tag "#review" from that to do item
    Then I should see that the tag "#review" is no longer displayed for that to do item, and the Add Tag button should be enabled again

  Scenario: Delete all tags from a to do item
    When I add a to do item with the text "Start project report" and the tags "#work #urgent"
    And I delete the tag "#work" from that to do item
    And I delete the tag "#urgent" from that to do item
    Then I should see that there are no tags displayed for that to do item

  Scenario: Search for tasks with the tag "#Work"
    When I add tasks based on the fixture "search_tasks_tags.json"
    And I search for tasks with the keyword "#Work"
    Then I should see only the tasks that have the tag "#work" displayed in the list of to do items even if the tag is in a different case

  Scenario: Search for tasks with the tag "#a"
    When I add tasks based on the fixture "search_tasks_tags.json"
    And I search for tasks with the keyword "#a"
    Then I should see only the tasks that have the tag "#a" displayed in the list of to do items even if the tag is in a different case

  Scenario: Search for tasks with the tag "#aaaaaaaaaabbbbbbbbbb"
    When I add tasks based on the fixture "search_tasks_tags.json"
    And I search for tasks with the keyword "#aaaaaaaaaabbbbbbbbbb"
    Then I should see only the tasks that have the tag "#aaaaaaaaaabbbbbbbbbb" displayed in the list of to do items even if the tag is in a different case

  Scenario: Search for tasks with the tag "#Nothing" and get no results
    When I add tasks based on the fixture "search_tasks_tags.json"
    And I search for tasks with the keyword "#Nothing"
    Then I should see no tasks displayed in the list of to do items

  Scenario: Search for tasks with the tag "#aaaaaaaaaabbbbbbbbbbc" and get no results
    When I add tasks based on the fixture "search_tasks_tags.json"
    And I search for tasks with the keyword "#aaaaaaaaaabbbbbbbbbbc"
    Then I should see no tasks displayed in the list of to do items

  Scenario: Check that the priority levels are present in the priority dropdown menu
    When I add a to do item with the text "Task with priority" and select the priority level dropdown menu
    Then I should see the options "Low", "Medium", "High", and "Critical" in the priority level dropdown menu

  Scenario: Sort tasks by priority from low to high
    When I add tasks based on the fixture "sort_tasks.json"
    And I click the sort button to sort by priority from low to high
    Then I should see the tasks sorted by priority from low to high in the list of to do items, and if there are tasks with the same priority level, they should be sorted in alphabetical order based on their task description

  Scenario: Sort tasks by priority from high to low
    When I add tasks based on the fixture "sort_tasks.json"
    And I click the sort button to sort by priority from high to low
    Then I should see the tasks sorted by priority from high to low in the list of to do items, and if there are tasks with the same priority level, they should be sorted in alphabetical order based on their task description

  Scenario: Download the to do list as a JSON file
    When I add tasks based on the fixture "download_tasks.json"
    And I click the Download button
    Then I should see a JSON file named "to_do_list.json" downloaded to my computer that contains all the information from the list of to do items

  Scenario: Download the to do list with a specific file name as a JSON file
    When I add tasks based on the fixture "download_tasks.json"
    And I enter the file name "my_list.json" in the file name input field
    And I click the Download button
    Then I should see a JSON file named "my_list.json" downloaded to my computer that contains all the information from the list of to do items

  Scenario: Download the to do list with a long file name and enforce character limit
    When I add tasks based on the fixture "download_tasks.json"
    And I enter the file name "aaaaaaaaaabbbbbbbbbbccccccccccddddd.json" in the file name input field
    Then I should see that the file name input field only shows the first 30 characters "aaaaaaaaaabbbbbbbbbbccccccccccdd.json" and does not allow me to enter more than 30 characters in the file name input field

  Scenario: Drag and drop to reorder tasks
    When I add tasks based on the fixture "drag_tasks.json"
    And I drag the task with the description "Task 3" and drop it above the task with the description "Task 1"
    Then I should see that "Task 3" is now above "Task 1" in the list of to do items, and the task numbers should update accordingly to reflect the new order of the tasks
  
