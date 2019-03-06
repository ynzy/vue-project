import axios from 'axios'

import {url} from './config'

let getShopList= (page) => {
    return axios({
        method: "post",
        url: url + "/shopList",
        data: {
          page: page,
          pageSize: 10
        }
      })
}

export {
    getShopList
}