function TaskRunner(concurrency) {
    this.concurrency = concurrency;
    this.currentThreads = 0;
}

TaskRunner.prototype.push = function push(task) { /* TODO */ 
	    
    if( this.currentThreads >= this.concurrency ){
        //wait
        console.log('the task is being pushed to queue...');
		var self = this;
        setTimeout(function(){
			self.push(task); 
		}, 1000);
        
    }else{
        this.currentThreads++;
		var self = this;
        task(this.done.bind(this));
    }
	return;
}

TaskRunner.prototype.done = function done() {
	console.log('current threads ' , this.currentThreads );
	 this.currentThreads--;
	 return;
}


function exampleSimpleTask(done) {
    setTimeout(function(){
		console.log('task is done...');
		done();
        }, 1000);
}


var runner = new TaskRunner(3);


runner.push(exampleSimpleTask); // executes immediately
runner.push(exampleSimpleTask); // executes immediately
runner.push(exampleSimpleTask); // executes immediately

runner.push(exampleSimpleTask); 
runner.push(exampleSimpleTask); 
runner.push(exampleSimpleTask); 
