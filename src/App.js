import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  background: "#0f2027",
  background: "linear-gradient(90deg,#2c5364,#203a43,#0f2027)",
  outline: "none",
  // boxShadow: 24,
  // p: 4,
};

function App() {
  const [jokesCat, setJokesCat] = useState([]);
  const [newJoke, setNewJoke] = useState({});
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
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

  async function handleClick(e) {
    const filter = jokesCat[e];

    try {
      const response = await axios.get(
        `https://api.chucknorris.io/jokes/random?category=${filter}`
      );
      const result = response.data;
      console.log(result);

      const obj = {
        jokeCategory: result.categories[0],
        joke: result.value,
        index: e,
      };
      setNewJoke(obj);

      console.log(newJoke);
    } catch (error) {}
    handleOpen();
  }

  return (
    <>
      <div className="container1   h-fit flex flex-col items-center justify-center">
        <h1 className=" headingDiv m-3 text-4xl text-green-500 animate-bounce font-bold ">
          {" "}
          Chuck Norries
        </h1>
        <div className="jokeDiv grid lg:grid-cols-4 md:grid-cols-2  grid-cols-4   bg-transparent text-white text-lg   md:gap-y-3  md:w-fit ">
          {jokesCat.map((joke, index) => {
            return (
              <div
                id={index}
                onClick={() => handleClick(index)}
                className="jokeCatText  shadow-xl w-16 h-6 md:w-60 md:h-40 bg-[#FFFFFF] text-center  m-3 rounded-md hover:border border-black capitalize text-white text-lg  
            cursor-pointer false md:p-3 "
              >
                <h1 className=" text-blue-900 font-bold capitalize text-sm md:text-2xl md:pt-6">
                  {joke}
                </h1>
                <p className="capitalize text-purple-800 text-sm lg:block md:block hidden">
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
            <Box
              sx={style}
              
              className="absolute shadow-2xl md:top-56  top-72 lg:rounded-md card p-5 lg:w-1/2 md:w-1/2 "
            >
              <Typography id="modal-modal-title" variant="h6" component="h2">
                <h1 className="text-center  capitalize text-3xl my-3 text-white font-bold">
                  {newJoke.jokeCategory}
                </h1>
              </Typography>
              <Typography id="modal-modal-description">
                <div className="w-full border border-black m-auto mt-6 shadow-xl flex flex-col items-center justify-center">
                  <p className="text-center font-semibold text-blue-100   font-sans  m-5 text-xl md:text-3xl">
                    {newJoke.joke}
                  </p>
               
              <button
                id={newJoke.index}
                onClick={(e) => handleClick(e.target.id)}
                className="px-4 py-2 bg-blue-700  my-3 mx-3  cursor-pointer lg:w-96 md:96  rounded-md hover:bg-blue-600 font-bold "
              >
                Next
              </button>
              </div>
              </Typography>
            </Box>
          </Modal>
        </div>
      </div>
    </>
  );
}

export default App;
