import types from './types.js'
import axios from 'axios'

const actions={
    getSongAsync({commit,state}) {
		axios.get("/recommend/").then(resp => {
            if (resp.status == 200) {
              commit(types.GET_SONG,resp.data) ;
            }
          });
	}
}

export default actions;