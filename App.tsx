
import React, { useState, useEffect, useCallback } from 'react';
import { generateConfessionPoem } from './services/geminiService';

// FIX: Explicitly type the component as React.FC to allow for the 'key' prop.
const Star: React.FC<{ style: React.CSSProperties }> = ({ style }) => (
    <div
        className="absolute bg-white rounded-full animate-twinkle"
        style={style}
    ></div>
);

// FIX: Explicitly type the component as React.FC to allow for the 'key' prop.
const Lantern: React.FC<{ style: React.CSSProperties }> = ({ style }) => (
    <div style={style} className="absolute flex flex-col items-center filter drop-shadow-[0_0_15px_rgba(255,165,0,0.7)]">
        <div className="w-5 h-1 bg-yellow-900 rounded-t-sm"></div>
        <div className="w-12 h-16 bg-gradient-to-b from-orange-400 to-red-600 rounded-xl border-2 border-yellow-700/50 relative overflow-hidden flex items-center justify-center">
             <div className="w-8 h-8 bg-yellow-300/50 rounded-full blur-md"></div>
        </div>
        <div className="w-10 h-2 bg-yellow-900 rounded-b-md relative">
            <div className="absolute bottom-[-1.5rem] left-1/2 -translate-x-1/2 w-1 h-4 bg-red-800"></div>
            <div className="absolute bottom-[-2.5rem] left-1/2 -translate-x-1/2 w-8 h-4 bg-gradient-to-t from-red-500 to-yellow-400 rounded-t-sm"></div>
        </div>
    </div>
);


const Background = () => {
    const [stars, setStars] = useState<React.ReactNode[]>([]);
    const [lanterns, setLanterns] = useState<React.ReactNode[]>([]);

    useEffect(() => {
        const starElements = Array.from({ length: 50 }).map((_, i) => {
            const style = {
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                width: `${Math.random() * 2 + 1}px`,
                height: `${Math.random() * 2 + 1}px`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${Math.random() * 2 + 2}s`
            };
            return <Star key={`star-${i}`} style={style} />;
        });
        setStars(starElements);

        const lanternElements = Array.from({ length: 7 }).map((_, i) => {
            const anim = ['animate-float-slow', 'animate-float-medium', 'animate-float-fast'][Math.floor(Math.random() * 3)];
            const style = {
                top: `${Math.random() * 40 + 5}%`,
                left: `${Math.random() * 90 + 5}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${Math.random() * 10 + 8}s`
            };
            return <Lantern key={`lantern-${i}`} style={style} />;
        });
        setLanterns(lanternElements);
    }, []);

    return (
        <div className="fixed inset-0 w-full h-full bg-gradient-to-b from-[#0a192f] via-[#112240] to-[#243b55] overflow-hidden -z-10">
            {stars}
            {lanterns}
            <div className="absolute top-[10%] left-[10%] w-32 h-32 md:w-48 md:h-48 bg-yellow-100 rounded-full shadow-[0_0_50px_10px_rgba(255,255,224,0.7)]">
                <div className="absolute inset-0 rounded-full bg-yellow-50/20"></div>
            </div>
        </div>
    );
};

const LoadingState = () => (
    <div className="flex flex-col items-center justify-center text-white">
        <svg className="animate-spin -ml-1 mr-3 h-10 w-10 text-yellow-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <p className="mt-4 text-lg font-semibold text-yellow-100">Đang viết những lời yêu thương...</p>
    </div>
);

const ConfessionCard = ({ poem, onAccept, onNoHover, noPosition, yesScale }: { poem: string; onAccept: () => void; onNoHover: () => void; noPosition: string; yesScale: number; }) => (
    <div className="w-full max-w-md p-8 space-y-6 text-center bg-black/30 backdrop-blur-md rounded-2xl shadow-2xl border border-yellow-400/20 animate-fade-in">
        <h1 className="text-5xl font-dancing-script text-yellow-300 drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)]">
            Gửi Em,
        </h1>
        <div className="text-lg text-yellow-50 leading-relaxed whitespace-pre-wrap min-h-[120px]">
            {poem}
        </div>
        <h2 className="text-2xl font-semibold text-white pt-4">
            Đồng ý làm người yêu anh nhé?
        </h2>
        <div className="flex justify-center items-center pt-6 space-x-4 relative h-20">
            <button
                onClick={onAccept}
                className="px-8 py-3 bg-rose-500 text-white font-bold rounded-lg shadow-lg hover:bg-rose-600 transform hover:scale-105 transition-all duration-300 ease-in-out animate-heart-beat"
                style={{ transform: `scale(${yesScale})` }}
            >
                Vâng, em đồng ý ❤
            </button>
            <button
                onMouseEnter={onNoHover}
                className={`px-6 py-3 bg-slate-600 text-white font-bold rounded-lg shadow-lg hover:bg-slate-700 transition-all duration-300 ease-in-out absolute`}
                style={{ top: '50%', transform: 'translateY(-50%)', right: '10%' }}
                id="no-button"
            >
                Không nha!
            </button>
        </div>
    </div>
);


const Celebration = () => (
    <div className="text-center animate-fade-in space-y-6">
        <h1 className="text-5xl md:text-7xl font-dancing-script text-yellow-300 drop-shadow-[0_3px_3px_rgba(0,0,0,0.7)]">
            Anh biết mà!!! Yêu em ❤
        </h1>
        <p className="text-xl text-yellow-100">Từ nay chúng ta là một đôi dưới ánh trăng này nhé!</p>
        <div className="flex justify-center">
            <img 
                src="https://media1.tenor.com/m/E-3_7Q53k80AAAAC/peach-goma.gif" 
                alt="Cute couple gif" 
                className="w-64 h-64 rounded-2xl shadow-2xl"
            />
        </div>
    </div>
);

export default function App() {
    const [poem, setPoem] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isAccepted, setIsAccepted] = useState(false);
    const [noTries, setNoTries] = useState(0);

    useEffect(() => {
        const fetchPoem = async () => {
            try {
                const generatedPoem = await generateConfessionPoem();
                setPoem(generatedPoem);
            } catch (err) {
                setError('Không thể tạo lời nhắn. Vui lòng thử lại.');
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        };
        fetchPoem();
    }, []);

    const handleAccept = () => {
        setIsAccepted(true);
    };

    const handleNoHover = () => {
        const noButton = document.getElementById('no-button');
        if (noButton) {
            const viewportWidth = window.innerWidth;
            const viewportHeight = window.innerHeight;
            const buttonWidth = noButton.offsetWidth;
            const buttonHeight = noButton.offsetHeight;

            const randomX = Math.random() * (viewportWidth - buttonWidth);
            const randomY = Math.random() * (viewportHeight - buttonHeight);

            noButton.style.position = 'fixed';
            noButton.style.left = `${randomX}px`;
            noButton.style.top = `${randomY}px`;
        }
        setNoTries(prev => prev + 1);
    };
    
    const yesButtonScale = 1 + noTries * 0.1;

    return (
        <main className="relative w-screen h-screen flex items-center justify-center p-4">
            <Background />
            <div className="z-10">
                {isLoading ? (
                    <LoadingState />
                ) : error ? (
                    <p className="text-red-400 text-xl">{error}</p>
                ) : isAccepted ? (
                    <Celebration />
                ) : (
                    <ConfessionCard 
                        poem={poem}
                        onAccept={handleAccept}
                        onNoHover={handleNoHover}
                        noPosition={""}
                        yesScale={yesButtonScale}
                    />
                )}
            </div>
        </main>
    );
}
