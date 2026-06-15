// To Do List Application
interface Task {
	task: string
	priority: 'Low' | 'Medium' | 'High' | 'Critical'
	tags: string[]
}

const MAX_TASKS: number = 20
const MAX_TAGS: number = 5
const MAX_TAG_LENGTH: number = 20
const MAX_DESC_LENGTH: number = 50
const TASKS_KEY: string = 'todo_tasks' // Key for localStorage

const searchBar = document.getElementById('search-bar') as HTMLInputElement
const clearSearchBtn = document.getElementById(
	'clear-search-btn'
) as HTMLButtonElement
const addTaskBtn = document.getElementById('add-task-btn') as HTMLButtonElement
const sortHighestBtn = document.getElementById(
	'sort-highest-btn'
) as HTMLButtonElement
const sortLowestBtn = document.getElementById(
	'sort-lowest-btn'
) as HTMLButtonElement
const filenameInput = document.getElementById(
	'filename-input'
) as HTMLInputElement
const downloadBtn = document.getElementById('download-btn') as HTMLButtonElement
const todoList = document.getElementById('todo-list') as HTMLUListElement
const resetBtn = document.getElementById('reset-btn') as HTMLButtonElement
const resetPopup = document.getElementById('reset-popup') as HTMLDivElement
const confirmResetBtn = document.getElementById(
	'confirm-reset-btn'
) as HTMLButtonElement
const cancelResetBtn = document.getElementById(
	'cancel-reset-btn'
) as HTMLButtonElement

let tasks: Task[] = []
let sortOrder: 'asc' | 'desc' = 'asc'

/**
 * Save the current tasks array to localStorage.
 */
function saveTasks() {
	localStorage.setItem(TASKS_KEY, JSON.stringify(tasks))
}

/**
 * Load tasks from localStorage into the tasks array.
 */
function loadTasks() {
	const saved = localStorage.getItem(TASKS_KEY)
	tasks = saved ? JSON.parse(saved) : []
}

/**
 * Render the list of tasks to the DOM.
 * @param {Task[]} [filteredTasks] - Optional array of tasks to render instead of the full list.
 */
function renderTasks(filteredTasks?: Task[]) {
	const list = filteredTasks || tasks
	todoList.innerHTML = ''
	list.forEach((task, idx) => {
		// Create list item for each task
		const li = document.createElement('li')
		li.className = 'todo-item'
		li.setAttribute('data-priority', task.priority)
		li.setAttribute('draggable', 'true')
		li.setAttribute('data-cy', `task-${idx}`)

		// Set the top and bottom rows and put them in the list item
		const topRow = document.createElement('div')
		topRow.className = 'todo-top-row'
		const bottomRow = document.createElement('div')
		bottomRow.className = 'todo-bottom-row'
		li.appendChild(topRow)
		li.appendChild(bottomRow)

		// Drag handle
		const dragHandle = document.createElement('span')
		dragHandle.className = 'drag-handle'
		dragHandle.setAttribute('data-cy', `drag-handle-${idx}`)
		dragHandle.innerText = '☰'
		topRow.appendChild(dragHandle)

		// Task number
		const numSpan = document.createElement('span')
		numSpan.className = 'todo-number'
		numSpan.setAttribute('data-cy', `task-number-${idx}`)
		numSpan.innerText = (idx + 1).toString()
		topRow.appendChild(numSpan)

		// Task description
		const descInput = document.createElement('textarea')
		descInput.className = 'todo-desc'
		descInput.id = `desc-input-${idx}`
		descInput.maxLength = MAX_DESC_LENGTH
		descInput.rows = 3
		descInput.placeholder = 'Enter task description here'
		descInput.setAttribute('data-cy', `desc-input-${idx}`)
		descInput.value = task.task
		descInput.addEventListener('input', () => {
			task.task = descInput.value
			saveTasks()
		})
		topRow.appendChild(descInput)

		// Priority dropdown
		const prioritySelect = document.createElement('select')
		prioritySelect.className = 'todo-priority'
		prioritySelect.id = `priority-select-${idx}`
		prioritySelect.setAttribute('data-cy', `priority-select-${idx}`)
		;['Low', 'Medium', 'High', 'Critical'].forEach((p) => {
			const opt = document.createElement('option')
			opt.value = p
			opt.text = p
			if (task.priority === p) opt.selected = true
			prioritySelect.appendChild(opt)
		})
		prioritySelect.addEventListener('change', () => {
			task.priority = prioritySelect.value as Task['priority']
			saveTasks()
			renderTasks()
		})
		topRow.appendChild(prioritySelect)

		// Delete task button
		const deleteBtn = document.createElement('button')
		deleteBtn.className = 'delete-task-btn'
		deleteBtn.setAttribute('data-cy', `delete-btn-${idx}`)
		deleteBtn.innerText = 'Delete'
		deleteBtn.addEventListener('click', () => {
			tasks.splice(idx, 1)
			saveTasks()
			renderTasks()
			updateResetBtn()
			updateAddTaskBtn()
		})
		topRow.appendChild(deleteBtn)

		// Add tag button
		const addTagBtn = document.createElement('button')
		addTagBtn.className = 'add-tag-btn'
		addTagBtn.setAttribute('data-cy', `add-tag-btn-${idx}`)
		addTagBtn.innerText = 'Add Tag'
		addTagBtn.disabled = task.tags.length >= MAX_TAGS
		addTagBtn.addEventListener('click', () => {
			let tagVal = addTagInput.value.trim()
			if (!tagVal) return
			if (!tagVal.startsWith('#')) tagVal = '#' + tagVal
			if (tagVal.length > MAX_TAG_LENGTH + 1)
				tagVal = tagVal.slice(0, MAX_TAG_LENGTH + 1)
			if (task.tags.length < MAX_TAGS && !task.tags.includes(tagVal)) {
				task.tags.push(tagVal)
				addTagInput.value = ''
				saveTasks()
				renderTasks()
			}
		})
		bottomRow.appendChild(addTagBtn)

		// Add tag input
		const addTagInput = document.createElement('input')
		addTagInput.className = 'add-tag-input'
		addTagInput.id = `add-tag-input-${idx}`
		addTagInput.type = 'text'
		addTagInput.maxLength = MAX_TAG_LENGTH
		addTagInput.placeholder = 'Add a tag (e.g. #work)'
		addTagInput.setAttribute('data-cy', `add-tag-input-${idx}`)
		addTagInput.addEventListener('keydown', (e) => {
			if (e.key === 'Enter') addTagBtn.click()
		})
		bottomRow.appendChild(addTagInput)

		// Tags section
		task.tags.forEach((tag, tagIdx) => {
			const tagSpan = document.createElement('span')
			tagSpan.className = 'tag'
			tagSpan.setAttribute('data-cy', `tag-${idx}-${tagIdx}`)
			tagSpan.innerText = tag

			// Remove tag button
			const removeBtn = document.createElement('button')
			removeBtn.className = 'remove-tag'
			removeBtn.setAttribute('data-cy', `remove-tag-btn-${idx}-${tagIdx}`)
			removeBtn.innerText = 'x'
			removeBtn.title = 'Remove tag'
			removeBtn.addEventListener('click', () => {
				task.tags.splice(tagIdx, 1)
				saveTasks()
				renderTasks()
			})
			tagSpan.appendChild(removeBtn)
			bottomRow.appendChild(tagSpan)
		})

		// Drag and drop events
		li.addEventListener('dragstart', (e) => {
			;(e as DragEvent).dataTransfer?.setData('text/plain', idx.toString())
			li.classList.add('dragging')
		})
		li.addEventListener('dragend', () => {
			li.classList.remove('dragging')
		})
		li.addEventListener('dragover', (e) => {
			e.preventDefault()
			li.classList.add('drag-over')
		})
		li.addEventListener('dragleave', () => {
			li.classList.remove('drag-over')
		})
		li.addEventListener('drop', (e) => {
			e.preventDefault()
			li.classList.remove('drag-over')
			const fromIdx = parseInt(
				(e as DragEvent).dataTransfer?.getData('text/plain') || '-1'
			)
			if (fromIdx >= 0 && fromIdx !== idx) {
				const moved: Task | undefined = tasks.splice(fromIdx, 1)[0]
				if (moved === undefined) {
					return
				} else {
					tasks.splice(idx, 0, moved)
					saveTasks()
					renderTasks()
				}
			}
		})
		todoList.appendChild(li)
	})
	updateResetBtn()
	updateAddTaskBtn()
}

/**
 * Enable or disable the Add Task button based on the number of tasks.
 */
function updateAddTaskBtn() {
	addTaskBtn.disabled = tasks.length >= MAX_TASKS
}

/**
 * Show or hide the Reset button depending on whether there are tasks.
 */
function updateResetBtn() {
	resetBtn.style.display = tasks.length > 0 ? 'block' : 'none'
}

/**
 * Clear the search bar and re-render the full task list.
 */
function clearSearch() {
	searchBar.value = ''
	renderTasks()
}

/**
 * Filter tasks based on the search bar input and render the filtered list.
 */
function filterTasks() {
	const val = searchBar.value.trim().toLowerCase()
	if (!val) {
		renderTasks()
		return
	}
	let filtered: Task[] = []
	if (val.startsWith('#')) {
		filtered = tasks.filter((t) =>
			t.tags.some((tag) => tag.toLowerCase() === val)
		)
	} else {
		filtered = tasks.filter((t) => t.task.toLowerCase().includes(val))
	}
	renderTasks(filtered)
}

/**
 * Sort the tasks array by priority and task description, then re-render.
 * @param {'asc' | 'desc'} order - Sort order: 'asc' for Low to Critical, 'desc' for Critical to Low.
 */
function sortTasks(order: 'asc' | 'desc') {
	tasks.sort((a, b) => {
		const priorities = { Low: 1, Medium: 2, High: 3, Critical: 4 }
		if (priorities[a.priority] === priorities[b.priority]) {
			return a.task.localeCompare(b.task)
		}
		return order === 'asc'
			? priorities[a.priority] - priorities[b.priority]
			: priorities[b.priority] - priorities[a.priority]
	})
	saveTasks()
	renderTasks()
}

/**
 * Download the current tasks as a JSON file. Uses the filename from the input field.
 */
function downloadJSON() {
	let filename = filenameInput.value.trim()
	if (!filename) filename = 'to_do_list.json'
	if (!filename.endsWith('.json')) filename += '.json'
	filename = filename.slice(0, 30)
	const blob = new Blob([JSON.stringify(tasks, null, 2)], {
		type: 'application/json'
	})
	const url = URL.createObjectURL(blob)
	const a = document.createElement('a')
	a.href = url
	a.download = filename
	document.body.appendChild(a)
	a.click()
	document.body.removeChild(a)
	URL.revokeObjectURL(url)
}

/**
 * Show the reset confirmation popup.
 */
function showResetPopup() {
	resetPopup.style.display = 'flex'
}

/**
 * Hide the reset confirmation popup.
 */
function hideResetPopup() {
	resetPopup.style.display = 'none'
}

/**
 * Reset the tasks list, clear storage, and hide the popup.
 */
function resetTasks() {
	tasks = []
	saveTasks()
	renderTasks()
	hideResetPopup()
}

addTaskBtn.addEventListener('click', () => {
	if (tasks.length >= MAX_TASKS) return
	tasks.push({ task: '', priority: 'Low', tags: [] })
	saveTasks()
	renderTasks()
	updateAddTaskBtn()
})
searchBar.addEventListener('input', filterTasks)
clearSearchBtn.addEventListener('click', clearSearch)
sortHighestBtn.addEventListener('click', () => sortTasks('desc'))
sortLowestBtn.addEventListener('click', () => sortTasks('asc'))
downloadBtn.addEventListener('click', downloadJSON)
resetBtn.addEventListener('click', showResetPopup)
confirmResetBtn.addEventListener('click', resetTasks)
cancelResetBtn.addEventListener('click', hideResetPopup)
filenameInput.addEventListener('input', () => {
	if (filenameInput.value.length > 30) {
		filenameInput.value = filenameInput.value.slice(0, 30)
	}
})

window.addEventListener('DOMContentLoaded', () => {
	loadTasks()
	renderTasks()
})
