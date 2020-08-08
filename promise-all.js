// API   All([p1,p2,p3]) => Promise which resolves when all succeed else fail


function MyPromise(){


  function all(promises){


    return new Promise((resolve, reject) =>{
      let results = []
      let finished = 0

      promises.forEach((promise,index)=>{
        promise.then((res)=>{
          results[index] = res
          finished ++
          if (finished === promises.length){
            resolve(results)
          }
        }).catch(()=>{
          reject()
        })
      })

    })

  }

  return {
    all
  }
}

const pr = MyPromise()

pr.all([makeResolvedPromise(2),makeResolvedPromise(3),makeResolvedPromise(5), makeRejectedPromise(2)]).then((results)=>{
  console.log(results)
}).catch(()=>{
  console.log("Error");
})


function makeResolvedPromise(value){
  return new Promise((res)=>{
     res(value)
  })
}

function makeRejectedPromise(value){
  return new Promise((res,rej)=>{
     rej(value)
  })
}



