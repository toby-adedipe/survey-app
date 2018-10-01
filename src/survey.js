import React,{Component} from 'react';
const firebase = require('firebase');
const uuid = require('uuid');

var config = {
    apiKey: "AIzaSyBqKsGMUf3__narXPIq8DzGcW-e6Xriuvg",
    authDomain: "survey-app-e6828.firebaseapp.com",
    databaseURL: "https://survey-app-e6828.firebaseio.com",
    projectId: "survey-app-e6828",
    storageBucket: "survey-app-e6828.appspot.com",
    messagingSenderId: "515355010863"
  };

firebase.initializeApp(config);

class Survey extends Component{
    constructor(props){
        super(props);

        this.state = {
            uid: uuid.v1(),
            studentName: '',
            answers: {
                answer1: '',
                answer2: '',
                answer3: '',
            },
            isSubmitted: false
        };

        this.nameSubmit = this.nameSubmit.bind(this);
        this.handleAnswers = this.handleAnswers.bind(this);
        this.questionSubmit = this.questionSubmit.bind(this);
    }

    nameSubmit(event){
        var studentName = this.refs.name.value;
        this.setState({studentName}, ()=>{
            console.log(this.state);
        })

    }

    handleAnswers(event){
        //TODO: work on this
        var answers = this.state.answers;
        if(event.target.name === 'answer1'){
            answers.answer1 = event.target.value;
        }else if(event.target.name === 'answer2'){
            answers.answer2 = event.target.value;
        }else if(event.target.name === 'answer3'){
            answers.answer3 = event.target.value
        }

        this.setState({answers}, ()=>{
            console.log(this.state)
        });

    }
    questionSubmit(event){
        firebase.database().ref('uSurvey/'+this.state.uid).set({
            studentName: this.state.studentName,
            answers: this.state.answers
        })
        this.setState({isSubmitted: true});
    }


    render(){
        var studentName;
        var questions;

        if(this.state.studentName === '' && this.state.isSubmitted === false){
            studentName = <div>
                <h1> Hey Student, Please tell us your name </h1>
                <form onSubmit={this.nameSubmit}>
                    <input
                    type= "text"
                    placeholder = "enter your name"
                    ref="name"
                    name="studentName"
                    />
                </form>
            </div>;
            questions = ''
        }else if (this.state.studentName !== '' && this.state.isSubmitted === false){
            studentName = <div>
                <p>hey there, {this.state.studentName}</p>
            </div>;
            questions = <div>
                <h2>Here are some questions</h2>

                <form onSubmit={this.questionSubmit}>
                    <div className="card">
                        <label>What kind of courses you like the most</label> <br />
                        <input type="radio" name="answer1" value="technology" onChange={this.handleAnswers} /> Technology
                        <input type="radio" name="answer1" value="design" onChange={this.handleAnswers} /> Design
                        <input type="radio" name="answer1" value="marketing" onChange={this.handleAnswers} /> Marketing
                    </div>
                    <div className="card">
                        <label>You are: </label> <br />
                        <input type="radio" name="answer2" value="student" onChange={this.handleAnswers} /> a Student
                        <input type="radio" name="answer2" value="in-job" onChange={this.handleAnswers} /> a Worker
                        <input type="radio" name="answer2" value="looking-job" onChange={this.handleAnswers} /> looking for job
                    </div>
                    <div className="card">
                        <label>Is online learnign helpful</label> <br />
                        <input type="radio" name="answer3" value="yes" onChange={this.handleAnswers} /> Yes
                        <input type="radio" name="answer3" value="maybe" onChange={this.handleAnswers} /> Maybe
                        <input type="radio" name="answer3" value="no" onChange={this.handleAnswers} /> No
                    </div>

                    <input className="feedback-button" type="submit" value="submit" />
                </form>
            </div>
        } else if(this.state.isSubmitted === true && this.state.studentName !== ""){
            studentName = <h1>Thanks {this.state.studentName}</h1>
        }
        return(
            <div>
                {studentName}
                ----------------------------------
                {questions}
            </div>
        )
    }
}

export default Survey;