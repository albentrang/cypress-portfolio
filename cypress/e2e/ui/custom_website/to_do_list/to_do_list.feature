Feature: To Do List
  Background: Load the To Do List page
    Given I visit the To Do List page
    And I click the Reset button to clear any existing tasks

  Scenario: Check title
    When I load the To Do List page at the correct sub directory
    Then I should see the title of the web page as "To Do List"

  Scenario: Check footer text
    When I see the footer element where the footer text has the data-cy attribute "todo-footer-text"
    Then I should see the expected text "© 2025 by Alben Trang" and the email address "albentrang@gmail.com"

  Scenario: Check links
    When I see clickable text based on the data from the "to_do_list.json" fixture file
    Then I should see the correct URL for each link based on the data from the given fixture file

  Scenario: Add an empty task
    When I add a task with "" as the description
    Then I should see 1 tasks in the list of tasks
    And I should see the task number is "1", the task description is "", and the priority is "Low"
    And There are no tags displayed for task 1

  Scenario: Add a task
    When I add a task with "Buy groceries" as the description
    Then I should see 1 tasks in the list of tasks
    And I should see the task number is "1", the task description is "Buy groceries", and the priority is "Low"
    And There are no tags displayed for task 1

  Scenario: Add 20 tasks
    When I add 20 tasks with the text "Task num" where num is the task number from 1 to 20
    Then I should see all 20 new tasks with the correct text and task numbers in the list of tasks
    And I should see that the Add button is disabled after adding the 20th task

  Scenario: Delete the first task and check that the task numbers update
    When I add tasks based on the fixture "delete_tasks.json"
    And I delete task 1
    Then I should see that task 1 with the description "Task 1" is gone
    And The second task is now the first task with the description "Task 2", and the third task is now the second task with the description "Task 3" in the list of tasks
    And I should see that the Reset button is still visible when there are still tasks in the list

  Scenario: Delete a task in the middle and check that the task numbers update
    When I add tasks based on the fixture "delete_tasks.json"
    And I delete task 2
    Then I should see that task 2 with the description "Task 2" is gone
    And The first task is still there with the description "Task 1", and the third task is now the second task with the description "Task 3" in the list of tasks
    And I should see that the Reset button is still visible when there are still tasks in the list

  Scenario: Delete the last task and check that the task numbers update
    When I add tasks based on the fixture "delete_tasks.json"
    And I delete task 3
    Then I should see that task 3 is gone
    And The first task is still there with the description "Task 1", and the second task is still there with the description "Task 2" in the list of tasks
    And I should see that the Reset button is still visible when there are still tasks in the list

  Scenario: Add 20 tasks and then delete one
    When I add 20 tasks with the text "Task num" where num is the task number from 1 to 20
    And I delete task 20
    Then I should see that task 20 is gone
    And I should see that the Add button is enabled again after deleting a task from the list

  Scenario: Delete all tasks individually and check that the list is empty
    When I add tasks based on the fixture "delete_tasks.json"
    And I delete task 3
    And I delete task 2
    And I delete task 1
    Then I should see that there are no tasks displayed in the list of tasks
    And I should see that the Reset button is hidden when there are no tasks in the list

  Scenario: Search for tasks with the word "a"
    When I add tasks based on the fixture "search_tasks_desc.json"
    And I search for tasks with the keyword "a"
    Then I should see 6 tasks that contain the "a" in their descriptions while ignoring casing

  Scenario: Search for tasks with the word "Task"
    When I add tasks based on the fixture "search_tasks_desc.json"
    And I search for tasks with the keyword "Task"
    Then I should see 3 tasks that contain the "Task" in their descriptions while ignoring casing

  Scenario: Search for tasks with the word "aaaaaaaaaabbbbbbbbbbccccccccccddddddddddeeeeeeeeee"
    When I add tasks based on the fixture "search_tasks_desc.json"
    And I search for tasks with the keyword "aaaaaaaaaabbbbbbbbbbccccccccccddddddddddeeeeeeeeee"
    Then I should see 1 tasks that contain the "aaaaaaaaaabbbbbbbbbbccccccccccddddddddddeeeeeeeeee" in their descriptions while ignoring casing

  Scenario: Search for tasks with the word "Nothing" and get no results
    When I add tasks based on the fixture "search_tasks_desc.json"
    And I search for tasks with the keyword "Nothing"
    Then I should see that there are no tasks displayed in the list of tasks

  Scenario: Search for tasks with a word over 50 characters long and get no results
    When I add tasks based on the fixture "search_tasks_desc.json"
    And I search for tasks with the keyword "aaaaaaaaaabbbbbbbbbbccccccccccddddddddddeeeeeeeeeef"
    Then I should see that there are no tasks displayed in the list of tasks

  Scenario: Add a task with tags
    When I add a task with the text "Finish project report" and the tags "#work #urgent"
    Then I should see task 1 with the text "Finish project report" and the tags "#work #urgent" in the list of tasks

  Scenario: Add a task with one tag
    When I add a task with the text "Start project report" and the tags "#work"
    Then I should see task 1 with the text "Start project report" and the tags "#work" in the list of tasks

  Scenario: Add a task with five tags
    When I add a task with the text "Start project report" and the tags "#work #urgent #important #todo #review"
    Then I should see task 1 with the text "Start project report" and the tags "#work #urgent #important #todo #review" in the list of tasks
    And I should see that the Add Tag button is disabled after adding the 5th tag on task 1

  Scenario: Add a task with five tags at their character limits
    When I add a task with the text "Start project report" and the tags "aaaaaaaaaabbbbbbbbbb ccccccccccdddddddddd eeeeeeeeeffffffffff gggggggggghhhhhhhhhh iiiiiiiiijjjjjjjjjj"
    Then I should see task 1 with the text "Start project report" and the tags "#aaaaaaaaaabbbbbbbbbb #ccccccccccdddddddddd #eeeeeeeeeffffffffff #gggggggggghhhhhhhhhh #iiiiiiiiijjjjjjjjjj" in the list of tasks
    And I should see that the Add Tag button is disabled after adding the 5th tag on task 1

  Scenario: Delete a tag from a task and check that the Add Tag button is enabled again
    When I add a task with the text "Start project report" and the tags "#work #urgent #important #todo #review"
    And I delete the tag 5 from task 1
    Then I should see task 1 with the text "Start project report" and the tags "#work #urgent #important #todo" in the list of tasks
    And I should see that the Add Tag button is enabled again for task 1

  Scenario: Delete all tags from a task
    When I add a task with the text "Start project report" and the tags "#work #urgent"
    And I delete the tag 2 from task 1
    And I delete the tag 1 from task 1
    Then There are no tags displayed for task 1
    And I should see that the Add Tag button is enabled again for task 1

  Scenario: Delete and add tags to a task and check that the tags update correctly
    When I add a task with the text "Start project report" and the tags "#work #urgent"
    And I delete the tag 1 from task 1
    And I add the tag "#important" to task 1
    Then I should see task 1 with the text "Start project report" and the tags "#urgent #important" in the list of tasks

  Scenario: Check for no duplicate tags allowed
    When I add a task with the text "Check duplicate tags" and the tags "#a"
    And I add the tag "a" to task 1
    Then I should see task 1 with the text "Check duplicate tags" and the tags "#a" in the list of tasks

  Scenario: Search for tasks with the tag "#Work"
    When I add tasks based on the fixture "search_tasks_tags.json"
    And I search for tasks with the keyword "#Work"
    Then I should see 2 tasks in the list of tasks
    And Each task contains at least one tag that has the text "#Work" while ignoring casing and the hashtag symbol

  Scenario: Search for tasks with the tag "#a"
    When I add tasks based on the fixture "search_tasks_tags.json"
    And I search for tasks with the keyword "#a"
    Then I should see 2 tasks in the list of tasks
    And Each task contains at least one tag that has the text "#a" while ignoring casing and the hashtag symbol

  Scenario: Search for tasks with the tag "#aaaaaaaaaabbbbbbbbbb"
    When I add tasks based on the fixture "search_tasks_tags.json"
    And I search for tasks with the keyword "#aaaaaaaaaabbbbbbbbbb"
    Then I should see 1 tasks in the list of tasks
    And Each task contains at least one tag that has the text "#aaaaaaaaaabbbbbbbbbb" while ignoring casing and the hashtag symbol

  Scenario: Search for tasks with the tag "#Nothing" and get no results
    When I add tasks based on the fixture "search_tasks_tags.json"
    And I search for tasks with the keyword "#Nothing"
    Then I should see that there are no tasks displayed in the list of tasks

  Scenario: Search for tasks with the tag "#aaaaaaaaaabbbbbbbbbbc" and get no results
    When I add tasks based on the fixture "search_tasks_tags.json"
    And I search for tasks with the keyword "#aaaaaaaaaabbbbbbbbbbc"
    Then I should see that there are no tasks displayed in the list of tasks

  Scenario: Sort tasks by priority from low to high
    When I add tasks based on the fixture "sort_tasks.json"
    And I click the sort button to sort by priority from low to high
    Then I should see the tasks from "sort_tasks.json" sorted by priority and alphabetically from low to high in the list of tasks

  Scenario: Sort tasks by priority from high to low
    When I add tasks based on the fixture "sort_tasks.json"
    And I click the sort button to sort by priority from high to low
    Then I should see the tasks from "sort_tasks.json" sorted by priority and alphabetically from high to low in the list of tasks

  Scenario: Download the to do list as a JSON file
    When I add tasks based on the fixture "download_tasks.json"
    And I click the Download button
    Then I should see a JSON file named "to_do_list.json" downloaded to my computer that contains all the information from "download_tasks.json"

  Scenario Outline: Download the to do list with a specific file name as a JSON file
    When I add tasks based on the fixture "download_tasks.json"
    And I enter the file name "<fileName>.json" in the file name input field and click the Download button
    Then I should see a JSON file named "<fileName>.json" downloaded to my computer that contains all the information from "download_tasks.json"
    Examples:
      | fileName                       |
      | a                              |
      | tasks_backup                   |
      | abcdefghijabcdefghijabcdefghij |

# Scenario: Drag and drop to reorder tasks
#   When I add tasks based on the fixture "drag_tasks.json"
#   And I drag the task with the description "Task 3" and drop it above the task with the description "Task 1"
#   Then I should see that "Task 3" is now above "Task 1" in the list of tasks, and the task numbers should update accordingly to reflect the new order of the tasks
