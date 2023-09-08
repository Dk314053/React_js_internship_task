import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { Button } from "@mui/material";


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


function App() {
  const [jokesCat, setJokesCat] = useState([]);
  const [newJoke,setNewJoke]=useState({})
  const [open, setOpen] = useState(false);

  const handleOpen = () =>setOpen(true);
  const handleClose = () => setOpen(false);


  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          "https://api.chucknorris.io/jokes/categories"
        );
        const apiData = response.data;
        setJokesCat(apiData);
      } catch (error) {
        console.error(error.message);
      }
    }
    fetchData();
  }, []);

  async function handleClick(e){
  const filter=jokesCat[e]
  
  try {

    const response =await axios.get(`https://api.chucknorris.io/jokes/random?category=${filter}`)
    const result =response.data 
    console.log(result);
     
    const obj={jokeCategory:result.categories[0],joke:result.value,index:e}
    setNewJoke(obj)
   
    console.log(newJoke);
  } catch (error) {
    
  }
  handleOpen()
  }


  return (
    <>
    <div className="container1">
      <h1 className=" headingDiv "> Chuck Norries</h1>
      <div className="jokeDiv ">
        {jokesCat.map((joke,index) => {
          return (
            <div id={index} onClick={()=>handleClick(index)} className="jokeCatText">
              <h1   style={{ fontSize: "24px", color: "#1e3a8a" }}>{joke}</h1>
              <p style={{ fontSize: "14px", color: "#6b21a8" }}>
                Unlimited Jokes on {joke}
              </p>
              
            </div>
          );
        })}
      </div>
      <div>
     
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {newJoke.jokeCategory}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {newJoke.joke}
          </Typography>
          <Button id={newJoke.index} onClick={(e)=>handleClick(e.target.id)} >Next</Button>
        </Box>
      </Modal>
    </div>
    </div>
        </>
  );
}

export default App;
