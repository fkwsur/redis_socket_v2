import socketio from "socket.io-client";
import React, { useEffect, useState } from "react";
import store from '../store';
import axios from "axios";

const socket = socketio.connect("http://localhost:8081");

export const InRoom = () => {
  const [message, setMessage] = useState('');
  const [messageList, setMessageList] = useState([]);
  const [roomInfo, setRoomInfo] = useState([]);
  const [croomInfo, setCRoomInfo] = useState([]);
  const [name, setName] = useState('');
  const [check, setCheck] = useState(false);

  useEffect(() => {
    socket.emit('roomName', name)
    socket.on('msg', (obj) => {
      setMessageList([...messageList, obj]);
    });
  });

  useEffect(() => {
    roomChat()
  }, []);

  const roomChat = async () => {
    const url = window.location.pathname;
    const idx = url.split('/')[1];
    await axios.post('/roominfo', {
      idx: idx
    })
      .then((res) => {
        if (res.data.result2) {
          setCheck(true);
          setRoomInfo(res.data.result2);
          setName(res.data.result2[0].roomname);
        } else if (res.data.result1) {
          setCheck(false);
          setName(res.data.result1.roomname);
        }
        else {
          console.log('여기가아니다2')
        }
      })
      .catch((err) => {
        console.log(err);
      })
  }

  const onSubmit = (e) => {
    e.preventDefault();
    socket.emit('msg', {
      name: '현지',
      roomName: name,
      message: message
    });
    setMessage('');
  }

  return (
    <div>
      <input
        type="text"
        name="message"
        value={message}
        onChange={e => setMessage(e.target.value)}
      />
      <button type="submit" value="submit" onClick={onSubmit}>버튼이요</button>

      <h2>{name}</h2>
      {/*  */}
      {check === true ?
        <>
          {
            roomInfo ? roomInfo.map(k => {
              return (
                <div className="send">
                  <h2>{k.roomname}</h2>
                  <div>
                    <p>
                      아이디 : {k.username}<br />
                      내용 : {k.message}<br />
                    </p>
                  </div>
                </div>
              )
            }) : '안나와'
          }
        </>
        : ''
      }



      {messageList ? messageList.map(k => {
        return (
          <div className="send">
            <h2>{k.roomName}</h2>
            <div>
              <p>
                아이디 : {k.name}<br />
                내용 : {k.message}<br />
              </p>
            </div>
          </div>
        )
      }) : '안나와'
      }
    </div>
  );
}
