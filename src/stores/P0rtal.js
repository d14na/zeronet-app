// @flow

import { observable, action } from 'mobx'
import { persist } from 'mobx-persist'

import {
    Account
} from './models'

class Store {
    @persist('object', Account) @observable current = new Account
    @persist @observable authorized = false
    @observable title = 'P0rtal'

    @action setP0rtalTitle(_title) {
        this.title = _title
    }

    @action authorize() {
        this.authorized = true
        this.setP0rtalTitle('Authorized!')
    }

    @action exit() {
        this.authorized = false
        this.setP0rtalTitle('I\'m gone!')
    }

    @action login = (username: string, password: string) => {
        return new Promise((resolve, reject) => {
            if (username && password) {
                this.authorized = true
                this.current = { username, password }
                resolve({ message: 'success' })
            } else {
                reject({ message: 'Something is wrong with input data :(' })
            }
        })
    }

    @action logout = () => {
        return new Promise((resolve, reject) => {
            this.authorized = false
            this.current = {}

            resolve()
        });
    }
}

export default new Store()
