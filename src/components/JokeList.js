import { useEffect, useState } from "react";
import { v4 as uuid } from "uuid"
import axios from "axios";
import Joke from "./Joke";
import classes from './JokeList.module.css'


const JokeList = () => {
    const [jokes, setJokes] = useState(JSON.parse(window.localStorage.getItem('jokes') || '[]'));
    const [loading, setLoading] = useState(false);
    const jokesPerPage = 10;
    let seenJokes = new Set(jokes.map(joke => joke.text));

    useEffect(() => {
        if (jokes.length === 0) getJokes()
    });

    const getJokes = async () => {
        try {
            setLoading(true);
            let jokesfetched = [];
            while (jokesfetched.length < jokesPerPage) {
                const res = await axios.get('https://icanhazdadjoke.com', {
                    headers: {
                        Accept: 'application/json'
                    }
                });
                const newJoke = res.data.joke;
                if (!seenJokes.has(newJoke)) {
                    jokesfetched.push({ text: newJoke, id: uuid(), votes: 0 });
                } else {
                    console.log('DUPLICATE JOKE');
                    console.log(newJoke);
                }
            }
            setJokes(jokesfetched);
            window.localStorage.setItem('jokes', JSON.stringify(jokesfetched));
            setLoading(false);
        } catch (e) {
            console.log(e);
            setLoading(false);
        }
    };



    const voteHandler = (id, delta) => {
        // Logic for upvoting and downvoting
        setJokes(prevState => (
            prevState.map(joke => joke.id === id ? { ...joke, votes: joke.votes + delta } : joke)
        ));
        window.localStorage.setItem('jokes', JSON.stringify(jokes))
    };

    const moreJokesHandler = async () => {
        try {
            setLoading(true);
            let jokesfetched = [];
            while (jokesfetched.length < jokesPerPage) {
                const res = await axios.get('https://icanhazdadjoke.com', {
                    headers: {
                        Accept: 'application/json'
                    }
                });
                const newJoke = res.data.joke;
                if (!seenJokes.has(newJoke)) {
                    jokesfetched.push({ text: newJoke, id: uuid(), votes: 0 });
                } else {
                    console.log('DUPLICATE JOKE');
                    console.log(newJoke);
                }
            }
            setJokes(prev => [...prev, ...jokesfetched]);
            window.localStorage.setItem('jokes', JSON.stringify(jokes));
            setLoading(false);
        } catch (e) {
            console.log(e);
            setLoading(false);
        }
    };

    console.log(jokes);


    if (loading) {
        return (
            <div>
                <h1>Loading...</h1>
            </div>
        )
    };

    return (
        <div className={classes.JokeList}>
            <div className={classes['JokeList-sidebar']}>
                <h1 className={classes['JokeList-title']}>
                    <span>Dad</span> Jokes
                </h1>
                <img src='https://assets.dryicons.com/uploads/icon/svg/8927/0eb14c71-38f2-433a-bfc8-23d9c99b3647.svg' alt='emoji' />
                <button className={classes['JokeList-getmore']} onClick={moreJokesHandler}>
                    Fetch Jokes
                </button>
            </div>
            <div className={classes["JokeList-jokes"]}>
                {jokes.map(joke => (
                    <Joke key={joke.id}
                        joke={joke.text}
                        votes={joke.votes}
                        upvote={() => { voteHandler(joke.id, 1) }}
                        downvote={() => { voteHandler(joke.id, -1) }}
                    />
                ))}
            </div>
        </div>
    )
};

export default JokeList;
