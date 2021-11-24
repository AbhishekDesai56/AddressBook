let a = () => new Promise(async (resolve, reject) => {
        await (() => {
            let userActive = true
            if(userActive) {
                resolve('Hi I am Active');
            } else {
                reject('Hi I am Not Active');
            }
        }); 
    
});

db.student.collection(find((marks).sort 1 desc), name: 1)