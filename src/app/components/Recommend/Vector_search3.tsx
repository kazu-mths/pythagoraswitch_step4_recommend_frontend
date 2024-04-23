'use client';
import { useRef, useState, useEffect } from 'react';
import { useRouter, useSearchParams} from 'next/navigation';

export default function Vector_search3() {
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
                        Scan
                    </h1>
                </div>

                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="mt-5 text-md  text-bold leading-4 tracking-tight text-black">
                        HOW TO USE
                    </h2>
                </div>

                <div className="relative flex justify-center items-center mt-0 mb-0 sm:mx-auto sm:w-full sm:max-w-sm">
                <img src="/howto_step1.png" alt="Home Screen" className="max-w-full h-auto"/>
                <form ref={formRef} onSubmit={handleSend} className="absolute inset-0 flex justify-center items-center">
                <button type="submit" style={{background: 'transparent', border: 'none', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}>
                　
                </button>
                </form>
                </div>

                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="mt-5 text-md  text-bold leading-4 tracking-tight text-black">
                    洗顔・ヒゲそり・入浴後などに、適量(顔全体であずき2粒程度)を手のひらに取ります。
                    </h2>
                </div>

                <div className="relative flex justify-center items-center mt-0 mb-0 sm:mx-auto sm:w-full sm:max-w-sm">
                <img src="/howto_step2.png" alt="Home Screen" className="max-w-full h-auto"/>
                <form ref={formRef} onSubmit={handleSend} className="absolute inset-0 flex justify-center items-center">
                <button type="submit" style={{background: 'transparent', border: 'none', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}>
                　
                </button>
                </form>
                </div>

                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="mt-5 text-md  text-bold leading-4 tracking-tight text-black">
                    手になじませます。
                    </h2>
                </div>

                <div className="relative flex justify-center items-center mt-0 mb-0 sm:mx-auto sm:w-full sm:max-w-sm">
                <img src="/howto_step3.png" alt="Home Screen" className="max-w-full h-auto"/>
                <form ref={formRef} onSubmit={handleSend} className="absolute inset-0 flex justify-center items-center">
                <button type="submit" style={{background: 'transparent', border: 'none', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}>
                　
                </button>
                </form>
                </div>

                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="mt-5 text-md  text-bold leading-4 tracking-tight text-black">
                    ほほ、おでこ、あごなど顔全体に、やさしく肌になじませていきます。特に乾燥やテカリ、シミやシワ等、気になる部分は指の腹でなじませてください。
                    </h2>
                </div>

                <div  className="mt-10 mb-16 sm:mx-auto sm:w-full sm:max-w-sm">
                    <div>
                        {/* <img src="/menu.png" alt="Menu Image" className="absolute top-[700px] w-full" /> */}
                        <button onClick={navigateToShopping}>　　　</button>
                    </div>
                </div>


            </div>    


        </>
    );
}