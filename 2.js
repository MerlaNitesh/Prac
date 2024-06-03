let photos=[]
async function upload()
{
    let a=new Promise((resolve,reject)=>
    {
        setTimeout(()=>
        {
            photos.push("one");
            resolve("uploaded")
        })
    })
    let result = await a
    console.log(result)
    console.log(photos.length)
}
upload()