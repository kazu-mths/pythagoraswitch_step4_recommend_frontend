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
        { id: 'q1', label: '最近気になる肌のお悩みはありますか？', options: ['シミ', 'シワ','くすみ','ニキビ','毛穴づまり','該当なし'] },
        { id: 'q2', label: '最近1カ月の肌の状態は？', options: ['肌荒れ多め', 'カミソリ負けしやすい','べたつきを感じる','赤みが出やすい','乾燥してカサカサ','該当なし'] },
        { id: 'q3', label: '気になるブランドはありますか？', options: ['ルシード｜マンダム', 'SHISEIDO MEN｜資生堂','NIVEA MEN｜花王','ORBIS Mr.｜ORBIS','MENSケシミン｜小林製薬','該当なし'] },
        { id: 'q4', label: '直近1カ月の生活習慣は？', options: ['水分をあまり取れていない','生活リズムが崩れている','寝不足が続いている','油っぽいものを食べがち','偏った食事をしている','該当なし'] }
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
                router.push(`/counseling2?token=${token}`);
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
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">

                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h1 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-black">
                        Counseling
                    </h1>
                </div>

                {/* <div>はじめまして、{userName}さん</div> */}

                <div  className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
                    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                        <h2 className="mt-5 text-xl font-bold leading-9 tracking-tight text-black">
                            Question
                        </h2>
                        <p>
                            {questions[currentQuestionIndex].label}
                        </p>
                    </div>

                    <div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            {questions[currentQuestionIndex].options.map(option => (
                                <button key={option} onClick={() => handleAnswer(option)} style={{ margin: '10px 0' }} className="flex w-full justify-center rounded-full border-2 border-black bg-white px-3 py-1.5 text-sm font-semibold leading-8 text-black shadow-sm hover:bg-black hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black">
                                    {option}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

            </div>
        );
}
