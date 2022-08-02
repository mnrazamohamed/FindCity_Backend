const cron = require('node-cron');
const postModel = require("../model/post");

// Inactivate posts after 10 days
//             S M H D M W <- runs on first day of each month
cron.schedule('0 0 0 * * *', async () => {
    console.log("check post event started");
    const posts = await postModel.find()
    posts.forEach(async post => {
        if (post.life !== 0)
            await postModel.findByIdAndUpdate({ _id: post._id }, { life: Number.parseInt(post.life) - 1 })
    })
    console.log("check post event end");
});

