import React from "react";

export default function Getinput() {
  const [allMemes, setAllMemes] = React.useState();
  const [text, setText] = React.useState({
    topText: "",
    bottomText: "",
  });

  React.useEffect(() => {
    fetch("https://api.imgflip.com/get_memes")
      .then((response) => response.json())
      .then((meme) => setAllMemes(meme.data.memes));
  }, []);

  function handleChange(event) {
    const { name, value } = event.target;
    setText((prevText) => {
      return {
        ...prevText,
        [name]: value,
      };
    });
  }

  function addImage() {
    const randomNumber = Math.trunc(Math.random() * allMemes.length);
    const img = allMemes[randomNumber].url;
    setText((prevText) => {
      return {
        ...prevText,
        randomImg: img,
      };
    });
  }

  return (
    <>
      <div className="container">
        <nav className="navbar">
          <h1 className="heading">Meme Generator</h1>
          <h2 className="heading-sm-txt">React Project </h2>
        </nav>
        <div className="input-container">
          <div className="inputOnly">
            <input
              type="text"
              placeholder="Add text"
              className="top-text"
              name="topText"
              onChange={handleChange}
              value={text.topText}
            />
            <input
              type="text"
              placeholder="Add text"
              className="bottom-text"
              name="bottomText"
              onChange={handleChange}
              value={text.bottomText}
            />
          </div>

          <button type="button" className="btn-submit" onClick={addImage}>
            Generate Meme
          </button>
        </div>
        <div className="img-container">
          <img src={text.randomImg} className="meme-img" />
          <p className="img-top-text">{text.topText}</p>
          <p className="img-bottom-text">{text.bottomText}</p>
        </div>
      </div>
    </>
  );
}
