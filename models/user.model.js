const fs = require('fs');
const path = require('path');

const p = path.join(path.dirname(process.mainModule.filename), 'data', 'users.json');

const getUsersFromFile = (cb) => {
    fs.readFile(p, (err, fileContent) => {
        if (err) {
            cb([])
        } else {
            cb(JSON.parse(fileContent));
        }
    })
};

module.exports = class User {
    constructor(email, password){
        this.email = email;
        this.password = password
    }

    save(){
        this.id = Math.floor(Math.random() * 11001);
        getUsersFromFile(users =>{
            users.push(this);
            fs.writeFile(p, JSON.stringify(users), err=>{
                console.log(err);
            });
        });
    }

    static fetchAll(){
        getUsersFromFile(cb);
    }

    static findById(id, cb){
        getUsersFromFile(users =>{
            const users = users.find(u => u.id === id);
            cb(user);
        })
    }

    static getByEmail(email, cb){
        getUsersFromFile(users =>{
            const user = users.find(u => u.email === email);
            cb(user);
        })
    }
}