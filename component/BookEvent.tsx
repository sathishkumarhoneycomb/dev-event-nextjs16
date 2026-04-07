"use client"


import {useState} from "react";

const BookEvent = () => {
    const [email, setEmail] =useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        setSubmitted(true);
    }

    return (
        <div id={"book-event"}>
            {
                submitted ? <p> Thank you for signing up! </p>
                    : <form onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor={"email"}>Email</label>
                            <input
                                id="email"
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                                placeholder={"Email"}
                                type={'email'}
                                required={true}
                                />
                        </div>
                        <button type={"submit"} className={'button-submit'}> Submit </button>
                    </form>
            }
        </div>
    )
}
export default BookEvent
