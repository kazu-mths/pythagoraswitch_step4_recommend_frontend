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
                router.push(`/survey?token=${token}`); // 初回ログインの場合はSurveyFormへ
            } else {
                router.push(`/shopping?token=${token}`); // 初回ログインでない場合は直接Shoppingへ
            }
        }
    }, [userName, token, firstLogin, router]);

    return (
        <>
            <div>
                <form ref={formRef} onSubmit={handleSend} style={{ width: '100%' }}>
                    <h1>Welcome back!</h1>
                    <div>
                        <label>
                            ユーザー名:
                            <input name="user_name" type="text" />
                        </label>
                    </div>
                    <div>
                        <label>
                            パスワード：
                            <input name="password" type="password" />
                        </label>
                    </div>
                    <button type="submit">SIGN IN</button>
                </form>
            </div>
        </>
    );
}
