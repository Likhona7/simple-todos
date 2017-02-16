import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { Tasks } from '../api/tasks.js';
import './task.js';
import './body.html';


Template.body.onCreated(function bodyOnCreated(){
this.state = new ReactiveDict();
});


Template.body.helpers({
tasks() {
  const instance = Template.instance();
  if(instance.state.get('hideCompleted')){
    return Tasks.find({ checked: {$ne: true } }, { sort: { createdAt: -1 } });
  }
  return Tasks.find({}, {sort: { createdAt: -1}});
},
incompleteCount(){
  return Tasks.find({ checked: { $ne: true } }).count();
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
      owner: Meteor.userId(),
      username: Meteor.user().username,
    });
    
    target.text.value = '';
  },
  'change .hide-complete input'(event, instance){
    instance.state.set('hideCompleted', event.target.Checked);
  },
})

Template.body.helpers({
  tasks(){
    //show newest tasks at the top
    return Tasks.find({}, {sort: { createdAt: -1 } });
  },
});
