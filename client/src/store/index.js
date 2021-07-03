import { createStore } from 'redux'

export default createStore(function(state,action){
	if(state === undefined || 0 || ''){
		return { userName : '', roomName : '', }
	}

	if(action.type === "roomInfo"){
		return {...state, userName : action.userName, roomName : action.roomName}
	}


	return state;
});