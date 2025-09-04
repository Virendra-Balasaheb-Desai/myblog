import React from 'react'

const Loader = () => {
    return (
        <div className='flex w-full min-h-[inherit]  justify-center items-center'>
            <div className="relative w-28 flex m-auto ">
                <div className="absolute rounded-full bg-white/20 w-5 h-5 left-1 bottom-1 animate-[floatup_5s_ease-in-out_infinite] animate-[drift_6s_linear_infinite]"></div>
                <div className="absolute rounded-full bg-white/10 w-3 h-3 left-6 bottom-6 animate-[floatup_4.5s_ease-in-out_infinite] animate-[drift_5s_linear_infinite] [animation-delay:1s]"></div>
                <div className="absolute rounded-full bg-white/30 w-6 h-6 left-12 bottom-7 animate-[floatup_5.5s_ease-in-out_infinite] animate-[drift_7s_linear_infinite] [animation-delay:2s]"></div>
                <div className="absolute rounded-full bg-white/15 w-4 h-4 left-16 bottom-2 animate-[floatup_4.8s_ease-in-out_infinite] animate-[drift_6.5s_linear_infinite] [animation-delay:1.5s]"></div>
                <div className="absolute rounded-full bg-white/25 w-3 h-3 left-20 bottom-4 animate-[floatup_5.2s_ease-in-out_infinite] animate-[drift_5.5s_linear_infinite] [animation-delay:2.2s]"></div>
            </div>
        </div>
    )
}

export default Loader
