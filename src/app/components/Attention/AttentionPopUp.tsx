　'use client';
import { useRef, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function AttentionPopUp() {
    const formRef = useRef<HTMLFormElement>(null);
    const user_token: string | null = useSearchParams().get("token");
    const router = useRouter();

    const handleSend = async (event: any) => {
        event.preventDefault();

        router.push(`/survey?token=${user_token}`);
    };


    return (
        <>
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">

            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h1 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-black">
                    Attention
                </h1>
            </div>

            
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <p className="mt-10 text-sm font-bold leading-6 tracking-tight text-black">
                前回のカウンセリングから3カ月経ちました。<br></br>新しくカウンセリングを行いますか？
                </p>
            </div>

            <div   className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form ref={formRef} onSubmit={handleSend}>

                        <div className="flex justify-center items-center mt-10 mb-0 sm:mx-auto sm:w-full sm:max-w-sm">
                            <img src="/attention_p_san.png" alt="Attention" className="max-w-full h-auto"/>
                        </div>

                        <div className='mt-0 mb-6'>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-full border-2 border-black bg-white px-3  p-1.5 text-sm font-semibold leading-8 text-black shadow-sm hover:bg-black hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                            >
                            カウンセリングを行う
                            </button>
                        </div>

                        <div className='mt-6 mb-6'>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-full border-2 border-black bg-white px-3 py-1.5 text-sm font-semibold leading-8 text-black shadow-sm hover:bg-black hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                            >
                            また今度にする
                            </button>
                        </div>

                </form>
            </div>

        </div>
        </>
    );
}
