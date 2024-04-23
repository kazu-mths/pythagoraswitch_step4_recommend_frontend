'use client';
import { useRef, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function LoginBonus() {
    const formRef = useRef<HTMLFormElement>(null);
    const user_token: string | null = useSearchParams().get("token");
    const router = useRouter();

    const handleSend = async (event: any) => {
        event.preventDefault();
        router.push(`/quest1?token=${user_token}`);
    };

    const [imageSrc, setImageSrc] = useState('/a_bonus.gif'); // 初期状態はアニメーションGIF

    useEffect(() => {
        const timer = setTimeout(() => {
            setImageSrc('/a_walking_bonus.png'); // 1ループ後に静止画に切り替える
        }, 7000);  // GIFの再生時間に応じて調整

        return () => clearTimeout(timer);
    }, []);

    return (
        <>

            <div className="relative flex justify-center items-center mt-0 mb-0 sm:mx-auto sm:w-full sm:max-w-sm">
            <img src={imageSrc}  alt="Home Screen" className="max-w-full h-auto"/>
            <form ref={formRef} onSubmit={handleSend} className="absolute inset-0 flex justify-center items-center">
                <button type="submit" style={{background: 'transparent', border: 'none', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}>
                　
                </button>
            </form>
            </div>

        </>
    );
}


// 'use client';
// import { useRef, useEffect, useState } from 'react';
// import { useRouter, useSearchParams } from 'next/navigation';

// export default function LoginBonus() {
//     const formRef = useRef<HTMLFormElement>(null);
//     const user_token: string | null = useSearchParams().get("token");
//     const router = useRouter();

//     const handleSend = async (event: any) => {
//         event.preventDefault();
//         router.push(`/quest1?token=${user_token}`);
//     };

//     const [videoSrc, setVideoSrc] = useState('/a_bonus.mp4'); // 初期状態はアニメーションMP4

//     useEffect(() => {
//         const timer = setTimeout(() => {
//             setVideoSrc('/a_walking_bonus.png'); // 1ループ後に静止画に切り替える
//         }, 8000);  // MP4の再生時間に応じて調整

//         return () => clearTimeout(timer);
//     }, []);

//     return (
//         <>
//             <div className="relative flex justify-center items-center mt-0 mb-0 sm:mx-auto sm:w-full sm:max-w-sm">
//                 <video src={videoSrc} title="Home Screen Video" className="max-w-full h-auto" autoPlay loop muted>
//                     Your browser does not support the video tag.
//                 </video>
//                 <form ref={formRef} onSubmit={handleSend} className="absolute inset-0 flex justify-center items-center">
//                     <button type="submit" style={{background: 'transparent', border: 'none', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}>
//                     </button>
//                 </form>
//             </div>
//         </>
//     );
// }

