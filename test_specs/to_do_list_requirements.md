# To-Do List Requirements

- The first element is the search bar that filters the tags either by text or tag when it starts with a hash symbol.
- The search bar is case-insensitive and filters the list in real-time as the user types. When the user types a string of characters in the search bar, only the tasks that contain that string of characters in their description will be displayed in the list. When the user types a hash symbol followed by a tag name, only the tasks that have that tag will be displayed. If the search bar is empty, all tasks should be displayed.
- Below the search bar and to the left is the Add Task button that adds a new task to the list.
- There can only be a maximum of 20 tasks in the list at any given time.
- The Add Task button is disabled when there are already 20 tasks in the list and enabled when there are less than 20 tasks.
- To the right of the Add Task button is the sentence "Sort by Priority:" followed by two buttons that allow the user to sort the list by priority. The first button sorts the list by priority from low to high, and the second button sorts the list by priority from high to low. When the user clicks on either of the sort buttons, the list should be sorted accordingly, and if there are tasks with the same priority level, they should be sorted in alphabetical order based on their task description.
- Below the Add Task button is an input field for the user to enter the file name when downloading the JSON file.
- The file name input field has placeholder text "Enter file name like 'to-do-list.json'". The default value is "to-do-list.json" when no value is entered, and the input field allows the user to change the file name before downloading.
- The file name input field has a character limit of 30 characters, and it should enforce this limit in the HTML to prevent the user from entering more than 30 characters.
- To the right of the input field is the Download button to the download a JSON file that contains all the information from the list.
- Below the file name input field and the Download button is the list of tasks, where each task is represented as an object with key-value pairs for the task description, priority level, and tags in the code.
- Each task looks like a row with the task number, description, priority level, and tags displayed.
- The task number is to the left of the task description automatically generated based on the order of the tasks in the list, starting from 1 for the first task. When a new task is added, it is assigned the next available task number. If a task is deleted, the remaining tasks are renumbered accordingly to maintain a sequential order.
- The task description is a text input field that allows the user to edit the task directly in the list. Its placeholder text is "Enter task description here".
- Each list item description is 50 characters at most.
- The priority level is on the right of the task description and is a dropdown menu with four options: "Low", "Medium", "High", and "Critical".
- The background of each task item is colored based on its priority level: paleturquoise, palegreen, palegoldenrod, and palevioletred for low, medium, high, and critical priority levels, respectively.
- The list items can be dragged up and down by clicking and dragging the drag handle that's on the the left of each item. Also, the drag handle is a small icon that visually indicates that the item can be dragged, and it should be styled to match the overall design of the to-do list application. When the user clicks and holds the drag handle, they can move the item up or down in the list, and when they release the mouse button, the item will be dropped in its new position. The task numbers should update accordingly to reflect the new order of the tasks.
- Under the item description and priority level, there is a section for tags where the user can add multiple tags to each task. Each tag starts with a hash symbol (#) followed by the tag name. The user can add tags by typing in the input field and pressing Enter or by clicking an "Add Tag" button. The tags are displayed below the task description and priority level, and each tag has a small "x" button next to it that allows the user to remove the tag from the task.
- Each task item can have up to 5 tags, and the "Add Tag" button is disabled when there are already 5 tags for a task and enabled when there are less than 5 tags.
- Each tag can have up to 20 characters (excluding the hash symbol), and the input field for adding tags should enforce this character limit in the HTML.
- To the right of each task item is a delete button that removes the task from the list when clicked. When a task is deleted, the task numbers should update accordingly to reflect the new order of the tasks.
- List items persist even after refreshing the page.
- Each task is represented as an object with key-value pairs.
- Under the last list item and anchored to the right is the Reset button that removes all the tasks from the list.
- The Reset button is hidden when there are no tasks in the list and visible when there is at least one task.
- The Reset button first prompts the user with a confirmation popup before clearing the list. The popup has two buttons: "Yes" to confirm the reset and "No" to cancel the action. Also, the popup is in the center of the screen and has a semi-transparent background that covers the rest of the page to focus the user's attention on the confirmation dialog. Finally, the popup should be styled to match the overall design of the to-do list application.

Example JSON that can be downloaded from the to-do list application:
[
{
"task": "Buy groceries",
"priority": "High",
"tags": ["#shopping", "#errands"]
},
{
"task": "Finish project report",
"priority": "Medium",
"tags": ["#work"]
},
{
"task": "Call parents",
"priority": "Low",
"tags": []
}
]
