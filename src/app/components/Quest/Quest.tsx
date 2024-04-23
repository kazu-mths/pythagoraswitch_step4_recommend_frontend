'use client';
import { useRef, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function QuestTop() {
    const formRef = useRef<HTMLFormElement>(null);
    const user_token: string | null = useSearchParams().get("token");
    const router = useRouter();

    const handleSend = async (event: any) => {
        event.preventDefault();

        router.push(`/quest2?token=${user_token}`);
    };


    return (
        <>

            <div className="relative flex justify-center items-center mt-0 mb-0 sm:mx-auto sm:w-full sm:max-w-sm">
            <img src="/quest_top.png" alt="Home Screen" className="max-w-full h-auto"/>
            <form ref={formRef} onSubmit={handleSend} className="absolute inset-0 flex justify-center items-center">
                <button type="submit" style={{background: 'transparent', border: 'none', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}>
                　
                </button>
            </form>
            </div>
{/* 
            <div className="relative flex justify-center items-center mt-0 mb-0" style={{minWidth: '450px', overflowX: 'auto'}}>
            <img src="/quest_top.png" alt="Home Screen" className="w-[450px] h-[900px]"/>
            <form ref={formRef} onSubmit={handleSend} className="absolute inset-0 flex justify-center items-center">
                <button type="submit" style={{background: 'transparent', border: 'none', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}>
                　
                </button>
            </form>
            </div> */}

        </>
    );
}


// 'use client';
// import { useRef, useEffect, useState } from 'react';
// import { useRouter, useSearchParams } from 'next/navigation';

// export default function QuestTop() {
//     const formRef = useRef<HTMLFormElement>(null);
//     const imgContainerRef = useRef<HTMLDivElement>(null);  // HTMLDivElement型の注釈を明示的に設定
//     const user_token: string | null = useSearchParams().get("token");
//     const router = useRouter();

//     const handleSend = async (event: any) => {
//         event.preventDefault();
//         router.push(`/quest2?token=${user_token}`);
//     };

//     useEffect(() => {
//         // imgContainerRef.currentが存在し、正しい型であることを確認
//         if (imgContainerRef.current) {
//             const scrollX = imgContainerRef.current.offsetWidth / 2 - window.innerWidth / 2;
//             // scrollLeftに安全にアクセスして値を設定
//             imgContainerRef.current.scrollLeft = scrollX > 0 ? scrollX : 0;
//         }
//     }, []);

//     return (
//         <>
//             <div ref={imgContainerRef} className="relative flex justify-center items-center mt-0 mb-0" style={{minWidth: '450px', overflowX: 'auto'}}>
//                 <img src="/quest_top.png" alt="Home Screen" className="w-[450px] h-[900px]"/>
//                 <form ref={formRef} onSubmit={handleSend} className="absolute inset-0 flex justify-center items-center">
//                     <button type="submit" style={{background: 'transparent', border: 'none', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}>
//                     </button>
//                 </form>
//             </div>
//         </>
//     );
// }
