//importing express
const express = require('express');

//importing path
const path=require('path');


//importing body parser
const body_parser = require('body-parser');

//importing mysql
const mysql=require('mysql');

//running the express function
const app = express();

//settting the port to envoroment variable
const port = process.env.PORT || 3000;

//using body parser
app.use(body_parser.json());

//header configuration
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type,Origin,X-Requested-With,Accept")
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    next();
});

//adding static file
app.use("/",express.static(path.join(__dirname,"public")));

//mysql connection
const conn=mysql.createConnection({
    host:'remotemysql.com',
    user:'k9l7Y7sgYJ',
    database:'k9l7Y7sgYJ',
    password:'DHFKYZTm4s'
});

conn.connect((err)=>{
    if(!err){
        console.log('Database Connected');
    }else{
        console.log('Something went wrong with database');
    }
})


//api to post race data
app.post('/api/post_race',(req,res,next)=>{
    conn.query("Insert into races(title,author,race_data) values(?,?,?)",[req.body.title,req.body.author,req.body.data],(err,result)=>{
        if(err){
            return res.status(200).json({msg:'err'});
        }
        else{
            return res.status(200).json({msg:'done'});
        }
    });  
});

//api to fetch all races
app.get('/api/get_all_race',(req,res,next)=>{
    var ret_arr=new Array();
    conn.query("select * from races",(err,result)=>{
        if(!err){
            result.forEach(one_data => {
                var data={
                    id:one_data.id,
                    title:one_data.title,
                    author:one_data.author
                };
                ret_arr.push(data);
            });
            res.status(200).json(ret_arr);
        }
        else{
            res.status(200).json(err);
        }
    });
});

//api to fetch one race
app.get('/api/get_one_race/:race_id',(req,res,next)=>{
    const race_id=req.params.race_id;
    conn.query('select * from races where id=?',[race_id],(err,result)=>{
        if(!err){
            res.status(200).json(result[0]);
        }else{
            res.status(200).json(err);
        }
    });
});

//api to post the result to database
app.post('/api/post_result',(req,res,next)=>{
    conn.query('insert into results(name,email,race_id,min,sec,msec) values(?,?,?,?,?,?)',[
        req.body.name,
        req.body.email,
        req.body.race_id,
        req.body.min,
        req.body.sec,
        req.body.msec
    ],(err,result)=>{
        if(err){
            return res.status(200).json({msg:'err',err:err});
        }
        else{
            return res.status(200).json({msg:'success'});
        }
    });
});

//api to get the result of one race
app.get('/api/get_one_result/:race_id',(req,res,next)=>{
    conn.query('select * from results where race_id=? order by min,sec,msec',[req.params.race_id],(err,result_data)=>{
        if(err){
            return res.status(200).json({msg:'err'});
        }else{
            conn.query('select * from races where id=?',[req.params.race_id],(err,race_data)=>{
                if(err){
                    return res.status(200).json({msg:'err'});
                }else{
                    return res.status(200).json({
                        race_data:{
                            author:race_data[0].author,
                            title:race_data[0].title,
                            no_of_words:race_data[0].race_data.split(" ").length
                        },
                        race_result:result_data
                    });
                }
            });
        }
    });
});

//sending the static file
app.use((req,res,next)=>{
    res.sendFile(path.join(__dirname,"public","index.html"));
});

//listening to the port
app.listen(port, () => console.log(`TypeRacer listening on port ${port}!`));