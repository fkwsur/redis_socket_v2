import React, { useEffect, useState } from "react";
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { InRoom } from './InRoom';
import store from '../store'
import axios from "axios";
import socketio from "socket.io-client";

const socket = socketio.connect("http://localhost:8081");

const Popup = ({ history }) => {
  const [room, setRoom] = useState('')
  const [roomList, setRoomList] = useState([]);
  const [hyungSik, setHyungSik] = useState('형식이2');



  useEffect(() => {
    roomlist()
  }, [])

  const roomlist = async () => {
    await axios.post('/roomlist', {
      user: '세션아뒤'
    })
      .then(res => {
        setRoomList(res.data.result);
        console.log(roomList);
      })
      .catch(err => {
        console.log(err);
      })
  }


  const onClick = async () => {

    alert('감사합니다.');
    await axios
      .post("/test", {
        roomname: room,
        user: 'asa2'
      })
      .then((res) => {
        console.log(res);
        if (res.data.result) {
          console.log(res.data.result);
          window.location.reload();
        }
        else {
          alert("에러발생");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const onUserClick = async (asd) => {
    await axios
      .post("/test", {
        roomname: hyungSik,
        user: '세션아뒤'
      })
      .then((res) => {
        console.log(res);
        if (res.data.result) {
          console.log(res.data.result);
          window.location.reload();
        }
        else {
          alert("에러발생");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const onMember = async (k) => {
    console.log(k)
    await axios
      .post("/members", {
        r_idx: k,
        user: '세션아뒤',
        user2: hyungSik
      })
      .then((res) => {
        console.log(res);
        if (res.data.result) {
          console.log(res.data.result);
        }
        else {
          alert("에러발생");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <>
      <h2>숙박업소 전용 톡~!</h2>
      <div>
        <h2>room list</h2>
        <input type="text" value={room} onChange={e => setRoom(e.target.value)} required />
        <button type="submit" onClick={onClick}>방만들기</button>
        <button type="button" onClick={() => window.location.reload()}>새로고침</button><br />

        <h2>유저리스트</h2>
        <input type="text" value={hyungSik} onChange={e => setRoom(e.target.value)} required />
        <button onClick={onUserClick}>형식이</button> 에게 말걸기

        <h2>방리스트</h2>
        {roomList ? roomList.map(k => {
          return (
            <>
              <button onClick={() => onMember(k.idx)}>
                <Link to={`/${k.idx}`}>{k.roomname}</Link>
              </button>
            </>
          )
        }) : '안나와'
        }
      </div>
    </>
  )
}

export default withRouter(Popup);
