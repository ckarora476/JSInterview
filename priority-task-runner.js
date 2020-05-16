
function TaskRunner(concurrency){

  let  taskQueue = PriorityQueue()
  let running = 0

  function executeQueue() {
    while (running<concurrency && taskQueue.size()){
      running = running + 1
      const task = taskQueue.dequeue()
      task().finally(()=>{
        running = running -1
        executeQueue()
      })
    }

  }

  function addTask (taskFn, priority = 1) {
      taskQueue.enqueue(taskFn, priority)
      executeQueue()
  }

  return {
    addTask
  }

}

const resolvePromiseAfter = (time, value)=> {
  return new Promise((resolve, reject)=>{
    setTimeout(()=>{
      console.log("Running", value)
      resolve(value)
    },time)
  })
}



function PriorityQueue(){
  let queue = []

  function enqueue(task, priority){
    queue.push({task,priority})
  }

  function dequeue(){
    //TODO: Replace this implementation with a heap implementation
    queue = queue.sort(({priority:p1},{priority:p2})=>{
        return p2-p1
    })

    return queue.shift().task
  }

  function size(){
    return queue.length
  }

  return {
    enqueue,dequeue, size
  }

}


let { addTask } = TaskRunner(2)

addTask(()=> resolvePromiseAfter(1000, "First"), 1 )
addTask(()=> resolvePromiseAfter(1000, "Second"), 1 )
addTask(()=> resolvePromiseAfter(1000, "Third"),1 )
addTask(()=> resolvePromiseAfter(1000, "Fourth"),5 )



