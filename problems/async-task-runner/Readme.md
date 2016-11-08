# Async Task Runner

Implement Asynchronous Task Runner

A "TaskRunner" Constructor takes one argument, "concurrency", and exposes one method "push" on its prototype. The "push" method takes one argument "task" which is a "function":
```js
function TaskRunner(concurrency) { /* TODO */ }

TaskRunner.prototype.push = function push(task) { /* TODO */ }
```

"task" functions that can be passed to the push method have the following signature:

```js
function exampleTask(done) { /* calls done() at some point */ }
```

Calling done signifies that a task is complete.

A requirement of a task is that is has to call done at some point.

done takes no arguments and merely signifies the task completion.

Here are some examples of tasks:

```js
function exampleSimpleTask(done) {
  setTimeout(done, Math.random() * 1000);
}

function exampleXhrTask(done) {
  makeARequestSomehow('http://website.api/foo', function (err, res) {
    doSomethingWithRes(res);
    done();
  }
}
```

Passing a task to a push method of a TaskRunner instance should immediately execute (call/run/invoke) the task, unless the number of currently running tasks exceeds the concurrency limit.

If the number of tasks exceeds concurrency limit (which is passed to the TaskRunner constructor), the pushed task should wait until one of the running tasks has finished (has called done).

Here's an example:

```js
var r = new TaskRunner(3);
// use the exampleSimpleTask from above;

r.push(exampleSimpleTask); // executes immediately
r.push(exampleSimpleTask); // executes immediately
r.push(exampleSimpleTask); // executes immediately

r.push(exampleSimpleTask); // should wait until one of the running tasks completes
r.push(exampleSimpleTask); // should wait until one of the running tasks completes
// ...
```
