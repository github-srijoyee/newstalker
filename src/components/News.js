
import React, {Component} from "react"
import NewsItem from "../NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {

  static defaultProps = {
    country: 'in',
    pageSize: 8,
    category: 'general',
}

static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
}

  capitalizeFirstLetter=(string)=>{
    return string.charAt(0).toUpperCase()+string.slice(1);
  }
  
  constructor(props) {
    super(props);
    this.state = {
        articles: [],
        loading: true,
        page: 1,
        totalResults: 0
    }
    document.title = `${this.capitalizeFirstLetter(this.props.category)} - NewStalker`;
}
  
  async updateNews(){
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=7330284e69da47c68e94e9485cfe76ec&page=${this.state.page}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json()
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false, 
  })
  
}
async componentDidMount() {
  this.updateNews();
}

 handlePrevClick = async () => {
  this.setState({ page: this.state.page - 1 });
  this.updateNews();
  };

  handleNextClick = async () => {
    this.setState({ page: this.state.page + 1 });
    this.updateNews();
  };
  
  fetchMoreData=async()=>{

    this.setState({page: this.state.page + 1})
      const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=7330284e69da47c68e94e9485cfe76ec&page=${this.state.page}`;
      
    let data = await fetch(url);
    let parsedData = await data.json();
    //console.log(parsedData);
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults
  })
    };

  render(){
    return (
      <>
        <h1 className="text-center" style={{ margin: '35px 0px',marginTop:'90px' }}>
          NewStalker-Top {this.capitalizeFirstLetter(this.props.category)} Headlines 
        </h1>
        {this.state.loading && <Spinner />}
        <InfiniteScroll
        dataLength={this.state.articles.length}
        next={this.state.fetchMoreData}
        hasMore={this.state.articles.length!==this.state.totalResults}
        //loader={<Spinner/>}     //hv 2 cmmnt this line to remove the last spinner
        >
        <div className="container">

        

        <div className="row">
          {/*!state.loading &&*/
            this.state.articles.map((element) => {
              return <div className="col-md-4" key={element.url}>
                  <NewsItem
                    title={element.title ? element.title.slice(0, 45) : ""}
                    description={
                      element.description
                        ? element.description.slice(0, 88)
                        : ""
                    }
                    imageUrl={element.urlToImage}
                    newsUrl={element.url}
                    author={element.author}
                    date={element.publishedAt}
                    source={element.source.name}
                  />
                </div>
            
            })}
        </div>
        </div>
        </InfiniteScroll>
        {/*<div className="container d-flex justify-content-between">
          <button
            disabled={state.page <= 1}
            type="button"
            className="btn btn-dark"
            onClick={handlePrevClick}
          >
            &larr; Previous
          </button>
          <button
            disabled={
              state.page + 1 >
              Math.ceil(state.totalResults / props.pageSize)
            }
            type="button"
            className="btn btn-dark"
            onClick={handleNextClick}
          >
            Next &rarr;
          </button>
          </div>*/}
      </>
    );

        }
      }


export default News;
