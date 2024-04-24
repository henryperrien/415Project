class topic {
    constructor(topic,messages ) {
        this.messages = []; //an array of messages
        //we dont have to store all the messages just the number and update based on the message count in each topic
        this.messageCount = 0;
        this.topic = topic;
        this.observerList = [];
    }
    subscribe (observer) {
        this.observerList.push(observer);
    }

    // Method to remove an observer from the list
    unsubscribe (observer) {
        this.observerList = this.observerList.filter(obs => obs !== observer);
    }

    update(observer){
        this.observerList.forEach(observer => observer.notify(data));
    }

    // Method to notify all observers about the temperature change
    notifyObservers() {
        this.observerList.forEach(observer => {
        observer.update(this.newMessageCount);
        });
    }
}
class observer{
    constructor(topic) {
    subject.registerObserver(this);

    this.subscribers = [];
  }

  subscribe(subscriber) {
    this.subscribers.push(subscriber);
  }

  notify(data) {
    this.subscribers.forEach(subscriber => subscriber(data));
  }
}