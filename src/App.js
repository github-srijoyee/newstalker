import "./App.css";
import React,{Component} from "react"
import NavBar from "./components/NavBar";
import News from "./components/News";
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'

export default class App extends Component {
 pageSize=6;
 apiKey=process.env.REACT_APP_NEWS_API

 render(){
    return (
      <div>
        <Router>
          <NavBar/>
          {/*<LoadingBar
          height={3}
        color='#f11946'
        progress={progress}
        //onLoaderFinished={() => setProgress(0)}
    />*/}
          
          <Routes>
         <Route exact path="/" element={<News key="general"    /*pageSize={page.size}*/ country="in" category="general" />} />
         <Route exact path="/business" element={<News key="business"   /*pageSize={page.size}*/ country="in" category="business" />} />
         <Route exact path="/entertainment" element={<News key="entertainment"    /*pageSize={page.size}*/ country="in" category="entertainment" />} />
         <Route exact path="/general" element={<News key="general"    /*pageSize={page.size}*/ country="in" category="general" />} />
         <Route exact path="/health" element={<News key="health"    /*pageSize={page.size}*/ country="in" category="health" />} />
         <Route exact path="/science" element={<News key="science"    /*pageSize={page.size}*/ country="in" category="science" />} />
         <Route exact path="/sports" element={<News key="sports"    /*pageSize={page.size}*/ country="in" category="sports" />} />
         <Route exact path="/technology" element={<News key="technology"   /*pageSize={page.size}*/ country="in" category="technology" />} />  
        </Routes>
          </Router>
          
      </div>
    )
  }
}



