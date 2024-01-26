const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const cors = require('cors')
const knex = require('knex')
const saltRounds = 10;
app.use(express.json());
app.use(cors());

const db = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        port: '5432',
        user: 'postgres',
        password: 'root',
        database: 'face-reco-db'
    }
});


app.get('/', (req, res) => {
    res.send(database.users);
});

app.post('/signin', (req, res) => {

    const { email, password } = req.body;
    if (!email, !password) {
        return res.status(400).json('incorrect form submission')
    }

    db.select('email', 'hash').from('login')
        .where('email', '=', req.body.email)
        .then(data => {
            const isValid = bcrypt.compareSync(req.body.password, data[0].hash);
            if (isValid) {
                return db.select('*').from('users').where('email', '=', req.body.email)
                    .then(user => {
                        res.json(user[0])
                    })
                    .catch(err => res.status(400).json('unable to get user'))
            } else {
                res.status(400).json('wrong credentials')
            }
        })

        .catch(err => res.status(400).json('wrong credentials'))
});

app.post('/register', (req, res) => {

    const { name, email, password } = req.body;
    if (!email, !name, !password) {
        return res.status(400).json('incorrect form submission')
    }

    const hash = bcrypt.hashSync(password, saltRounds);

    db.transaction(trx => {
        trx.insert({
            hash: hash,
            email: email
        })
            .into('login')
            .returning('email')
            .then(loginEmail => {
                return trx('users')
                    .returning('*')
                    .insert({
                        email: loginEmail[0].email,
                        name: name,
                        joined: new Date()
                    })
                    .then(user => {
                        res.json(user[0]);
                    })
            })
            .then(trx.commit)
            .catch(trx.rollback)
    })



        .catch(err => res.status(400).json('unable to register'));

});

app.post('/profile/:id', (req, res) => {
    const { id } = req.params;

    const user = database.users.find(item => item.id === id);
    db.select('*').from('users').where({
        id: id
    }).then(user => {
        if (user.length) {
            res.json(user[0])
        } else {
            res.status(400).json('No user found');
        }
    }).catch(err => res.status(400).json('user not found'))


});

app.put('/image', (req, res) => {

    const { id } = req.body;

    db('users').where('id', '=', id)
        .increment('entries', 1)
        .returning('entries')
        .then(entries => {
            res.json(entries[0].entries)
        })

        .catch(err => res.status(400).json('0'))

})

app.listen(4005);