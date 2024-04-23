//The Bones for observer
class thread {
    constructor() {
        // Initialize an empty array to hold observers
        this.observers = [];
        // Initialize the temperature to 0
        this.newMessageCount = 0;
    }

    // Method to add an observer to the list
    subscribe (observer) {
        this.observers.push(observer);
    }

    // Method to remove an observer from the list
    unsubscribe (observer) {
        this.observers = this.observers.filter(obs => obs !== observer);
    }

    // Method to set the temperature and notify observers
    newMessage(newMessageCount) {
        this.newMessageCount = newMessageCount;
        this.notifyObservers();
    }

    // Method to notify all observers about the temperature change
    notifyObservers() {
        this.observers.forEach(observer => {
        // Call the update method on each observer
        observer.update(this.newMessageCount);
        });
    }
}