import React, { useEffect, useState } from "react";
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
// import RoomList from './component/RoomList.jsx';


const Room = ({ history }) => {
	const [userName, setUserName] = useState('');



	const handleClick = () => {
		history.push("/RoomList");
	}

	return (
		<>
			<form>
				이름
				<input type="text" name="userName" value={userName} onChange={e => setUserName(e.target.value)} required />
				<button type="submit" value="submit" onClick={handleClick}>버튼이요</button>
			</form>
			{/* <button><Link to="/RoomList">리스트</Link></button> */}

		</>
	)
}

export default withRouter(Room);
