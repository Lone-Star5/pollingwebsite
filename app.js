const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();


app.use(express.static(__dirname + '/public/'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }))

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect("mongodb://localhost:27017/polling");

const voteSchema = new mongoose.Schema({
    name: String,
    vote: Boolean,
    date: Date
})



const vote = new mongoose.model('vote',voteSchema);

app.get('/', (req,res)=>{
    res.render('pollform')
})

app.get('/results', (req,res) => {
    vote.find({},(err,votes)=>{
        if(err)
            res.json({message:'Some Error Occured'});
        else{
            let yes=0,no=0;
            let county={};
            let countn={};
            votes.forEach((vote)=>{
                if(vote.vote==true)
                    yes++;
                else
                    no++;
                if(vote.vote==true){
                    if(county[`${vote.date.toDateString()}`]==undefined)
                        county[`${vote.date.toDateString()}`] = [1,0];
                    else
                    county[`${vote.date.toDateString()}`][0]++;
                }
                else{
                    if(county[`${vote.date.toDateString()}`]==undefined)
                        county[`${vote.date.toDateString()}`] = [0,1];
                    else
                        county[`${vote.date.toDateString()}`][1]++;
                }
            })
            
            let dateOfVote = [],countOfYes = [],countOfNo=[];

            for(const [key,value] of Object.entries(county)){
                dateOfVote.push(key);
                countOfYes.push(value[0]);
                countOfNo.push(value[1])
            }
            res.render('pollresult',{votes:votes,yes:yes,no:no,dateOfVote:dateOfVote,countOfNo:countOfNo,countOfYes:countOfYes});
        }
    })
})

app.post('/pollform', (req,res) => {
    let obj = {
        name: req.body.name,
        vote: req.body.vote=='true',
        date: req.body.date
    }
    console.log(obj);
    vote.create(obj,(err,newvote)=>{
        if(err)
            res.send('error');
        else
            res.redirect('/')
    })
})

app.listen('3000',(req,res)=>{
    console.log('Server Started... ')
})