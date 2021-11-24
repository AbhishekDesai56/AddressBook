(function () {
    console.log('Hi');
})();



//Promise
// (function () {  
//     let userActive = true
//     return new Promise((resolve, reject) => {
//     if(userActive) {
//         resolve('Hi I am Active');
//     } else
//     {
//         reject('Hi I am Not Active');
//     }
// });
// })().then((message) => {
//     console.log(message);
// }).catch((err) => {
//     console.log(err);
// });



let a = () => new Promise((resolve, reject) => {
        setTimeout(() => {
            let userActive = true
            if(userActive) {
                resolve('Hi I am Active');
            } else {
                reject('Hi I am Not Active');
            }
        }, 5000); 
    
});

a().then((message) => {
    console.log(message);
}).catch((err) => {
    console.log(err);
});
async function abc() {
await setTimeout(() =>{
    let userActive = true
        if(userActive) {
                    console.log('Hi I am Active');
        } else {
                    console.log('Hi I am Not Active');
        }
}, 5000)
}
abc();
//async await
// function async ab() {
//     try {
//     return await function () {
//         let userActive = true
//         if(userActive) {
//                     resolve('Hi I am Active');
//         } else {
//                     reject('Hi I am Not Active');
//         }
//     }
// }
//     catch(ex) {
//         console.log(ex);
//     }
// }