import React, { memo, useState, useEffect } from "react";
import "./Message.scss";
import { format, parseISO } from "date-fns";
import { observer } from "mobx-react";
import { useStore } from "@/stores";

function lightOrDark(color:any) {

  var r: any, g: any, b: any, hsp: any;

  color = +("0x" + color?.slice(1)?.replace(
    color?.length < 5 && /./g, '$&$&'));

  r = color >> 16;
  g = color >> 8 & 255;
  b = color & 255;

  hsp = Math.sqrt(
    0.299 * (r * r) +
    0.587 * (g * g) +
    0.114 * (b * b)
  );

  if (hsp > 127.5) {
    // sang
    return true;
  }
  else {
    //toi
    return false;
  }
}

function Message(props: any) {
  const {
    data,
    author,
    type,
    isMine,
    startsSequence,
    endsSequence,
    photo,
    sendDate,
  } = props;
  const { authStore, chatStore} = useStore();
  const { chosenRoom } = chatStore;
  const [imagePath, setImagePath] = useState('https://www.treasury.gov.ph/wp-content/uploads/2022/01/male-placeholder-image.jpeg');
  const [bubbleBackground, setBubbleBackground] = useState(chosenRoom?.color);

  useEffect(() => {
    bubbleBackground && setBubbleBackground(bubbleBackground);
    let bubble = document.querySelectorAll(".message.mine .bubble-container .bubble") as NodeListOf<HTMLElement>;
    bubble.forEach(item => {
      if (item) {
        item.style.backgroundColor = bubbleBackground;
        if (lightOrDark(bubbleBackground)) {
          item.style.color = "black";
        } else {
          item.style.color = "white";
        }
      }
    })
  }, []);

  function renderPhoto() {
    if (photo && photo != "") {
      // const imageSrcPromise = getAvatarSrc(photo);
      // imageSrcPromise.then(function (data) {
      //   setImagePath(data);
      // });
    }
  }

  useEffect(renderPhoto, [])

  return (
    <div
      className={[
        "message",
        `${isMine ? "mine" : ""}`,
        `${startsSequence ? "start" : ""}`,
        `${endsSequence ? "end" : ""}`,
      ].join(" ")}
    >
      {type == "notification" && (
        <div className="notification">
          {format(parseISO(sendDate), "do MMMM yyyy")} <br />
          {data}
        </div>
      )}

      {type == "join" && (
        <div className="notification">
          {data}
        </div>
      )}

      {type == "left" && (
        <div className="notification">
          {data}
        </div>
      )}

      {type == "chat" && (
        <>
          {startsSequence && <div className="username">{author}</div>}
          <div className="user-container">
            {startsSequence && !isMine && (
              <img className="thumbnail" src={imagePath} alt=""></img>
            )}
            <div className="bubble-container">
              <div className="bubble">
                {data}
              </div>
            </div>
          </div>
        </>
      )}

    </div>
  );
}

export default memo(observer(Message));
