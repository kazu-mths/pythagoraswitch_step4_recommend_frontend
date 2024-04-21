'use client';
import { useRef, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Login() {
    const formRef = useRef<HTMLFormElement>(null);
    const [userName, setUserName] = useState('');
    const [token, setToken] = useState('');
    const [firstLogin, setFirstLogin] = useState(false);
    const router = useRouter();

    const handleSend = async (event: any) => {
        event.preventDefault();

        if (formRef.current) {
            const formData = new FormData(formRef.current);
            const body_msg = JSON.stringify({
                user_name: formData.get('user_name'),
                password: formData.get('password'),
            });

            const response = await fetch('https://tech0-gen-5-step4-studentwebapp-1.azurewebsites.net/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: body_msg,
            });

            if (response.ok) {
                const jsonData = await response.json();
                console.log("Login Response:", jsonData);  // レスポンスの全データを確認
                setToken(jsonData.access_token);
                setUserName(jsonData.user_name);
                setFirstLogin(jsonData.first_login);

                console.log("First Login:", jsonData.first_login); // first_loginの値をログ出力
            } else {
                console.error('Login request failed:', response.statusText);
                alert(`Login request failed: ${response.statusText}`);
            }
        }
    };

    useEffect(() => {
        if (userName) {
            console.log("Redirect Condition:", firstLogin);  // リダイレクト前の条件をログ出力
            if (firstLogin) {
                router.push(`/attention?token=${token}`); // 初回ログインの場合はSurveyFormへ
            } else {
                router.push(`/shopping?token=${token}`); // 初回ログインでない場合は直接Shoppingへ
            }
        }
    }, [userName, token, firstLogin, router]);

    return (
        <>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">

                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h1 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-black">
                        Sign In
                    </h1>
                </div>

            
                <div  className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">

                    <form className="space-y-6" ref={formRef} onSubmit={handleSend}>
                    {/* <form className="space-y-6" ref={formRef} onSubmit={handleSend} style={{ width: '100%' }}> */}

                        <div>
                            <label htmlFor="user_name" className="block text-sm font-bold leading-6 text-black">
                            ID
                            </label>
                            <div className="mt-2">
                                <input
                                    name="user_name"
                                    type="text"
                                    className="block w-full rounded-full border-2  px-5 py-1.5 text-black shadow-sm ring-0 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-black sm:text-sm sm:leading-8"
                                />
                            </div>
                            {/* <label>
                                ユーザー名:
                                <input name="user_name" type="text" />
                            </label> */}
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-bold leading-6 text-black">
                                PASS
                                </label>
                            </div>

                            <div className="mt-2">
                                <input
                                name="password"
                                type="password"
                                className="block w-full rounded-full border-2 px-5 py-1.5 text-black shadow-sm ring-0 ring-inset ring-black placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-black sm:text-sm sm:leading-8"
                                />
                            </div>
                        </div>

                        <div className="relative flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                            <button
                                type="submit"
                                className="absolute top-[300px] left-1/2 transform -translate-x-1/2 flex w-full justify-center rounded-full border-2 border-black bg-white px-3 py-1.5 text-sm font-semibold leading-8 text-black shadow-sm hover:bg-black hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                            >
                            Sign In
                            </button>
                        </div>

                    </form>

                </div>
            </div>
        </>
    );
}
