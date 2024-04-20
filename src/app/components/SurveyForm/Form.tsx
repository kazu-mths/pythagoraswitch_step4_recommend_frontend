'use client';
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams} from 'next/navigation';

export default function SurveyForm() {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState({ q1: '', q2: '', q3: '' });
    const [token, setToken] = useState<string | null>(null);
    const user_token: string | null = useSearchParams().get("token");
    const [userName, setUserName] = useState('');
    const router = useRouter();
    const currentTime = getJSTDate();

    // 日本時間に変換するための関数
    function getJSTDate() {
        const now = new Date();
        const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
        const jstOffset = 9
         * 60 * 60000; // JSTはUTC+9時間
        return new Date(utc + jstOffset);
    }

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

    const questions = [
        { id: 'q1', label: 'すきなにおいは？', options: ['シトラス', 'フローラル','オレンジ'] },
        { id: 'q2', label: '肌の特徴は？', options: ['乾燥肌', '脂性肌','日焼け'] },
        { id: 'q3', label: 'すきなブランドは？', options: ['Mandom', 'Shiseido', 'finetoday'] },
        { id: 'q4', label: 'アンケートご協力ありがとうございます。', options: ['送信'] }
    ];

    const surveyResponses = {
        token: token,
        question_id1: questions[0].id,
        question1: questions[0].label,
        answer1: answers.q1,
        question_id2: questions[1].id,
        question2: questions[1].label,
        answer2: answers.q2,
        question_id3: questions[2].id,
        question3: questions[2].label,
        answer3: answers.q3,
        answer_date: currentTime
    };

    const handleSubmit = async () => {
        if (!token) {
            alert('トークンが利用できません。再度ログインしてください。');
            return;
        }

        try {
            const response = await fetch(`https://tech0-gen-5-step4-studentwebapp-1.azurewebsites.net/counseling`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(surveyResponses)
            });

            if (response.ok) {
                router.push(`/mypage?token=${token}`);
            } else {
                const error = await response.json();
                alert(`アンケートの送信に失敗しました: ${error.detail || 'サーバーエラー'}`);
            }
        } catch (error) {
            console.error('アンケート送信中にエラーが発生しました:', error);
            alert('アンケートの送信に失敗しました。再度試してください。');
        }
    };

    const handleAnswer = (answer: string) => {
        const questionId = questions[currentQuestionIndex].id;
        setAnswers(prev => ({ ...prev, [questionId]: answer }));
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);  // 次の質問に進む
        } else {
            handleSubmit();  // 最後の質問に答えたら、フォームを送信します。
        }
    };

    return (
            <div>
                <div>はじめまして、{userName}さん</div>
                <div>
                    <h1>{questions[currentQuestionIndex].label}</h1>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        {questions[currentQuestionIndex].options.map(option => (
                            <button key={option} onClick={() => handleAnswer(option)} style={{ margin: '10px 0' }}>
                                {option}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        );
}
