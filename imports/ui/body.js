import { Template } from 'meteor/templating';

import { Tasks } from '../api/tasks.js'

import './body.html';
Template.body.helpers({

tasks() {
  return Tasks.find({});
},
});
Template.body.events({
  'submit .new-task'(event) {
        // Prevent default browser form submit
    event.preventDefault();

    const target = event.target;
    const text = target.text.value;
    //Insert a task into the Collection
    Task.insert({
      text,
      createdAt : new Date(), //current time
    });
    target.text.value = '';
  },
})
Template.body.helpers({

  tasks(){
    //show newest tasks at the top
    return Tasks.find({}, {sort: { createdAt: -1 } });

  },
});
