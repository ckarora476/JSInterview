
function TaskRunner(concurrency){

  let  taskQueue = []
  let running = 0

  function executeQueue() {
    while (running<concurrency && taskQueue.length){
      running = running + 1
      const task = taskQueue.shift()
      task().finally(()=>{
        running = running -1
        executeQueue()
      })
    }

  }

  function addTask (taskFn) {
      taskQueue.push(taskFn)
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


let { addTask } = TaskRunner(2)

addTask(()=> resolvePromiseAfter(1000, "First") )
addTask(()=> resolvePromiseAfter(5000, "Second") )
addTask(()=> resolvePromiseAfter(1000, "Third") )
addTask(()=> resolvePromiseAfter(1000, "Fourth") )



