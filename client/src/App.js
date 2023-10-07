import React,{useState,useEffect} from "react";
import './App.css';
import Axios from 'axios';

function App() {
 const [movieName,setMovieName] = useState('');
 const [review,setReview] = useState('');
 const [movieReviewList,setMovieList]= useState ([]);
 const [newReview, setNewReview] = useState ("");
  useEffect (()=>{
    Axios.get('http://localhost:3001/api/get').then((response)=>{
      setMovieList(response.data);
      
    })
  },[])
 const SubmitReview= () => {
    Axios.post('http://localhost:3001/api/insert',
    {movieName: movieName,
    movieReview: review
    })
      setMovieList
      ([...movieReviewList,
        {movieName : movieName,
          movieReview :review},])
    
 };
  const deleteReview = (movie)=>{
    Axios.delete(`http://localhost:3001/api/delete/${movie}`);
    
  };
  const updateReview = (movie)=>{
    Axios.put('http://localhost:3001/api/update',{
    movieName : movie,
    movieReview : newReview
  });
   setNewReview("")
  };


  return (
    <div className="container-fluid">
  <nav class="navbar navbar-expand-sm navbar-dark bg-dark">
   <div class="container-fluid">
     <a class="navbar-brand" href="javascript:void(0)">Movies</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mynavbar">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="mynavbar">
      <ul class="navbar-nav me-auto">
        <li class="nav-item">
          <a class="nav-link" href="javascript:void(0)">Home</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="javascript:void(0)">History</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="javascript:void(0)">Recomended</a>
        </li>
      </ul>
      <form class="d-flex">
        {/* <input class="form-control me-2" type="text" placeholder="Search"> */}
        <button class="btn btn-primary" type="button">Search</button>
      </form>
    </div>
  </div>
  </nav>
  
  <div className="container-fluid">
    <div className=" row justify-content-center ">
      <div className="co-sm-12">
     <h3 className="text-center text-dark mt-2">CRUD APPLICATION</h3>
     </div>
    </div>
  </div>
  <div className="container-fluid"> 
    <div class="row">
      <div class=" col-sm-4 ">
       <form role="form">
        <div class="form-group">
        <label for="usr"> Movie Name :</label>
        <input type="text" class="form-control" name="movieName" onChange ={(e)=>{
        setMovieName(e.target.value)
       }}/>
        <label for="usr">Review :</label>
        <input type="text" class="form-control" name="review" onChange ={(e)=>{
        setReview(e.target.value)
      }}/>
      <button class="mt-2 btn btn-primary" onClick={SubmitReview}>Submit</button>
      </div>
      </form>
    </div>
   <div class="col-sm-8">
     <table class="table  table-hover table-dark">
      <thead class="table ">
        <tr>
          <th>Movie Name</th>
          <th>Movie Review</th>
          <th>Action</th>
        </tr>
      </thead>

      <tbody>
        {movieReviewList.map ((val)=>{
           return(
            <tr>
              <td>{val.movieName}</td>
              <td>{val.movieReview}</td>
              <td>
                <button className="btn btn-danger" onClick={()=>{deleteReview(val.movieName)}}>
                    Delete</button>
                    
              </td>
              <td>
                 <input type="text" id ="updateInput" onChange={(e) =>{ setNewReview(e.target.value)}}></input>
                   <button className="btn btn-primary" onClick={()=>{updateReview(val.movieName)}}>
                     Update</button>
              </td>
           </tr>
        )}) }
      </tbody>
    </table> 
        </div>
        </div>
      </div>
    </div>
  // </div>


);
}

export default App;
