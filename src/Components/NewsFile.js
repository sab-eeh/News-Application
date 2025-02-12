import React, { useEffect , useState } from "react";
import PropTypes from 'prop-types'
import NewsComponent from "./NewsComponent";
import Spinner from "./Spinner";
import InfiniteScroll from "react-infinite-scroll-component";

const NewsFile = (props) => {
  const [articles,setArticles] = useState([])
  const [loading,setLoading] = useState(true)
  const [page,setPage] = useState(1)
  const [totalResults,setTotalResults] = useState(0)
  const capitilize = (string)=>{
    return string.charAt(0).toUpperCase() + string.slice(1)
  } 

  const Update = async () => {
    try {
      props.setProgress(30)
      let url = `https://newsapi.org/v2/top-headlines?country=us&category=${props.category}&apiKey=4d43724dd59c4354b52b60be8bdb1020&page=1&pageSize=${props.pageSize}`;
      setLoading(true)
      let data = await fetch(url);
      props.setProgress(70)
      let Apidata = await data.json();
       setArticles(Array.isArray(Apidata.articles) ? Apidata.articles : []); // Ensure `articles` is an array
      setLoading(false)
      setTotalResults(Apidata.totalResults || 0)
      props.setProgress(100)

    } catch (error) {
      console.error("Failed to fetch articles", error);
    }
  }
  useEffect(()=>{
  document.title = `${capitilize(props.category)} - News`
    Update();}
    ,[]
  )

  

const fetchMoreData = async () => {
  setPage(page + 1);
  setTimeout(async () => {  // Add delay
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=4d43724dd59c4354b52b60be8bdb1020&page=${props.page + 1}&pageSize=${props.pageSize}`;
    let data = await fetch(url);
    let Apidata = await data.json();
    setArticles(articles.concat(Apidata.articles || []));
  }, 1000);  // Delay of 1000ms (1 second)
};


    return (
      <>
        <h1 className="text-center " style={{marginTop : '80px'}}>Top {capitilize(props.category)} Headlines</h1>
        {loading && <Spinner/>}
        <InfiniteScroll
          dataLength={articles ? articles.length : 0}  // Ensure `articles` is not undefined
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Spinner/>}
        >
          <div className="container">
              <div className="row my-3">
                {articles.map((element) => (
                  <div className="col-md-4 my-3" key={element.url}>
                    <NewsComponent
                      title={element.title}
                      description={element.description}
                      imageUrl={element.urlToImage}
                      newUrl={element.url}
                      author={element.author}
                      date={element.publishedAt}
                      source = {element.source.name}
                    />
                  </div>))}
              </div>
        </div>
        </InfiniteScroll>



      
        </>
    );
  }

// NewsFile.defaultProps = {
//   pageSize : 6,
//   country : "us",
//   category : "general"

// }
NewsFile.propTypes = {
  country : PropTypes.string,
  pageSize : PropTypes.number,
  category : PropTypes.string,
  setProgress: PropTypes.func.isRequired,
}

export default NewsFile;
