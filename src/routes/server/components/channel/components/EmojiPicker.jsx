/* eslint-disable react/prop-types */
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';

const EmojiPicker = ({ handleEmoji }) => {
    const [showEmoji, setShowEmoji] = useState(false)
    const [theme, setTheme] = useState('dark');

    useEffect(() => {
        const updateTheme = () => {
            const currentTheme = document.body.getAttribute('data-theme');
            setTheme(currentTheme === 'dark' ? 'dark' : 'light');
        };

        updateTheme()

        const observer = new MutationObserver(() => {
            updateTheme()
        })

        observer.observe(document.body, {
            attributes: true,
            attributeFilter: ['data-theme'],
        })
        return () => observer.disconnect();
    }, [])

    return (
        <div>
            <FontAwesomeIcon onClick={() => { setShowEmoji(!showEmoji) }} className=" absolute top-0 right-0 text-2xl transition hover:text-black dark:hover:text-white" icon="fa-solid fa-face-smile" />
            <div className={`${showEmoji ? "mt-8 shadow-lg" : "hidden"}`}>
                <div className='absolute bottom-12 right-0'>
                <Picker
                    data={data}
                    onEmojiSelect={(e) => { handleEmoji(e.native) }}
                    theme={theme}
                />
                </div>
            </div>
        </div>

    );
}

export default EmojiPicker;