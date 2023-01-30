// creating zenclassDB in MongoDB
use zenclassDB

// creating users collection
db.users.insertMany(
    [
        {
            user_id: 1,
            name: "ajithkumar",
            email: "ajithkumar@gmail.com",
            mobile: 1234567891,
            password: "ajith12345"
        },
            {
            user_id: 2,
            name: "sarathkumar",
            email: "sarathkumar@gmail.com",
            mobile: 1234567892,
            password: "sarath12345"
        },
        {
            user_id: 3,
            name: "praveen",
            email: "praveen@gmail.com",
            mobile: 1234567893,
            password: "praveen12345"
        },
        {
            user_id: 4,
            name: "vetri",
            email: "vetri@gmail.com",
            mobile: 1234567894,
            password: "vetri12345"
        }
    ]
)


//creating codekata collections
db.codekata.insertMany(
    [
        {
            user_id: 1,
            solved_problems: 250,
            rank: 1,
            geek_coins: 3000
        },
        {
            user_id: 2,
            solved_problems: 200,
            rank: 2,
            geek_coins: 2500
        },
        {
            user_id: 3,
            solved_problems: 150,
            rank: 3,
            geek_coins: 2000
        },
            {
            user_id: 4,
            solved_problems: 100,
            rank: 4,
            geek_coins: 1000
        }
    ]
)

//creating attendence collections
db.attendence.insertMany(
    [
        {
            user_id: 1,
            date: new Date("2020-10-15"),
            status: "present"
        },
        {
            user_id: 2,
            date: new Date("2020-10-15"),
            status: "absent"
        },
        {
            user_id: 3,
            date: new Date("2020-10-15"),
            status: "present"
        },
        {
            user_id: 4,
            date: new Date("2020-10-15"),
            status: "absent"
        }
    ]
)

//creating tasks collections
db.tasks.insertMany(
    [
        {
        user_id: 1,
        task_name: "Design database for Zen class programme",
        date: new Date("2020-10-15"),
        submission_date: new Date("2020-10-22")
        },
        {
        user_id: 2,
        task_name: "Design database for Zen class programme",
        date: new Date("2020-10-15"),
        submission_date: new Date("2020-10-15")
        },
        {
        user_id: 3,
        task_name: "Design database for Zen class programme",
        date: new Date("2020-10-15"),
        submission_date: new Date("2020-10-15")
        },
           {
        user_id: 4,
        task_name: "Design database for Zen class programme",
        date: new Date("2020-10-15"),
        submission_date: new Date("2020-10-15")
        },
    
    ]
)

//creating topics collections
db.topics.insertMany(
    [
        {
            topic_id: 1,
            topic_name: "HTML",
            task: ["create user data table", "create different fruits list with <ul> and <ol>"],
            date: new Date("2020-10-15"),
        },
            {
            topic_id: 2,
            topic_name: "Functions",
            task: ["types of functions", "Arrow functions"],
            date: new Date("2020-10-15"),
        },
            {
            topic_id: 3,
            topic_name: "React",
            task: ["components", "props", "Hooks"],
            date: new Date("2020-10-15"),
        },
            {
            topic_id: 4,
            topic_name: "OOPS",
            task: ["object", "class"],
            date: new Date("2020-10-15"),
        },
    ]
)

//creating company_drives collections
db.company_drives.insertMany(
    [
        {
            drive_id: 1,
            company: "Meta",
            user_ids: [1,2,3,4],
            date: new Date("2020-10-15"),
        },
        {
            drive_id: 2,
            company: "Amazon",
            user_ids: [1,2],
            date: new Date("2020-10-15"),
        },
        {
            drive_id: 3,
            company: "Netflix",
            user_ids: [3,4],
            date: new Date("2020-10-15"),
        },
        {
            drive_id: 4,
            company: "Google",
            user_ids: [1,4],
            date: new Date("2020-10-15"),
        },
    ]
)

//creating mentors collection 
db.mentors.insertMany(
    [
        {
            metor_id: 4,
            name: "Sanjay",
            mentee_ids: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17]
        },
        {
            metor_id: 5,
            name: "Ragav",
            mentee_ids: [1,2,3,4,5,6,7,8,9,10]
        },
        {
            metor_id: 1,
            name: "Muthu",
            mentee_ids: [1,2,3,4,5]
        },
        {
            metor_id: 2,
            name: "Ramesh",
            mentee_ids: [1,2,3,4]
        }
    ]
    
)


// 1. Find all the topics and tasks which are thought in the month of October
db.topics.aggregate([
    {
        $project :{
            _id: 0,  
            topic_name: 1,
            task: 1,
            date: 1,
            month : {
                $month: "$date"
            },
            year: {
                $year: "$date"
            }
        }
    },
    {
        $match:{
            month: 10,
            year: 2020
        }
    },
    {
        $project:{
            topic_name: 1,
            task: 1,
            date: 1
        }
    }
    
])


// 2. Find all the company drives which appeared between 15 oct-2020 and 31-oct-2020
db.company_drives.aggregate([
    {
       $project:{
           _id:0,
           company: 1,
           date: 1,
           day: { $dayOfMonth : "$date"},
           month: {$month : "$date"},
           year: {$year: "$date"}
       }
    },
    {
        $match: {
            year:{
                $eq : 2020
            },
            month:{
                $eq : 10
            },
            day: {
                $gte: 15,
                $lte:31
            }
        }
    },
    {
        $project: {
            company: 1,
            date: 1
        }
    }
])

// 3. Find all the company drives and students who are appeared for the placement.

db.company_drives.aggregate([
    {
        $lookup: {
            from: "users",
            localField: "user_id",
            foreignField: "user_ids",
            as: "result_doc"
        }
    },
])


// 4. Find the number of problems solved by the user in codekata

db.codekata.aggregate([
    {
        $lookup:{
            from: "users",
            localField: "user_id",
            foreignField: "user_id",
            as: "user_details"
        }
    },
    {
        $project: { 
            name : {
                $arrayElemAt: ["$user_details.name", 0]
            },
            problems_solved: "$solved_problems"
        }
    }
])

// 5. Find all the mentors with who has the mentee's count more than 15

db.mentors.aggregate([
    {
        $lookup: {
            from: "users",
            localField: "mentor_id",
            foreignField: "user_id",
            as: "mentor_details"
        }
    },
    {
        $project: {
            mentor_name: "$name",
            mentees_count: {
                $size: '$mentee_ids'
            }
        }
    },
    {
        $match: {
            mentees_count: {
                $gte: 15
            }
        }
    }
])

// 6. Find the number of users who are absent and task is not submitted  between 15 oct-2020 and 31-oct-2020

db.attendence.aggregate([
    {
        $lookup:{
            from: "tasks",
            localField: "user_id",
            foreignField: "user_id",
            as: "user_tasks"
        }
    },
    {
        $match: {
            "user_tasks.submission_date" : {
                $gte: ISODate("2020-10-15T00:00:00Z"),
                $lte: ISODate("2020-10-31T00:00:00Z"),
            },
            status: "absent"
        }
    },
    {
        $lookup: {
            from: "users",
            localField: "user_id",
            foreignField: "user_id",
            as: "user_details"

        }
    },
    {
        $project: {
            userDetails: {
                $arrayElemAt: ["$user_details", 0]
            },
            taskDetails: {
                $arrayElemAt: ["$user_tasks", 0]
            },
            status: 1
        }
    },
    {
        $project: {
            _id: 0,
            Name: "$userDetails.name",
            Task_name: "$taskDetails.task_name",
            status: 1,
            Submission_date: "$taskDetails.submission_date",

        }
    }
])










