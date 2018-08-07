import { Router } from 'express';
import RandomService from '../lib/random-service';
import bigtable from '../lib/bigtable';

export default ({ config, db }) => {
	let q = Router();

    // q routes
	q.get('/', function (req, res) {
        var name = RandomService.getRandomName();
        res.send(`Hello ${name}`);
    });

    q.get('/:id', function (req, res) {
        let id = req.params.id;
        res.send(`Hello Q${id}`);
    });
  
	return q;
}