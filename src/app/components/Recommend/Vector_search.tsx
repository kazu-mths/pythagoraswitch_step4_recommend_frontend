'use client';
import { useRef, useState, useEffect } from 'react';
import { useRouter, useSearchParams} from 'next/navigation';

export default function Vector_search() {
    const formRef = useRef<HTMLFormElement>(null);
    const [token, setToken] = useState<string | null>(null);
    const user_token: string | null = useSearchParams().get("token");
    const [userName, setUserName] = useState('');
    const [recommendMessage, setRecommendMessage] = useState('');
    const router = useRouter();

    async function fetchUser(token: string) {
        const res = await fetch(`https://tech0-gen-5-step4-studentwebapp-1.azurewebsites.net/shopping?token=${token}`, { cache: "no-cache" });
        if (!res.ok) {
        throw new Error('Failed to fetch user');
        }
        return res.json();
    }

    useEffect(() => {
        if (user_token) { // user_tokenが存在する場合のみfetchを実行
        const fetchAndSetUser = async () => {
            const userData = await fetchUser(user_token);
            setUserName(userData.user_name);
            setToken(user_token);
            console.log(userData);
        };
        fetchAndSetUser();
        }
    }, [user_token]); // 依存配列にuser_tokenを追加


    const handleSend = async (event: any) => {
        event.preventDefault();

        // formRef.currentがnullでないことを確認
        if (formRef.current) {
            const formData = new FormData(formRef.current);
            const body_msg = JSON.stringify({
                token: token,
                input_prompt: formData.get('input_prompt')
            });

            const response = await fetch('https://tech0-gen-5-step4-studentwebapp-1.azurewebsites.net/vector', {
                method: 'POST',
                body: body_msg,
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                const jsonData = await response.json();
                setRecommendMessage(jsonData.recommend_comment);
                console.log(jsonData);
            } else {
                console.error('Recommend message failed:', response.statusText);
                window.alert(`Recommend message failed`);
            }
        }
    };

    const navigateToShopping = () => {
        router.push(`/shopping?token=${user_token}`);
    };

    return (
        <>
            <div  className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 relative">
                
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h1 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-black">
                        Talk with P-san
                    </h1>
                </div>

                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="mt-5 text-sm  leading-4 tracking-tight text-black">
                        AI搭載！ピタゴラ社の研究データや最新の商品情報をもとに、P-sanがあなたのスキンケアのお悩みに回答します！
                    </h2>
                </div>

                <div  className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" ref={formRef} onSubmit={handleSend}>
                    {/* <form ref={formRef} onSubmit={handleSend} style={{ width: '100%' }}> */}
                        <div>
                            <label htmlFor="user_name" className="block text-sm font-bold leading-6 text-black">
                                相談内容を入力してください
                            </label>
                            <div className="mt-2">
                                <textarea
                                    name="input_prompt"
                                    // type="text"
                                    className="block w-full rounded-md border-2 px-5 py-1.5 text-black shadow-sm ring-0 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-black sm:text-sm sm:leading-8"
                                    rows={4}
                                />
                            </div>
                        </div>
                        
                        <div className='mt-6 mb-6'>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-full border-2 border-black bg-white px-3 py-1.5 text-sm font-semibold leading-8 text-black shadow-sm hover:bg-black hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                            >
                            相談する
                            </button>
                        </div>
                    </form>

                    {recommendMessage ? (
                        <>
                            <div className='mt-6 mb-6'>
                            <img src="/talk.png" alt="Description Image" className="w-1/4" />
                            <div className="mt-0 border-2 rounded-md p-2 shadow-sm ring-0 ring-inset ring-gray-300 focus:ring-1 focus:ring-inset focus:ring-black">
                                {recommendMessage}
                            </div>
                            </div>
                        </>
                    ) : null}

                </div>

                <div  className="mt-1 sm:mx-auto sm:w-full sm:max-w-sm">
                    <div>
                        {/* <img src="/menu.png" alt="Menu Image" className="absolute top-[700px] w-full" /> */}
                        <button onClick={navigateToShopping}>Scan</button>
                    </div>
                </div>
            </div>
            


        </>
    );
}