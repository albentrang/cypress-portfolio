let instance

/**
 * Singleton object representing the To Do List page of my custom website.
 */
class ToDoListPage {
	constructor() {
		if (!instance) {
			instance = this
		}
	}
}

export default Object.freeze(new ToDoListPage())
