'use client';
import { useRef, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function LoginBonus() {
    const formRef = useRef<HTMLFormElement>(null);
    const user_token: string | null = useSearchParams().get("token");
    const router = useRouter();

    const handleSend = async (event: any) => {
        event.preventDefault();
        router.push(`/mypage2?token=${user_token}`);
    };

    const [imageSrc, setImageSrc] = useState('/collection.gif'); // 初期状態はアニメーションGIF

    useEffect(() => {
        const timer = setTimeout(() => {
            setImageSrc('/quest_collection2.png'); // 1ループ後に静止画に切り替える
        }, 14000);  // GIFの再生時間に応じて調整

        return () => clearTimeout(timer);
    }, []);

    return (
        <>

            <div className="relative flex justify-center items-center mt-0 mb-0 sm:mx-auto sm:w-full sm:max-w-sm">
            <img src={imageSrc}  alt="Home Screen" className="max-w-full h-auto"/>
            <form ref={formRef} onSubmit={handleSend} className="absolute inset-0 flex justify-center items-center">
                <button type="submit" style={{background: 'transparent', border: 'none', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}>
                　　　
                </button>
                {/* <button
                    type="submit"
                    // className="absolute top-[200px] left-1/2 transform -translate-x-1/2 flex w-full justify-center rounded-full border-2 border-black bg-white px-3 py-1.5 text-sm font-semibold leading-8 text-black shadow-sm hover:bg-black hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                    className="absolute top-[493px] left-1/2 transform -translate-x-1/2 w-[180px] bg-transparent  text-center rounded-full border-2 bg-black border-black px-3 py-1.5 text-sm font-semibold leading-8 text-white shadow-sm hover:bg-white hover:text-black focus:outline-black focus:ring-2 focus:ring-offset-2 focus:ring-black"
                >
                    Questで確認
                </button> */}
            </form>
            </div>

        </>
    );
}
