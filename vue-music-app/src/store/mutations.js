import types from './types'

const mutations = {
	[types.GET_SONG](state,data) {
        state.song = data
        console.log(data)
	}
}

export default mutations