import { BsFillHandThumbsDownFill, BsFillHandThumbsUpFill } from 'react-icons/bs';
import classes from './Joke.module.css'

const Joke = ({ joke, votes, upvote, downvote }) => {

    const getColorAndEmoji = () => {
        if (votes >= 15) {
            return ({ color: '#4CAF50', emoji: 'ec ec-rofl' })
        } else if (votes >= 12) {
            return ({ color: '#8BC34A', emoji: 'ec ec-laughing' })
        } else if (votes >= 9) {
            return ({ color: '#CDDC39', emoji: 'ec ec-smiley' })
        } else if (votes >= 6) {
            return ({ color: '#FFEB3B', emoji: 'ec ec-slightly-smiling-face' })
        } else if (votes >= 3) {
            return ({ color: '#FFC107', emoji: 'ec ec-neutral-face' })
        } else if (votes >= 0) {
            return ({ color: '#FF9800', emoji: 'ec ec-confused' })
        } else {
            return ({ color: '#f44336', emoji: 'ec ec-angry' })
        }
    };

    return (
        <div className={classes.Joke}>
            <div className={classes["Joke-buttons"]}>
                <BsFillHandThumbsUpFill size={20} onClick={upvote} className={classes["Joke-upvote"]} />
                <span
                    className={classes['Joke-votes']}
                    style={{ borderColor: getColorAndEmoji().color }}>
                    {votes}
                </span>
                <BsFillHandThumbsDownFill size={20} onClick={downvote} className={classes["Joke-downvote"]} />
            </div>
            <p>{joke}</p>
            <div className={classes['Joke-smiley']}>
                <span className={getColorAndEmoji().emoji}></span>
            </div>
        </div>
    )
}

export default Joke;
