import React, {Component} from 'react';
// import Header from './header.jsx';
// import CurrentAlg from './currentAlg.jsx';
// import SubmissionForm from './submissionForm.jsx';
// import SubmissionGallery from './submissionGallery.jsx';
// import PlaceholderGallery from './placeholderGallery.jsx';
// import Footer from './footer.jsx';
import Routes from './routes/index.jsx';



// import SubmissionForm from './submission-form.jsx';
// import PhotoGallery from './photoGallery.jsx';

class App extends Component{
    constructor(props) {
        super(props)
        this.state = {};
    }
//Just commenting out for now until we get server working...
    // componentDidMount() {
    //     console.log(`componentDidMount fired!!! `);
    //     fetch('/currentUser', {credentials: "same-origin"})
    //     .then(response => response.json())
    //     .then(myJson => {
	// 				// console.log(myJson);
	// 				this.setState(myJson);
	// 				console.log(this.state + "<==== this.state");
    //     })
	// 			.catch(err => console.log(err));


                //This code should be deleted... its handled on the serverside
				// fetch('/gallery', {credentials: "same-origin"})
				// .then(res => res.json())
				// .then(myJson => {
				// 	console.log(myJson);
				// 	this.setState({gallery: myJson});
				// 	console.log(this.state);
				// })
    // }

    render(){
        return (
            <div>
                {/* <Header id='header' userName='troutman21'  avatar="https://goo.gl/tuwXB3" /> */}
                {/* <SubmissionForm userName={this.state.userName} /> OLD SUMBISSION FORM  */}
                {/* <PhotoGallery gallery={this.state.gallery} /> OLD PHOTOGALLERY*/}
                {/* <CurrentAlg /> */}
                {/* <SubmissionForm /> */}
                {/* <SubmissionGallery /> */}
                {/* <PlaceholderGallery /> */}
                {/* <Footer /> */}
            </div>
        );
    }
}
export default <Routes/>;

