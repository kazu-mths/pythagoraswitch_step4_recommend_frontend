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
            <div>
                <div>ようこそ {userName}さん</div>
                <form ref={formRef} onSubmit={handleSend} style={{ width: '100%' }}>
                    <div>
                        <label>
                            何か気になることある？
                            <input name="input_prompt" type="text" />
                        </label>
                    </div>
                    <button type="submit">相談</button>
                </form>
            </div>
            <div>
                <div> {recommendMessage}</div>
            </div>
            <div>
                <button onClick={navigateToShopping}>クエスト</button>
            </div>
        </>
    );
}