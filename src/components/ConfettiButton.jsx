import React from "react"
import PropTypes from "prop-types"
import JSConfetti from "js-confetti"
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';

const ConfettiButton = ({ name, href, description, confettiOptions }) => {
    const navigate = useNavigate();
    const jsConfetti = new JSConfetti()

    const handleClick = async () => {
        await toast.promise(
            jsConfetti.addConfetti({
                ...confettiOptions,
                emojis: ['🌈', '⚡️', '💥', '✨', '💫', '🌸'],
                emojiSize: 25,
            }), 
            {
                loading: 'Applying...',
                success: description || 'Success!',
                error: <b>Could not save.</b>,
            }
        );

        await new Promise((resolve) => setTimeout(resolve, 1000));
        navigate(href || '/');
    }

    return (
        <button
            onClick={ handleClick }
            className="p-[3px] relative"
        >
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg" />
            <div className="px-8 py-2  bg-black rounded-[6px]  relative group transition duration-200 text-white hover:bg-transparent">
                {name}
            </div>
            <Toaster />
        </button>
    )
}

ConfettiButton.propTypes = {
    name: PropTypes.string.isRequired,
    href: PropTypes.string,
    description: PropTypes.string,
    confettiOptions: PropTypes.object,
}

ConfettiButton.defaultProps = {
    confettiOptions: {},
}

export default ConfettiButton