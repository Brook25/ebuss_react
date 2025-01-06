import "./Body.css";
import {useState} from "react";
import first from "./images/first.png"; 
import second from "./images/second.png"; 
import third from "./images/third.png"; 

function Body() {
  const images = [first, second, third];
  const [animation, setAnimation] = useState<{direction : "left" | "right" | "stop";
    imageIndex: number;
    }>({
      direction: 'stop',
      imageIndex: 0
  });

  const getSecondImageIndex = (
    currIndex: number,
    dir: 'left' | 'right' | 'stop'
  ) => {
    return dir === 'stop'
     ? currIndex
     : (currIndex + (dir === 'right' ? 1 : -1) + images.length) %
       images.length;
  }

  const onNext = () => {
    if (animation.direction === 'stop') {
      setAnimation({
        ...animation,
        direction: 'right',
      });
     }
  };

  const onPrevious = () => {
    if (animation.direction === 'stop') {
      setAnimation({
        ...animation,
        direction: 'left',
      });
    }
  };

  const onTransitionEnd = () => {
    setAnimation((prevAnimation) => ({
      ...prevAnimation,
      direction: 'stop',
      imageIndex: getSecondImageIndex(
        prevAnimation.imageIndex,
        prevAnimation.direction
      ),
    }));
  };
 
  return (
    <>
    <div className="item-bar">
      <button onClick={onPrevious}><i class="bi bi-chevron-left"></i></button>
        <div className="imageContainer">
        <img 
           className="image firstImage"
           src={images[animation.imageIndex]}
           data-animate={animation.direction}
           onTransitionEnd={onTransitionEnd}
        />
        <img
          className="image"
          src={
            images[getSecondImageIndex(animation.imageIndex, animation.direction)]
          }
        />
       </div>
      <button onClick={onNext}><i class="bi bi-chevron-right"></i></button>
    </div>

    <div className="body">
      <div className="body-box">Edibles</div>
      <div className="body-box">Tools</div>
      <div className="body-box">Exciting Deals</div>
      <div className="body-box">Gaming</div>
      <div className="body-box">Health & Personal Care</div>
      <div className="body-box">Home & Kithcen</div>
      <div className="body-box">Fashion</div>
      <div className="body-box">Books</div>
      <div className="body-box">Electronics</div>
    </div> 
    </>
  );
}

export default Body;
