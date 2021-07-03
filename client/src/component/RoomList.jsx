import React, { useEffect, useState } from "react";
import { withRouter } from 'react-router-dom';
import axios from 'axios';

const RoomList = () => {

	return (
		<>
			<form>
				방이름
				<input type="text" name="roomName" required />
				<button type="submit" value="submit">방생성버튼이요</button>
			</form>
			<h2>접속유저리스트</h2>

			<div>
				<h2>room list</h2>

			</div>

		</>
	)
}

export default withRouter(RoomList);